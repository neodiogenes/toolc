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

/**
 * REST API methods related to user actions.  Unless noted, methods do not require a valid
 * JavascriptWebToken in the Authorization header.
 * 
 * @author Andrew
 *
 */
@RestController
@RequestMapping("/api/users")
public class LoginController {
    
    @Autowired
    private ApplicationUserService applicationUserService;
    
    /**
     * register a new user object 
     * 
     * @param json
     * @return
     * @throws ParseException
     */
    @PostMapping("/register")
    public ApplicationUser register(@RequestBody String json) throws ParseException {
        return applicationUserService.register(json);
    }
    
    /**
     * Reset the password of a user by username
     * 
     * @param username
     * @return
     */
    @PostMapping("/reset")
    public JSONObject resetPassword(@RequestBody String username) {        
        JSONObject json = new JSONObject();
        json.put("response", applicationUserService.resetUser(username).isPresent());
        return json;
    }

    /**
     * Validate a user by a complete token object 
     * 
     * @param token
     * @return
     */
    @PostMapping("/validate/user")
    public JSONObject validateUser(@RequestBody UserValidationObject token){
        JSONObject json = new JSONObject();
        json.put("response", applicationUserService.validateResetUser(token));
        return json;
    }
    
    /**
     * Verify that a given token UUID is valid
     * 
     * @param tokenId
     * @return
     */
    @PostMapping("/validate/token")
    public JSONObject validateToken(@RequestBody UUID tokenId) {        
        JSONObject json = new JSONObject();
        json.put("response", applicationUserService.validateToken(tokenId));
        return json;
    }
    
    /**
     * Create a new Application user 
     * 
     * @param user
     * @return
     */
    @PostMapping("/create")
    public ApplicationUser create(@RequestBody ApplicationUser user) {        
        return applicationUserService.createUser(user);
    }
    
    /**
     * Update user details (FTP/SFTP credentials, etc.)
     * 
     * @param details
     * @return
     */
    @PutMapping("/details")
    public JSONObject updateDetails(@RequestBody String details) {           
        JSONObject json = new JSONObject();
        json.put("response", applicationUserService.updateDetails(details));
        return json;
    }
    
    /**
     * Get the details for the user associated with the valid 
     * 
     * @return
     */
    @GetMapping("/details")
    public String getDetails() {        
        return applicationUserService.getDetails();
    }

}
