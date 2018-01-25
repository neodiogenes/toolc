package com.toolc.security.service;

import static java.util.Collections.emptyList;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.toolc.dao.ApplicationUserDAO;
import com.toolc.model.ApplicationUser;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    
    private ApplicationUserDAO applicationUserDao;
    
    public UserDetailsServiceImpl(ApplicationUserDAO applicationUserDao) {
        this.applicationUserDao = applicationUserDao;
    }
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        ApplicationUser applicationUser = applicationUserDao.findByUsername(username);
        
        if (applicationUser == null) {
            throw new UsernameNotFoundException(username);
        }
        
        return new User(applicationUser.getUsername(), applicationUser.getPassword(), emptyList());
    }

}
