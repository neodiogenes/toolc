package com.toolc.webservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.toolc.appservice.DeliveredReportService;
import com.toolc.model.DeliveredReport;
import com.toolc.model.stub.DeliveredReportStub;

@RestController
@RequestMapping("/api/history")
public class DeliveredReportController {
    @Autowired DeliveredReportService service;
    
    @PostMapping("/")
    public DeliveredReport create(@RequestBody DeliveredReportStub stub){ 
        
        try {
            ObjectMapper mapper = new ObjectMapper();
            String jsonInString = mapper.writeValueAsString(stub);
            System.out.println(jsonInString);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        
        return service.create(stub);        
    }

}
