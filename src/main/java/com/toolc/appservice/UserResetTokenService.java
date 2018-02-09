package com.toolc.appservice;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.toolc.appservice.annotation.LogExecutionTime;
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
    @LogExecutionTime
    public UserResetToken create(ApplicationUser user, UserResetToken.Types type) {
        UserResetToken token = new UserResetToken();
        token.setId(UUID.randomUUID());
        token.setUser(user);
        token.setType(type.name());
        
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
    @LogExecutionTime
    public Optional<UserResetToken> validateToken(UserResetToken token, UserResetToken.Types type){ 
        return this.validateToken(token.getId(), type);
    }
    
    /**
     * 
     * @param tokenId
     * @return
     */
    @LogExecutionTime
    public Optional<UserResetToken> validateToken(UUID tokenId, UserResetToken.Types type){        
        return Optional
                .ofNullable(dao.findOne(tokenId))
                .filter(token -> type.name().equals(token.getType()))
                .filter(token -> token.getDateExpires().after(new Date()))
                .filter(token -> !token.getArchived());
    }
    
    /**
     * 
     * @param user
     * @return
     */
    public Optional<UserResetToken> findByUser(ApplicationUser user){
        return dao.findAllByUserAndArchived(user, false)
                .stream()
                .findFirst();
    }
    
    /**
     * 
     * @param user
     */
    @LogExecutionTime
    public void archiveTokens(ApplicationUser user) {
        List<UserResetToken> tokens = 
                dao.findAllByUserAndArchived(user, false)
                    .stream()   
                    .map( token -> {
                        token.setArchived(true);
                        token.setDateUpdated(new Date());
                        return token;
                    })
                    .collect(Collectors.toList());
        
        dao.save(tokens);
        
    }
    
    
}
