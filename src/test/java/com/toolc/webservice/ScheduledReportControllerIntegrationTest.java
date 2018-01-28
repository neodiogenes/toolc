package com.toolc.webservice;

import static org.junit.Assert.assertEquals;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.toolc.model.ScheduledReport;
import com.toolc.security.SecurityConstants;
import com.toolc.utils.TestConstants;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT)
@ActiveProfiles({"local", "app_runner"})
public class ScheduledReportControllerIntegrationTest {
    static final String urlPrefix = "/api/reports/";
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    private static String token;
    private static HttpHeaders headers;
    
    /**
     * Before we run the integration test we need to generate an authentication token
     * and add it to the test header, otherwise the test should fail.
     */
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
    //@Ignore
    public void updateScheduledReportTest() {        
        String url2 = urlPrefix + "all";
        
        HttpEntity<String> request2 = new HttpEntity<String>(headers); 
        
        ResponseEntity<String> response2 = restTemplate.exchange(url2, HttpMethod.GET, request2, String.class); 
        System.out.println(response2.getBody());
        
        ObjectMapper mapper = new ObjectMapper();
        List<ScheduledReport> reportList = new ArrayList<>();
        try {
            reportList = mapper.readValue(response2.getBody(), new TypeReference<List<ScheduledReport>>() { });
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        System.out.println(reportList.size());
        
        ScheduledReport testReport = reportList.get(0);

        //Update the scheduled report and check the new value is returned
        String testFormatString = "NEW TEST FORMAT STRING";
        testReport.setFormat(testFormatString);
        
        String url3 = urlPrefix + testReport.getId();        
        HttpEntity<ScheduledReport> entity = new HttpEntity<>(testReport, headers);        
        ResponseEntity<ScheduledReport> response3 = restTemplate.exchange(url3, HttpMethod.PUT, entity, ScheduledReport.class);
        ScheduledReport check = response3.getBody();
        assertEquals(testFormatString, check.getFormat());
        
        //Get the report by its id value and check the new value is returned
        String url4 = urlPrefix + check.getId();
        ResponseEntity<ScheduledReport> response4 = restTemplate.exchange(url4, HttpMethod.GET, entity, ScheduledReport.class);
        ScheduledReport check2 = response4.getBody();   
        assertEquals(testFormatString, check2.getFormat());
    }
    
    @Test
    public void createScheduledReportTest() {
        String url2 = urlPrefix;
        
        ScheduledReport newReport = new ScheduledReport();
        newReport.setName("Test Report AAA");
        newReport.setOwner(null);
        newReport.setFormat("PNG");
        try {
            newReport.setUrl(new URI("https://www.someUrlString.com"));
        } catch (URISyntaxException e1) {
            e1.printStackTrace();
        }
        
        HttpEntity<ScheduledReport> entity = new HttpEntity<>(newReport, headers);
        
        ResponseEntity<ScheduledReport> response3 = restTemplate.exchange(url2, HttpMethod.POST, entity, ScheduledReport.class);
        ScheduledReport check = response3.getBody();
        assertEquals(newReport.getName(), check.getName());
        
        url2 = urlPrefix + check.getId();
        ResponseEntity<ScheduledReport> response4 = restTemplate.exchange(url2, HttpMethod.GET, entity, ScheduledReport.class);
        ScheduledReport check2 = response4.getBody();      
        assertEquals(newReport.getName(), check2.getName());
    }

}
