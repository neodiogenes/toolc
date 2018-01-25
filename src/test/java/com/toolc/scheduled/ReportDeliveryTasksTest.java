package com.toolc.scheduled;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles({"local", "app_runner", "test"})
public class ReportDeliveryTasksTest {

    @Autowired
    ReportDeliveryTasks tasks;
    
    @Test
    public void testRun() throws InterruptedException {
        
        Thread.sleep(4000);
        tasks.run();
    }

}
