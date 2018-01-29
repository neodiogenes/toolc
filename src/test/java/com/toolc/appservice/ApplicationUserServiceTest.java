package com.toolc.appservice;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.toolc.dao.ApplicationUserDAO;
import com.toolc.model.ApplicationUser;
import com.toolc.model.UserResetToken;
import com.toolc.model.UserValidationObject;
import com.toolc.security.SecurityConstants;
import com.toolc.utils.TestUtils;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles({"local", "test"})
public class ApplicationUserServiceTest {
    
    @Autowired ApplicationUserService service;
    @Autowired BCryptPasswordEncoder bCryptPasswordEncoder;
    
    @Mock private ApplicationUser testUser;
    @Mock private UserResetToken testToken;
    
    @MockBean private ApplicationUserDAO dao;
    
    @MockBean private UserResetTokenService userResetTokenService;
    
    final String testUsername = "alteraa@yahoo.com";
    final String oldPassword = "password1234";
    
    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        
        testUser = TestUtils.createTestUser(testUsername,  oldPassword, service.bCryptPasswordEncoder);
        testUser.setDisplayName("test_user");
        
        testToken = new UserResetToken();
        testToken.setId(UUID.randomUUID());
        testToken.setUser(testUser);        
        Date dateExpires = new Date();
        dateExpires.setTime(dateExpires.getTime() + SecurityConstants.PASSWORD_RESET_EXPIRATION_TIME);
        testToken.setDateExpires(dateExpires);
        
        Mockito.when(dao.findByUsername(testUsername)).thenReturn(testUser);
        
        Mockito.when(dao.save(Mockito.any(ApplicationUser.class)))
            .thenAnswer(i -> i.getArgumentAt(0, ApplicationUser.class));
        
        Mockito.when(userResetTokenService.create(testUser)).thenReturn(testToken);
        Mockito.when(userResetTokenService.findById(testToken.getId())).thenReturn(Optional.of(testToken));
        Mockito.when(userResetTokenService.validateToken(testToken.getId())).thenReturn(Optional.of(testToken));
        //Mockito.when(userResetTokenService.validateToken(Mockito.any(UserResetToken.class))).thenReturn(Optional.of(testToken));
        Mockito.when(userResetTokenService.update(Mockito.any(UserResetToken.class))).thenAnswer(i -> i.getArgumentAt(0,  UserResetToken.class));
    }
    
    @Test
    public void testFindByUsername(){

        ApplicationUser user = service.findByUsername(testUsername).get();
        assertEquals(user.getId(), testUser.getId());
    }
    
    @Test
    public void testResetUser() {
        Optional<UserResetToken> token0 = service.resetUser(testUsername);
        assertTrue(token0.isPresent());
        assertEquals(token0.get().getId(), testToken.getId());
        
        ApplicationUser user = service.findByUsername(testUsername).get();
        assertTrue(user.getArchived());
        
        //Reset the testUser values
        testUser.setArchived(false);
    }
    
    @Test
    public void testValidateUser() {
        String newPassword = "foobar1234";
        
        //User would have been archived by the previous step
        testUser.setArchived(true);
        
        UserValidationObject object = new UserValidationObject();
        object.setId(testToken.getId());
        object.setUsername(testUsername);
        object.setPassword(newPassword);
        
        assertTrue(testUser.getArchived());
        assertFalse(testToken.getArchived());
        assertTrue(BCrypt.checkpw(oldPassword, testUser.getPassword()));
        
        service.validateUser(object);
        
        assertFalse(testUser.getArchived());
        assertTrue(BCrypt.checkpw(newPassword, testUser.getPassword()));
        assertTrue(testToken.getArchived());
    }

}
