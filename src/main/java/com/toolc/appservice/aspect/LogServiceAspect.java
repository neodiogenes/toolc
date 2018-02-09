package com.toolc.appservice.aspect;

import java.util.ArrayList;
import java.util.Arrays;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.toolc.appservice.LogMessageService;
import com.toolc.model.LogMessage;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;


@Aspect
@Component
public class LogServiceAspect {
    Log logger = LogFactory.getLog(LogServiceAspect.class);
    
    @Autowired LogMessageService logMessageService;
    
    @Around("@annotation(com.toolc.appservice.annotation.LogExecutionTime)")
    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        Object proceed = joinPoint.proceed();   
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        //JsonArray argArray = new JsonArray();
        JSONArray argArray = new JSONArray();
        
        new ArrayList<>(Arrays.asList(joinPoint.getArgs()))
            .forEach(arg -> {
                JSONObject argJson = new JSONObject();
                argJson.put("value", arg);
                argArray.add(argJson);
            });
        
        String authenticatedUserName = (authentication != null) && authentication.isAuthenticated() ? authentication.getName() : "no authenticated user";
        
        JSONObject logJson = new JSONObject();
        logJson.put("signature", joinPoint.getSignature().toString());
        logJson.put("arguments", StringUtils.arrayToCommaDelimitedString(joinPoint.getArgs()));
        logJson.put("argumentValues", argArray);
        logJson.put("authenticatedUsername", authenticatedUserName);
        logJson.put("start", start);
        logJson.put("end", System.currentTimeMillis());
        logJson.put("executionTime", System.currentTimeMillis() - start);
        logger.info(logJson);
        
        LogMessage message = new LogMessage();
        message.setLevel("info");
        message.setLogger(joinPoint.getSignature().toString());
        message.setMessage(logJson.toString());
        this.logMessageService.create(message);
        
        return proceed;
    }
}
