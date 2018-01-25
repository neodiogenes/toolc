package com.toolc.appservice;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.toolc.dao.ApplicationUserDAO;
import com.toolc.model.ApplicationUser;

@Service
public class ApplicationUserService {

    @Autowired
    private ApplicationUserDAO applicationUserDao;
    
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    
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
}
