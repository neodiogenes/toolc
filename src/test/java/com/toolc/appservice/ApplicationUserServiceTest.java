package com.toolc.appservice;

import static org.junit.Assert.assertEquals;
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
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.toolc.dao.ApplicationUserDAO;
import com.toolc.model.ApplicationUser;
import com.toolc.model.UserResetToken;
import com.toolc.security.SecurityConstants;
import com.toolc.utils.TestUtils;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles({"local", "test"})
public class ApplicationUserServiceTest {
    
    @Autowired ApplicationUserService service;
    
    @Mock private ApplicationUser testUser;
    @Mock private UserResetToken token;
    
    @MockBean private ApplicationUserDAO dao;
    
    @MockBean private UserResetTokenService userResetTokenService;
    
    final String testUsername = "alteraa@yahoo.com";
    
    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        
        testUser = TestUtils.createTestUser(testUsername,  "password");
        
        token = new UserResetToken();
        token.setId(UUID.randomUUID());
        token.setUser(testUser);        
        Date dateExpires = new Date();
        dateExpires.setTime(dateExpires.getTime() + SecurityConstants.PASSWORD_RESET_EXPIRATION_TIME);
        
        Mockito.when(dao.findByUsername(testUsername)).thenReturn(testUser);
        Mockito.when(dao.save(testUser)).thenReturn(testUser);
        Mockito.when(userResetTokenService.create(testUser)).thenReturn(token);
        Mockito.when(userResetTokenService.findById(token.getId())).thenReturn(Optional.of(token));
        Mockito.when(userResetTokenService.validateToken(token.getId())).thenReturn(Optional.of(token));
        
        
        /*Authentication authentication = Mockito.mock(Authentication.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        
        Mockito.when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
        Mockito.when(SecurityContextHolder.getContext().getAuthentication().getName()).thenReturn("test_user"); */
    }
    
    @Test
    public void testFindByUsername(){

        ApplicationUser user = service.findByUsername(testUsername).get();
        assertEquals(user.getId(), testUser.getId());
    }
    
    @Test
    public void testResetUser() {
        Optional<UserResetToken> testToken = service.resetUser(testUsername);
        assertTrue(testToken.isPresent());
        assertEquals(testToken.get().getId(), token.getId());
        
        ApplicationUser user = service.findByUsername(testUsername).get();
        assertTrue(user.getArchived());
    }

}
