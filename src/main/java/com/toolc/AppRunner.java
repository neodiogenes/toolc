package com.toolc;

import java.net.URI;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import com.toolc.appservice.ApplicationUserService;
import com.toolc.appservice.DeliveredReportService;
import com.toolc.appservice.ScheduledReportService;
import com.toolc.model.ApplicationUser;
import com.toolc.model.ScheduledReport;
import com.toolc.model.stub.DeliveredReportStub;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;



@Component
@Profile("app_runner")
public class AppRunner implements CommandLineRunner {

    final String[] FORMAT_OPTIONS = {ScheduledReport.PDF, ScheduledReport.CSV, ScheduledReport.PNG};
    final String[] DELIVERY_OPTIONS = {ScheduledReport.EMAIL, ScheduledReport.LINK, ScheduledReport.FTP};
    final String[] SCHEDULE_OPTIONS = {ScheduledReport.DAILY, ScheduledReport.WEEKLY, ScheduledReport.MONTHLY};
    
    static final Log logger = LogFactory.getLog(AppRunner.class);
    
    final ApplicationUserService applicationUserService;
    final ScheduledReportService scheduledReportService;
    final DeliveredReportService deliveredReportService;
    
    public AppRunner(ApplicationUserService userService, ScheduledReportService reportService, DeliveredReportService deliveredReportService) {
        this.applicationUserService = userService;
        this.scheduledReportService = reportService;
        this.deliveredReportService = deliveredReportService;
    }

    @Override
    public void run(String... args) throws Exception {
        
        ApplicationUser testUser = applicationUserService.createUser("alteraa@yahoo.com", "password");
                
        
        logger.debug(testUser.getId());
        
        {
            ScheduledReport report = new ScheduledReport();
            report.setOwner(testUser);
            report.setName("Daily Sales by Region Version 1.2");
            report.setUrl(new URI("https://reports.toolc.com/api/reports?name=sales_by_region_v1_2").toString());
            report.setDescription("Test Description");
            report.setFormat(ScheduledReport.PDF);
            report.setDelivery(ScheduledReport.EMAIL);
            report.setScheduleType(ScheduledReport.DAILY);
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
            
            JSONArray emails = new JSONArray();
            emails.add("foo@bar2.com");
            emails.add("bar@foo2.com");
            report.setEmails(emails.toJSONString());
            
            report = scheduledReportService.create(report);
        }
        
        {
            ScheduledReport report = new ScheduledReport();
            report.setOwner(testUser);
            report.setName("Weekly Sales Totals by Salesperson");
            report.setUrl(new URI("https://reports.toolc.com/api/reports?name=weekly_sales_totals_by_salesperson").toString());
            report.setDescription("Weekly Sales Totals by Salesperson");
            report.setFormat(ScheduledReport.PNG);
            report.setDelivery(ScheduledReport.LINK);
            report.setScheduleType(ScheduledReport.WEEKLY);
            report.setDayOfWeek("Thursday");
            
            report = scheduledReportService.create(report);
        }
        
        {
            ScheduledReport report = new ScheduledReport();
            report.setOwner(testUser);
            report.setName("Montly Advertising Budget by Region v2.0");
            report.setUrl(new URI("https://reports.toolc.com/api/reports?name=monthly_adv_budget_region_v2_0").toString());
            report.setDescription("Montly Advertising Budget by Region v2.0");
            report.setFormat(ScheduledReport.CSV);
            report.setDelivery(ScheduledReport.FTP);
            report.setScheduleType(ScheduledReport.MONTHLY);
            report.setDayOfMonth(25);
            
            report = scheduledReportService.create(report);
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
            
            report = scheduledReportService.create(report);
        }
        
        List<ScheduledReport> reportList = scheduledReportService.findByOwner(testUser.getUsername());
        ScheduledReport rep = reportList.get(0);
        DeliveredReportStub dReport = new DeliveredReportStub();
        dReport.id = rep.getId().toString();
        dReport.name = rep.getName();
        dReport.format = rep.getFormat();
        dReport.delivery = rep.getDelivery();
        
        Calendar dateDelivered = new GregorianCalendar();
        
        for (int i=0; i<10; i++) {
            dateDelivered.add(Calendar.WEEK_OF_YEAR, -1);
            dReport.dateDelivered = dateDelivered.getTime();
            this.deliveredReportService.create(dReport);
        }
        
        

        ApplicationUser testUser2 = applicationUserService.createUser("admin111@toolc.com", "password");
        
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
            
            report = scheduledReportService.create(report);
        }
        
        ApplicationUser testUser3 = applicationUserService.createUser("camsoe@gmail.com", "password");
        testUser3.setArchived(false);
        
        testUser3 = applicationUserService.update(testUser3);
    }
}