package com.toolc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.web.servlet.ErrorPage;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
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
    /**
     * Create a singleton that should be Autowired for everywhere it's needed, otherwise each instance
     * will generate a different password
     * 
     * @return
     */
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


    @Bean
    public EmbeddedServletContainerCustomizer containerCustomizer() {
        return container -> {
            container.addErrorPages(new ErrorPage(HttpStatus.NOT_FOUND,
                    "/notFound"));
        };
    }
    
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/notFound").setViewName("forward:/index.html");
    }  
}