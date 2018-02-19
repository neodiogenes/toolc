package com.toolc.webservice;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.toolc.appservice.DeliveredReportService;
import com.toolc.model.DeliveredReport;
import com.toolc.model.stub.DeliveredReportStub;

/**
 * REST API methods to create and get delivered report history.  All methods required a valid
 * JavascriptWebToken (JWT) in the Authorization header.
 * 
 * @author Andrew
 *
 */
@RestController
@RequestMapping("/api/history")
public class DeliveredReportController {
    @Autowired DeliveredReportService service;
    
    /**
     * Create a new delivered report entry.  JSON should include the following
     * - id : the scheduled report UUID associated with the delivered report (required)
     * - name:  report name
     * - format:  report format
     * - delivery: report delivery
     * - dateDelivered: standard javascript date value (number of milliseconds since 1970)
     * 
     * @param stub
     * @return
     */
    @PostMapping("/")
    public DeliveredReport create(@RequestBody DeliveredReportStub stub){ 
        
        
/*        try {
            ObjectMapper mapper = new ObjectMapper();
            String jsonInString = mapper.writeValueAsString(stub);
            System.out.println(jsonInString);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }*/
        
        return service.create(stub);        
    }
    
    /**
     * Return all delivered reports associated with the valid JWT
     * 
     * @return
     */
    @GetMapping("/all")
    public List<DeliveredReport> getAll(){
        return service.findByOwner();
    }

}
