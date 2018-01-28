package com.toolc.appservice;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.toolc.dao.ApplicationUserDAO;
import com.toolc.model.ApplicationUser;
import com.toolc.model.UserResetToken;

@Service
public class ApplicationUserService {

    @Autowired private ApplicationUserDAO applicationUserDao;
    
    @Autowired private BCryptPasswordEncoder bCryptPasswordEncoder;
    
    @Autowired private UserResetTokenService userResetTokenService;
    
    /**
     * 
     * @param user
     * @return
     */
    public ApplicationUser createUser(ApplicationUser user) {        
        user.setId(UUID.randomUUID());
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));        
        
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
        
        
        return true;
        
    }
}
