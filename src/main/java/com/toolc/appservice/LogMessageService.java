package com.toolc.appservice;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.toolc.dao.LogMessageDAO;
import com.toolc.model.LogMessage;

@Service
public class LogMessageService {
    
    @Autowired LogMessageDAO dao;
    
    /**
     * 
     * @param message
     * @return
     */
    public LogMessage create(LogMessage message){
        if (message.getId() == null) {
            message.setId(UUID.randomUUID());
        }
        
        message.setLevel(message.getLevel().toUpperCase());
        
        return dao.save(message);
    }

    /**
     * 
     * @param id
     * @return
     */
    public Optional<LogMessage> findById(UUID id) {
        return Optional.ofNullable(dao.findOne(id));
    }
    

}
