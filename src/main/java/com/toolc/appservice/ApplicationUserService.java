package com.toolc.appservice;

import java.io.IOException;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.toolc.dao.ApplicationUserDAO;
import com.toolc.model.ApplicationUser;
import com.toolc.model.UserResetToken;
import com.toolc.model.UserValidationObject;
import com.toolc.security.SecurityConstants;

@Service
public class ApplicationUserService {

    @Autowired ApplicationUserDAO applicationUserDao;
    
    @Autowired BCryptPasswordEncoder bCryptPasswordEncoder;
    
    @Autowired UserResetTokenService userResetTokenService;
    
    @Autowired MailerService mailerService;
    
    /**
     * 
     * @param user
     * @return
     */
    public ApplicationUser createUser(ApplicationUser user) {        
        user.setId(UUID.randomUUID());
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword())); 
        user.setDateCreated(new Date());
        user.setDateUpdated(new Date());
        
        applicationUserDao.save(user);
        return user;
        
    }
    
    /**
     * 
     * @param username
     * @param password
     * @return
     */
    public ApplicationUser createUser(String username, String password) {
        ApplicationUser user = new ApplicationUser();
        user.setUsername(username);
        user.setPassword(password);
        
        return createUser(user);
    }    
    
    /**
     * 
     * @param username
     * @return
     */
    public Optional<ApplicationUser> findByUsername(String username) {
        return Optional.ofNullable(applicationUserDao.findByUsername(username));
    }

    /**
     * 
     * @param username
     * @return
     */
    public Optional<ApplicationUser> findByUsernameNotArchived(String username) {
        Boolean archived = false;
        return Optional.ofNullable(applicationUserDao.findByUsernameAndArchived(username, archived));
    }
    
    /**
     * 
     * @param testUser3
     * @return 
     */
    public ApplicationUser update(ApplicationUser user) {
        user.setDateUpdated(new Date());
        return applicationUserDao.save(user);
        
    }
    
    /**
     * 
     * @param username
     */
    public Optional<UserResetToken> resetUser(String username) {
        return this.findByUsername(username)
            .map(user -> {
                user.setArchived(true);
                user = this.update(user);
                
                Optional<UserResetToken> token = Optional.of(userResetTokenService.create(user));
                this.sendResetPasswordEmail(user, token.get());
                return token;
            })
            .orElse(Optional.empty());
    }

    /**
     * 
     * @param user
     * @param token
     * @return
     */
    private boolean sendResetPasswordEmail(ApplicationUser user, UserResetToken token) {
        
        String[] emailAddresses = {user.getUsername()};
        String subject = SecurityConstants.DEFAULT_RESET_EMAIL_SUBJECT;
        String message = 
                SecurityConstants.DEFAULT_RESET_EMAIL_MESSAGE
                .replace("{{id}}", token.getId().toString());
        
        try {
            mailerService.send(emailAddresses, subject, message);
            return true;
            
        } catch (MessagingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return false;
        
    }
    
    /**
     * 
     * @param token
     * @return
     */
    public boolean validateToken(UUID tokenId) {
        return userResetTokenService.validateToken(tokenId)
                .map(token -> true)
                .orElse(false);
                
               
    }

    /**
     * 
     * @param token
     * @return
     */
    public boolean validateUser(UserValidationObject inputObject) {
        
        System.out.println(inputObject.getPassword());
        
/*        Optional<UserResetToken> token = userResetTokenService.validateToken(inputObject.getId());
        
        if (token.isPresent()){
            ApplicationUser user = token.get().getUser();
            //if (user.getUsername().equals(inputObject.getUsername())) {
                user.setArchived(false);
                
                String encodedPassword = this.bCryptPasswordEncoder
                        .encode(inputObject.getPassword());
                user.setPassword(encodedPassword);
                this.update(user);
                
                token.get().setArchived(true);
                token.get().setDateValidated(new Date());
                userResetTokenService.update(token.get());
                
                return true;
            //}
        }
        
        return false;*/
        
            
        
        return userResetTokenService.validateToken(inputObject.getId())
            .map(token -> {
                ApplicationUser user = token.getUser();
                user.setArchived(false);
                user.setPassword(bCryptPasswordEncoder.encode(inputObject.getPassword()));
                this.update(user);
                
                token.setArchived(true);
                token.setDateValidated(new Date());
                userResetTokenService.update(token);
                
                return true;
            })
            .orElse(false);
    }

    public BCryptPasswordEncoder getBCryptPasswordEncoder() {
        return this.bCryptPasswordEncoder;
    }
}
