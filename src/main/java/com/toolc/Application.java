package com.toolc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.toolc.security.RequestInitializeInterceptor;



@SpringBootApplication
@EnableScheduling
@EnableAsync(proxyTargetClass=true)
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
    
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

@Configuration
class WebMvcConfig extends WebMvcConfigurerAdapter {
    @Bean
    public RequestInitializeInterceptor globalHandlerInterceptor() {
        return new RequestInitializeInterceptor();
    };
    
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry
            .addInterceptor(globalHandlerInterceptor())
            .addPathPatterns("/**/api/**/");
    }
}