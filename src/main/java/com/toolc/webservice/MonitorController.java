package com.toolc.webservice;

import java.util.Date;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/monitor")
public class MonitorController {
    
    @GetMapping("/")
    public long getMonitor(){
        return (new Date()).getTime();
    }

}
