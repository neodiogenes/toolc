package com.toolc.webservice;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.toolc.webservice.LoginController;

@RunWith(SpringRunner.class)
@SpringBootTest
//@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT)
@ActiveProfiles("local")
public class LoginControllerTest {

    //@Autowired
    //private TestRestTemplate restTemplate;
    
    @Autowired
    LoginController controller;
    
}
