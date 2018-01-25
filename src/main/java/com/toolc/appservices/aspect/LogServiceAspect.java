package com.toolc.appservices.aspect;

import java.util.ArrayList;
import java.util.Arrays;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;


@Aspect
@Component
public class LogServiceAspect {
    Log logger = LogFactory.getLog(LogServiceAspect.class);
    Gson gson = new Gson();
    
    @Around("@annotation(com.toolc.appservices.annotation.LogExecutionTime)")
    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        Object proceed = joinPoint.proceed();   
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        JsonArray argArray = new JsonArray();
        
        new ArrayList<>(Arrays.asList(joinPoint.getArgs()))
            .forEach(arg -> {
                JsonObject argJson = new JsonObject();
                argJson.addProperty("value", gson.toJson(arg));
                argArray.add(argJson);
            });
        
        String authenticatedUserName = (authentication != null) && authentication.isAuthenticated() ? authentication.getName() : "no authenticated user";
        
        JsonObject logJson = new JsonObject();
        logJson.addProperty("signature", joinPoint.getSignature().toString());
        logJson.addProperty("arguments", StringUtils.arrayToCommaDelimitedString(joinPoint.getArgs()));
        logJson.add("argumentValues", argArray);
        logJson.addProperty("authenticatedUsername", authenticatedUserName);
        logJson.addProperty("start", start);
        logJson.addProperty("end", System.currentTimeMillis());
        logJson.addProperty("executionTime", System.currentTimeMillis() - start);
        logger.info(logJson);
        
        return proceed;
    }
}
