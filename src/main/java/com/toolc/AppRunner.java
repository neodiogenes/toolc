package com.toolc;

import java.net.URI;
import java.util.concurrent.ThreadLocalRandom;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import com.toolc.appservice.ApplicationUserService;
import com.toolc.appservice.ScheduledReportService;
import com.toolc.model.ApplicationUser;
import com.toolc.model.ScheduledReport;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;



@Component
@Profile("app_runner")
public class AppRunner implements CommandLineRunner {

    final String[] FORMAT_OPTIONS = {"PDF", "CSV", "PNG"};
    final String[] DELIVERY_OPTIONS = {"Email", "Link", "FTP"};
    final String[] SCHEDULE_OPTIONS = {"Daily", "Weekly", "Monthly"};
    
    static final Log logger = LogFactory.getLog(AppRunner.class);
    
    final ApplicationUserService userService;
    final ScheduledReportService reportService;
    
    public AppRunner(ApplicationUserService userService, ScheduledReportService reportService) {
        this.userService = userService;
        this.reportService = reportService;
    }

    @Override
    public void run(String... args) throws Exception {
        
        ApplicationUser testUser = userService.createUser("alteraa@yahoo.com", "password");
                
        
        logger.debug(testUser.getId());
        
        {
            ScheduledReport report = new ScheduledReport();
            report.setOwner(testUser);
            report.setName("Daily Sales by Region Version 1.2");
            report.setUrl(new URI("https://reports.toolc.com/api/reports?name=sales_by_region_v1_2").toString());
            report.setDescription("Test Description");
            report.setFormat("PDF");
            report.setDelivery("Email");
            report.setScheduleType("Daily");
            report.setSavedFilename("Sample-Monota-Monthly-Sales-Report-PDF-Format.pdf");
            
            JSONArray filterArray = new JSONArray();
            {
                JSONObject param = new JSONObject();
                param.put("name", "foo1");
                param.put("value",  "bar1");
                filterArray.add(param);
            }
            {
                JSONObject param = new JSONObject();
                param.put("name", "foo2");
                param.put("value",  "bar2");
                filterArray.add(param);
            }
            {
                JSONObject param = new JSONObject();
                param.put("name", "foo3");
                param.put("value",  "bar3");
                filterArray.add(param);
            }
            report.setFilters(filterArray.toString());
            
            report = reportService.create(report);
        }
        
        {
            ScheduledReport report = new ScheduledReport();
            report.setOwner(testUser);
            report.setName("Weekly Sales Totals by Salesperson");
            report.setUrl(new URI("https://reports.toolc.com/api/reports?name=weekly_sales_totals_by_salesperson").toString());
            report.setDescription("Weekly Sales Totals by Salesperson");
            report.setFormat("PNG");
            report.setDelivery("Link");
            report.setScheduleType("Weekly");
            report.setDayOfWeek("Thursday");
            
            report = reportService.create(report);
        }
        
        {
            ScheduledReport report = new ScheduledReport();
            report.setOwner(testUser);
            report.setName("Montly Advertising Budget by Region v2.0");
            report.setUrl(new URI("https://reports.toolc.com/api/reports?name=monthly_adv_budget_region_v2_0").toString());
            report.setDescription("Montly Advertising Budget by Region v2.0");
            report.setFormat("CSV");
            report.setDelivery("FTP");
            report.setScheduleType("Monthly");
            report.setDayOfMonth(25);
            
            report = reportService.create(report);
        }
        
        for (int i=1; i<10; i++) {
            ScheduledReport report = new ScheduledReport();
            report.setOwner(testUser);
            report.setName("Extra Sample Report " + i);
            report.setUrl(new URI("https://reports.toolc.com/api/reports?name=monthly_adv_budget_region_v2_0").toString());
            //report.setDescription("Montly Advertising Budget by Region v2.0");

            int r = ThreadLocalRandom.current().nextInt(0, 3);
            report.setFormat(FORMAT_OPTIONS[r]);
            
            r = ThreadLocalRandom.current().nextInt(0, 3);
            report.setDelivery(DELIVERY_OPTIONS[r]);

            r = ThreadLocalRandom.current().nextInt(0, 3);
            report.setScheduleType(SCHEDULE_OPTIONS[r]);
            report.setDayOfWeek("Monday");
            report.setDayOfMonth(1);
            
            report = reportService.create(report);
        }
        
        

        ApplicationUser testUser2 = userService.createUser("admin111@toolc.com", "password");
        
        for (int i=1; i<5; i++) {
            ScheduledReport report = new ScheduledReport();
            report.setOwner(testUser2);
            report.setName("AA Sample Report " + i);
            report.setUrl(new URI("https://reports.toolc.com/api/some_report_" + i).toString());
            //report.setDescription("Montly Advertising Budget by Region v2.0");

            int r = ThreadLocalRandom.current().nextInt(0, 3);
            report.setFormat(FORMAT_OPTIONS[r]);
            
            r = ThreadLocalRandom.current().nextInt(0, 3);
            report.setDelivery(DELIVERY_OPTIONS[r]);

            r = ThreadLocalRandom.current().nextInt(0, 3);
            report.setScheduleType(SCHEDULE_OPTIONS[r]);
            report.setDayOfWeek("Monday");
            report.setDayOfMonth(1);
            
            report = reportService.create(report);
        }
        
        ApplicationUser testUser3 = userService.createUser("andrew0alter@gmail.com", "password");
        testUser3.setArchived(true);
        
        testUser3 = userService.update(testUser3);
    }
}