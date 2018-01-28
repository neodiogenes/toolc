package com.toolc.appservice;

import java.io.File;
import java.io.IOException;

import javax.mail.Address;
import javax.mail.Message.RecipientType;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


@Service
public class MailerService {
    Logger logger = Logger.getLogger(MailerService.class);
    
    @Autowired JavaMailSender mailSender;
    
    /**
     * 
     * @param emailAddresses
     * @param subject
     * @param message
     * @throws MessagingException
     * @throws IOException
     */
    public void send(String[] emailAddresses, String subject, String message)  throws MessagingException, IOException { 
        this.send(emailAddresses, subject, message, null);
    }
    
    /**
     * 
     * @param emailAddresses
     * @param subject
     * @param message
     * @param file
     * @throws MessagingException
     * @throws IOException
     */
    public void send(String[] emailAddresses, String subject, String message, ClassPathResource file)  throws MessagingException, IOException { 
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
        mimeMessage.setContent(message, "text/html");
        //mimeMessage.setText(message);
        helper.setTo(emailAddresses);
        helper.setSubject(subject);
        
        //helper.setFrom(from);   

        if (file != null) {
            helper.addAttachment(file.getFilename(), file);
        }
        
        
        //logger.info("Sending SRM mail: " + debug(emailAddresses, from, subject, message, file.getFile()));
        
        //ByteArrayOutputStream os = new ByteArrayOutputStream();
        //mimeMessage.writeTo(os);
        //System.out.println(os.size());
        
        this.mailSender.send(mimeMessage);
    }
    
/*    public void send(String[] emailAddresses, String from, String subject, String message, File file)  throws MessagingException, IOException { 
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
        mimeMessage.setText(message);
        helper.setTo(emailAddresses);
        helper.setSubject(subject);
        //helper.setFrom(from);   
        
        helper.addAttachment(file.getName(), file);
                    
        logger.info("Sending SRM mail: " + debug(emailAddresses, from, subject, message, file));
        
        
        this.mailSender.send(mimeMessage);
    }*/
    

    public String debug(String[] emailAddresses, String from, String subject, String message, File file) {
        StringBuffer buff = new StringBuffer(); 
        try{
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "utf-8");
            mimeMessage.setContent(message, "text/html");
            helper.setTo(emailAddresses);
            helper.setSubject(subject);
            helper.setFrom(from);
            
            try {
                buff.append("FROM: " + mimeMessage.getFrom()[0]);
                buff.append("\n");
                buff.append("TO: ");
                for (Address a : mimeMessage.getRecipients(RecipientType.TO))
                    buff.append(a + ", ");
                buff.append("\n");
                buff.append(mimeMessage.getContent().toString());
                
                if (file != null) {
                    buff.append("\n");
                    buff.append("ATTACHMENT:" + file.getName() + " " + file.length());
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        catch (MailException ex) {
            ex.printStackTrace();
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        
        System.out.println(buff.toString());
        return buff.toString();
    }
}
