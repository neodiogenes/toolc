package com.toolc;

import java.net.URI;
import java.util.concurrent.ThreadLocalRandom;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import com.google.gson.Gson;
import com.toolc.appservice.ApplicationUserService;
import com.toolc.appservice.ScheduledReportService;
import com.toolc.model.ApplicationUser;
import com.toolc.model.ScheduledReport;



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
        
        Gson gson = new Gson();
        
        ApplicationUser testUser = 
                userService.createUser("admin111@toolc.com", "password");
        
        logger.debug(testUser.getId());
        
        {
            ScheduledReport report = new ScheduledReport();
            report.setOwner(testUser);
            report.setName("Daily Sales by Region Version 1.2");
            report.setUrl(new URI("https://reports.toolc.com/api/reports?name=sales_by_region_v1_2"));
            report.setDescription("Test Description");
            report.setFormat("PDF");
            report.setDelivery("Email");
            report.setScheduleType("Daily");
            report.setSavedFilename("Sample-Monota-Monthly-Sales-Report-PDF-Format.pdf");
            report = reportService.create(report);
        }
        
        {
            ScheduledReport report = new ScheduledReport();
            report.setOwner(testUser);
            report.setName("Weekly Sales Totals by Salesperson");
            report.setUrl(new URI("https://reports.toolc.com/api/reports?name=weekly_sales_totals_by_salesperson"));
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
            report.setUrl(new URI("https://reports.toolc.com/api/reports?name=monthly_adv_budget_region_v2_0"));
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
            report.setUrl(new URI("https://reports.toolc.com/api/reports?name=monthly_adv_budget_region_v2_0"));
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
        
    }
}




/*            report.setScheduleDetail(
                    gson
                        .fromJson(
                                "{\"frequency\":\"weekly\", \"dayOfWeek\":\"Monday\"}",
                        JSONObject.class)
                        .toJSONString()
            );*/