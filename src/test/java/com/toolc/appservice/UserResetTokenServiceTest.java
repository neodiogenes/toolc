package com.toolc.appservice;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
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

import com.toolc.dao.UserResetTokenDAO;
import com.toolc.model.ApplicationUser;
import com.toolc.model.UserResetToken;
import com.toolc.security.SecurityConstants;
import com.toolc.utils.TestUtils;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles({"local", "test"})
public class UserResetTokenServiceTest {
    
    @Autowired UserResetTokenService service;
    
    @Mock private ApplicationUser testUser;
    @Mock private UserResetToken token;
    
    @MockBean private UserResetTokenDAO dao;
    
    @MockBean private ApplicationUserService applicationUserService;

    final String testUsername = "alteraa@yahoo.com";
    
    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        
        testUser = TestUtils.createTestUser(testUsername,  "password", service.bCryptPasswordEncoder);
        
        token = new UserResetToken();
        token.setUser(testUser);        
        Date dateExpires = new Date();
        dateExpires.setTime(dateExpires.getTime() + SecurityConstants.PASSWORD_RESET_EXPIRATION_TIME);
        token.setDateExpires(dateExpires);
        
        Mockito.when(dao.findOne(token.getId())).thenReturn(token);
        
        //Mockito.when(dao.save(Mockito.any(UserResetToken.class))).thenReturn(token);

        Mockito.when(
                dao.save(Mockito.any(UserResetToken.class)))
                    .thenAnswer(i -> i.getArgumentAt(0, UserResetToken.class));
        
        Mockito.when(applicationUserService.findByUsername(testUsername)).thenReturn(Optional.of(testUser));
    }
    
    @Test
    public void testCreate() {
        UserResetToken testToken = service.create(testUser);
        assertNotNull(testToken.getId());
        assertEquals(testToken.getUser().getUsername(), testUser.getUsername());
        
    }

    @Test
    public void testValidateToken() {
        //Test that a valid token returns true
        {
            Optional<UserResetToken> response = service.validateToken(token.getId());
            assertTrue(response.isPresent());
            assertEquals(response.get().getUser().getUsername(), testUser.getUsername());
        }
        

        //Test that an invalid token returns false
        {
            Optional<UserResetToken> response = service.validateToken(UUID.randomUUID());
            assertFalse(response.isPresent());
        }
        
        //Test that an invalid token returns false
        {
            Optional<UserResetToken> response;
            try {
                response = service.validateToken(UUID.fromString("12345"));
                fail("Failed to catch illegal argument");
            } catch (IllegalArgumentException e) {
            }
        }
        
        //Test that an expired token is rejected
        {
            Calendar testTime = new GregorianCalendar();
            testTime.add(Calendar.HOUR, -1);
            token.setDateExpires(testTime.getTime());

            Optional<UserResetToken> response = service.validateToken(token.getId());
            assertFalse(response.isPresent());
        }
        
        //Test that an archived token is rejected
        {
            Calendar testTime = new GregorianCalendar();
            testTime.add(Calendar.MILLISECOND, (int) SecurityConstants.PASSWORD_RESET_EXPIRATION_TIME);
            token.setDateExpires(testTime.getTime());
            token.setArchived(true);

            Optional<UserResetToken> response = service.validateToken(token.getId());
            assertFalse(response.isPresent());
        }
    }

}
