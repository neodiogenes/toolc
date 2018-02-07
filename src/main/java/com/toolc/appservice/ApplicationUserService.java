package com.toolc.appservice;

import java.io.IOException;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.toolc.appservices.annotation.LogExecutionTime;
import com.toolc.dao.ApplicationUserDAO;
import com.toolc.model.ApplicationUser;
import com.toolc.model.UserResetToken;
import com.toolc.model.UserValidationObject;
import com.toolc.security.SecurityConstants;

import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;

@Service
public class ApplicationUserService {

    @Autowired ApplicationUserDAO applicationUserDao;
    
    @Autowired BCryptPasswordEncoder bCryptPasswordEncoder;
    
    @Autowired UserResetTokenService userResetTokenService;
    
    @Autowired MailerService mailerService;
    
    @Value("${application.root.url}")
    String applicationRootUrl;
    
    /**
     * 
     * @param user
     * @return
     */
    @LogExecutionTime
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
    @LogExecutionTime
    public ApplicationUser createUser(String username, String password) {
        ApplicationUser user = new ApplicationUser();
        user.setUsername(username);
        user.setPassword(password);
        
        return createUser(user);
    }    
    
    /**
     * 
     * @param user
     * @return
     * @throws ParseException 
     */
    public ApplicationUser register(String in) throws ParseException {
        ApplicationUser user = new ApplicationUser();
        JSONParser parser = new JSONParser(JSONParser.MODE_PERMISSIVE);
        
        JSONObject json = (JSONObject) parser.parse(in);
        user.setUsername(json.getAsString("username"));
        user.setPassword(json.getAsString("password"));
        user.setArchived(true);
        
        user = createUser(user);                
        UserResetToken token = userResetTokenService.create(user, UserResetToken.Types.REGISTER);
        this.sendRegisterEmail(user, token);
        
        return user;
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
    @LogExecutionTime
    public ApplicationUser update(ApplicationUser user) {
        user.setDateUpdated(new Date());
        return applicationUserDao.save(user);
        
    }
    
    /**
     * 
     * @param username
     */
    @LogExecutionTime
    public Optional<UserResetToken> resetUser(String username) {
        return this.findByUsername(username)
            .map(user -> {
                //Archive the user so they can't log in
                user.setArchived(true);
                user = this.update(user);
                
                //Archive all previous tokens
                userResetTokenService.archiveTokens(user);
                
                //Send a token via email to reset their password                
                UserResetToken token = userResetTokenService.create(user, UserResetToken.Types.RESET);
                this.sendResetPasswordEmail(user, token);
                                
                return Optional.of(token);
            })
            .orElse(Optional.empty());
    }

    /**
     * 
     * @param user
     * @param token
     * @return
     */
    @LogExecutionTime
    private boolean sendResetPasswordEmail(ApplicationUser user, UserResetToken token) {
        
        String[] emailAddresses = {user.getUsername()};
        String subject = SecurityConstants.DEFAULT_RESET_EMAIL_SUBJECT;
        String message = 
                SecurityConstants.DEFAULT_RESET_EMAIL_MESSAGE
                .replace("{{id}}", token.getId().toString())
                .replace("{{root_url}}", this.applicationRootUrl);
        
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
     * @param user
     * @param token
     * @return
     */
    @LogExecutionTime
    private boolean sendRegisterEmail(ApplicationUser user, UserResetToken token) {
        
        String[] emailAddresses = {user.getUsername()};
        String subject = SecurityConstants.DEFAULT_REGISTER_EMAIL_SUBJECT;
        String message = 
                SecurityConstants.DEFAULT_REGISTER_EMAIL_MESSAGE
                .replace("{{id}}", token.getId().toString())
                .replace("{{root_url}}", this.applicationRootUrl);
        
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
     * @param tokenId
     * @return
     */
    public boolean validateToken(UUID tokenId) {
        return userResetTokenService
                .findById(tokenId).map(token -> {
                    
                    //If registration token then simply un-archive the user
                    if (UserResetToken.REGISTER.equals(token.getType())){
                        return userResetTokenService.validateToken(tokenId, UserResetToken.Types.REGISTER)
                            .map(t -> validateRegistrationUser(t))
                            .orElse(false);
                        
                    //if reset token then validate the token    
                    } else if (UserResetToken.RESET.equals(token.getType())){
                        return userResetTokenService.validateToken(tokenId, UserResetToken.Types.RESET)
                                .map(t -> true)
                                .orElse(false);
                        
                    } else {
                        return false;
                    }
                })
                .orElse(false);
    }
    

    /**
     * 
     * @param token
     * @return
     */
    @LogExecutionTime
    public boolean validateResetUser(UserValidationObject inputObject) {
        return userResetTokenService.validateToken(inputObject.getId(), UserResetToken.Types.RESET)
            .map(token -> {
                ApplicationUser user = token.getUser();
                user.setArchived(false);
                user.setPassword(bCryptPasswordEncoder.encode(inputObject.getPassword()));
                this.update(user);
                
                token.setArchived(true);
                token.setDateUpdated(new Date());
                token.setDateValidated(new Date());
                userResetTokenService.update(token);
                
                return true;
            })
            .orElse(false);
    }

    /**
     * 
     * @param token
     * @return
     */
    public boolean validateRegistrationUser(UserResetToken token){
        token.getUser().setArchived(false);
        this.update(token.getUser());
        
        token.setArchived(true);
        userResetTokenService.update(token);
        
        return true;
    }
    
    public BCryptPasswordEncoder getBCryptPasswordEncoder() {
        return this.bCryptPasswordEncoder;
    }
}
