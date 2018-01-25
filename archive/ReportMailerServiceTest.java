package com.toolc.appservice;

import java.io.IOException;

import javax.mail.MessagingException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.toolc.appservice.ReportMailerService;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles({"local", "test"})
public class ReportMailerServiceTest {
    
    @Autowired
    ReportMailerService mailer;
    
    @Test
    public void testSend() throws IOException, MessagingException {
        
        String[] emailAddresses = {"alteraa@yahoo.com"};
        String from = "neodiogenes@gmail.com";
        String subject = "Test Subject";
        String message = "Test Message";
        ClassPathResource file = new ClassPathResource("toolc_logo_sm.png");
        
        
        mailer.send(emailAddresses, from, subject, message, file);
    }

}
