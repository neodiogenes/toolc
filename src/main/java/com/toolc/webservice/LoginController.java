package com.toolc.webservice;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.toolc.appservice.ApplicationUserService;
import com.toolc.model.ApplicationUser;
import com.toolc.model.UserValidationObject;

import net.minidev.json.JSONObject;
import net.minidev.json.parser.ParseException;

@RestController
@RequestMapping("/api/users")
public class LoginController {
    
    @Autowired
    private ApplicationUserService applicationUserService;
    
    
    @PostMapping("/register")
    public ApplicationUser register(@RequestBody String json) throws ParseException {
        return applicationUserService.register(json);
    }
        
    @PostMapping("/create")
    public ApplicationUser create(@RequestBody ApplicationUser user) {        
        return applicationUserService.createUser(user);
    }
    
    @PutMapping("/details")
    public JSONObject updateDetails(@RequestBody String details) {           
        JSONObject json = new JSONObject();
        json.put("response", applicationUserService.updateDetails(details));
        return json;
    }
    
    @GetMapping("/details")
    public String getDetails() {        
        return applicationUserService.getDetails();
    }
    
    @PostMapping("/reset")
    public JSONObject resetPassword(@RequestBody String username) {        
        JSONObject json = new JSONObject();
        json.put("response", applicationUserService.resetUser(username).isPresent());
        return json;
    }

    @PostMapping("/validate/user")
    public JSONObject validateUser(@RequestBody UserValidationObject token){
        JSONObject json = new JSONObject();
        json.put("response", applicationUserService.validateResetUser(token));
        return json;
    }
    
    @PostMapping("/validate/token")
    public JSONObject validateToken(@RequestBody UUID tokenId) {        
        JSONObject json = new JSONObject();
        json.put("response", applicationUserService.validateToken(tokenId));
        return json;
    }
    
    /*@PostMapping("/validate/test")
    public ApplicationUser getUser() {
        String testUser = "alteraa@yahoo.com";
        String password = "password";
        
        ApplicationUser user = applicationUserService.findByUsername(testUser).get();
        
        System.out.println(BCrypt.checkpw(password, user.getPassword()));
        
        return user;
    }*/

}
