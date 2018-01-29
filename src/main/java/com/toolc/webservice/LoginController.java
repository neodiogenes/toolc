package com.toolc.webservice;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.toolc.appservice.ApplicationUserService;
import com.toolc.model.ApplicationUser;
import com.toolc.model.UserValidationObject;

import net.minidev.json.JSONObject;

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
    public JSONObject resetPassword(@RequestBody String username) {
        System.out.println(username);
        
        JSONObject json = new JSONObject();
        json.put("response", applicationUserService.resetUser(username).isPresent());
        return json;
    }

    @PostMapping("/validate/user")
    public JSONObject validateUser(@RequestBody UserValidationObject token){
        JSONObject json = new JSONObject();
        json.put("response", applicationUserService.validateUser(token));
        return json;
    }
    
    @PostMapping("/validate/token")
    public JSONObject validateToken(@RequestBody UUID tokenId) {
        System.out.println(tokenId);
        
        JSONObject json = new JSONObject();
        json.put("response", applicationUserService.validateToken(tokenId));
        return json;
    }
    
    @PostMapping("/validate/test")
    public ApplicationUser getUser() {
        String testUser = "alteraa@yahoo.com";
        String password = "password";
        
        ApplicationUser user = applicationUserService.findByUsername(testUser).get();
        
        System.out.println(BCrypt.checkpw(password, user.getPassword()));
        
        return user;
    }

}
