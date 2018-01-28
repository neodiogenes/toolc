package com.toolc.webservice;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.toolc.appservice.ApplicationUserService;
import com.toolc.model.ApplicationUser;

@RestController
@RequestMapping("/api/users")
public class LoginController {
    
    @Autowired
    private ApplicationUserService applicationUserService;
    
        
    @PostMapping("/create")
    public ApplicationUser create(@RequestBody ApplicationUser user) {        
        return applicationUserService.createUser(user);
    }
    
    @PostMapping("/reset")
    public boolean resetPassword(@RequestBody String username) {
        return applicationUserService.resetUser(username).isPresent();
    }
    
    @PostMapping("/validate")
    public boolean validateToken(@RequestBody UUID token) {
        return applicationUserService.validateToken(token);
    }
}
