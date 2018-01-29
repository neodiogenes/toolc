package com.toolc.appservice;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.toolc.dao.UserResetTokenDAO;
import com.toolc.model.ApplicationUser;
import com.toolc.model.UserResetToken;
import com.toolc.security.SecurityConstants;

@Service
public class UserResetTokenService {
    
    @Autowired UserResetTokenDAO dao;
    
    @Autowired BCryptPasswordEncoder bCryptPasswordEncoder;
    
    /**
     * 
     * @param user
     * @return
     */
    public UserResetToken create(ApplicationUser user) {
        UserResetToken token = new UserResetToken();
        token.setId(UUID.randomUUID());
        token.setUser(user);
        
        Date dateExpires = new Date();
        dateExpires.setTime(dateExpires.getTime() + SecurityConstants.PASSWORD_RESET_EXPIRATION_TIME);
        token.setDateExpires(dateExpires);
        return dao.save(token);
    }
    
    /**
     * 
     * @param id
     * @return
     */
    public Optional<UserResetToken> findById(UUID id) {
       return Optional.ofNullable(dao.findOne(id)); 
    }
    
    /**
     * 
     * @param token
     * @return
     */
    public UserResetToken update(UserResetToken token) {
        return dao.save(token);
    }
    
    /**
     * 
     * @param token
     * @return
     */
    public Optional<UserResetToken> validateToken(UserResetToken token){ 
        return this.validateToken(token.getId());
    }
    
    /**
     * 
     * @param tokenId
     * @return
     */
    public Optional<UserResetToken> validateToken(UUID tokenId){        
        return Optional
                .ofNullable(dao.findOne(tokenId))
                .filter(token -> token.getDateExpires().after(new Date()))
                .filter(token -> !token.getArchived());
    }
    
    
}
