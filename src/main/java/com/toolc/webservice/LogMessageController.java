package com.toolc.webservice;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.toolc.appservice.LogMessageService;
import com.toolc.model.LogMessage;

@RestController
@RequestMapping("/api/logmessage")
public class LogMessageController {
    
    @Autowired LogMessageService logMessageService;
    
    @GetMapping("/{id}")
    public LogMessage getLogMessageById(@PathVariable("id") UUID id) {        
        return this.logMessageService.findById(id)
                .orElse(null);
    }
    
    @PostMapping("/")
    public LogMessage createLogMessage(@RequestBody LogMessage message) {        
        return logMessageService.create(message);
    }
    
    
}
