package com.toolc.webservice;

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
        System.out.println(user.getUsername() + " " + user.getPassword());
        
        return applicationUserService.createUser(user);
    }
}
