package com.toolc.webservice;

import static org.junit.Assert.assertEquals;

import java.util.Date;

import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.toolc.appservice.ScheduledReportService;
import com.toolc.model.DeliveredReport;
import com.toolc.model.ScheduledReport;
import com.toolc.model.stub.DeliveredReportStub;
import com.toolc.security.SecurityConstants;
import com.toolc.utils.TestConstants;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT)
@ActiveProfiles({"local", "app_runner"})
public class DeliveredReportControllerIntegrationTest {
    static final String urlPrefix = "/api/history/";
    
    @Autowired TestRestTemplate restTemplate;
    
    @Autowired ScheduledReportService scheduledReportService;
    
    private static String token;
    private static HttpHeaders headers;
    
    private final String testUsername = "alteraa@yahoo.com";
    
    @BeforeClass
    public static void setup(){      
        
        token = Jwts.builder()
                .setSubject(TestConstants.DEFAULT_USERNAME)
                .setExpiration(new Date(System.currentTimeMillis() + SecurityConstants.JWT_EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SecurityConstants.JWT_SECRET_KEY.getBytes())
                .compact();
        
        token = "Bearer " + token;
        
        headers = new HttpHeaders();
        headers.add("Authorization", token);
    }
    
    @Test
    public void testCreate() {
        String url = urlPrefix;
        
        ScheduledReport testReport = scheduledReportService.findByOwner(testUsername).get(0);
        
        DeliveredReportStub stub = new DeliveredReportStub();
        stub.id = testReport.getId().toString();
        stub.format = ScheduledReport.PDF;
        stub.delivery = ScheduledReport.EMAIL;
        stub.name = testReport.getName();
        stub.dateDelivered = new Date();
        
        try {
            ObjectMapper mapper = new ObjectMapper();
            String jsonInString = mapper.writeValueAsString(stub);
            System.out.println(jsonInString);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        
        HttpEntity<DeliveredReportStub> entity = new HttpEntity<>(stub, headers);
        
        ResponseEntity<DeliveredReport> response = restTemplate.exchange(url, HttpMethod.POST, entity, DeliveredReport.class);
        DeliveredReport check = response.getBody();
        assertEquals(testReport.getId(), check.getScheduledReport().getId());
    }

}
