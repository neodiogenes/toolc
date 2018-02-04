package com.toolc.scheduled;

import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.toolc.dao.ScheduledReportDAO;
import com.toolc.model.ScheduledReport;

@Component
public class ReportDeliveryTasks {

    @Autowired ScheduledReportDAO dao;

    BlockingQueue<ScheduledReport> queue = new ArrayBlockingQueue<>(1024);
        
    //@Scheduled(cron="${scheduling.cron.report_delivery_tasks}")
    public void run() {
        new Thread(new Loader(queue, dao)).start();
        new Thread(new Reader(queue)).start();
    }
 
}

class Loader implements Runnable {
    protected static final String END_OF_QUEUE = "END_OF_QUEUE";
    private static final int HOUR_TO_SEND_DAILY_REPORTS = 9;
    
    protected BlockingQueue<ScheduledReport> queue = null;
    ScheduledReportDAO dao = null;
    
    public Loader(BlockingQueue<ScheduledReport> queue, ScheduledReportDAO dao){
        this.queue = queue;
        this.dao = dao;
    }
    
    public void run(){
        Calendar now = new GregorianCalendar();
        List<ScheduledReport> scheduledReports = dao.findAll();
        System.out.println(scheduledReports.size());


        if (now.get(Calendar.HOUR_OF_DAY) > HOUR_TO_SEND_DAILY_REPORTS && now.get(Calendar.HOUR_OF_DAY) > (HOUR_TO_SEND_DAILY_REPORTS + 1)){
            scheduledReports.forEach(report -> {
                boolean queueDelivery = true;
                
/*                if (report.getScheduleType().equalsIgnoreCase(scheduleTypes.DAILY.toString())){
                        queueDelivery = true;
                    
                } else if (report.getScheduleType().equalsIgnoreCase(scheduleTypes.WEEKLY.toString())){
                    if (report.getDayOfWeek().equalsIgnoreCase(DayOfWeek.of(now.get(Calendar.DAY_OF_WEEK)).toString())){
                        queueDelivery = true;
                        
                    }
                    
                } else if (report.getScheduleType().equalsIgnoreCase(scheduleTypes.MONTHLY.toString())){
                    if (report.getDayOfMonth() == now.get(Calendar.DAY_OF_MONTH)){
                        queueDelivery = true;
                        
                    }
                }*/
                
                if (queueDelivery) {
                    try {
                        System.out.println("Loading report " + report.getName());
                        queue.put(report);
                    } catch (InterruptedException e) {
                        // TODO Log errors
                        e.printStackTrace();
                        Thread.currentThread().interrupt();
                    }
                }
            });
            
            ScheduledReport lastReport = new ScheduledReport();
            lastReport.setName(END_OF_QUEUE);
            try {
                queue.put(lastReport);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
        
        
    }
}

class Reader implements Runnable {
    
    protected BlockingQueue<ScheduledReport> queue = null;
    
    public Reader(BlockingQueue<ScheduledReport> queue){
        this.queue = queue;
    }
    
    @Override
    public void run() {
        boolean endOfQueue = false;
        
        while(!endOfQueue) {
            try {
                ScheduledReport report = queue.take();
                if (report.getName().equalsIgnoreCase(Loader.END_OF_QUEUE)){
                    endOfQueue = true;
                } else {
                    System.out.println(report.getName());
                }
            } catch (InterruptedException e) {
                // TODO Log errors
                e.printStackTrace();
                Thread.currentThread().interrupt();
            }
        }
        
    }
    
}
