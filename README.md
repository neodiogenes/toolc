# Toolc

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.2.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build


To build the Angular 4 application:

1.  Install nodeJS (nodejs.org)
2.  Navigate to the root directory of the project
3.  Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

To build the Spring Boot application:

1.  Install maven (maven.apache.org) and configure it to run from the command line.
2.  From the root directory run `mvn clean install` to build the jar file.  Run `mvn clean install -DskipTests` to skip running tests.
3.  The Angular application files will be automatically moved to the `src/main/resources/static` directory and bundled into the jar file
3.  The jar file will be in the `target/` directory

To install to AWS

1.  Create a new PostgreSQL instance in Amazon RDS
2.  Configure AWS Elastic Beanstalk to create a new Java deployment  
3.  In your EBS configuration, set the following variables:

    - SERVER_PORT   5000
    - SPRING_JPA_DATABASE_PLATFORM  org.hibernate.dialect.PostgreSQL82Dialect
    - SPRING_DATASOURCE_URL [your_rds_url]
    - SPRING_DATASOURCE_USERNAME [your_rds_username]
    - SPRING_DATASOURCE_PASSWORD    [your_rds_password]  
    - SPRING_JPA_HIBERNATE_DDL_AUTO update
    - APPLICATION_ROOT_URL [root_url (e.g. https://toolc.com)
    
    (once developed we will add the email server credentials to this as well.  Note the "from" address has to be verified if using Amazon SES)
    - SPRING_MAIL_HOST [your email server URL]
    - SPRINT_MAIL_USERNAME [username to access email server]
    - SPRING_MAIL_PASSWORD [password for the email server username]
    - TOOLC_MAIL_DEFAULT_FROM [default "from" address if different from username]
    
4.  Deploy the jar file to your EBS instance (Upload and Deploy).  The spring application will create the database the first time it is run.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## POSTing new delivered report entries:

Almost all of the REST endpoints require a valid JavascriptWebToken in the Authorization header.  To get a token, POST to 

`[root_url]/api/login`

with the following JSON in the body:

    {
        "username": "your-username",
        "password": "your-password"
    }
    
The token will be in the Authorization header of the response.  Just place this same token into the Authorazation header of the API request:

`Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjExMUB0b29sYy5jb20iLCJleHAiOjE1MTkwODUzMzl9.f8IZf1-VhDfSv64tteOIF4d2g3kTB81Mt2k-An_0mhH0S1NYNfJ6IWBpSWpQX1dmjKu3tRSqm-2fGwvpOR8GMQ`

Make sure to also set the Content-Type to application/json:

`Content-Type: application/json`

Use the following JSON to POST a new delivered report entry:

`[root_url]/api/history`

with the following JSON in the body:
    
    {
        "id":"scheduled-report-uuid",
        "name":"report-name",
        "format":"report-format",
        "delivery":"report-delivery-type",
        "dateDelivered":standard-numerical-javascript-date (number of milliseconds since 1970)
    }
    
Example:
    
    {
        "id":"80aeaf72-40d2-4587-8aa5-7db8a1c362e5",
        "name":"Daily Sales by Region Version 1.2 AAAA",
        "format":"PDF",
        "delivery":"EMAIL",
        "dateDelivered":1518649178917
    }
You should get a response similar to the following JSON:

    {
        "id": "48bd0aa9-d49a-4425-a6dd-c5523950dc51",
        "dateCreated": 1519000006516,
        "dateUpdated": 1519000006516,
        "archived": false,
        "details": null,
        "scheduledReport": {
            "id": "83a46844-397d-487a-a49c-cdc97fcda1d7",
            "dateCreated": 1518999895693,
            "dateUpdated": 1518999895693,
            "archived": false,
            "details": null,
            "owner": {
                "id": "8f38a621-1b60-41c2-b370-0b7f147c451f",
                "dateCreated": 1518999895504,
                "dateUpdated": 1518999895504,
                "archived": false,
                "details": null,
                "displayName": null,
                "username": "alteraa@yahoo.com",
                "email": null,
                "companyId": null
            },
            "name": "Daily Sales by Region Version 1.2",
            "description": "Test Description",
            "url": "https://reports.toolc.com/api/reports?name=sales_by_region_v1_2",
            "format": "PDF",
            "delivery": "EMAIL",
            "scheduleType": "DAILY",
            "savedFilename": "Sample-Monota-Monthly-Sales-Report-PDF-Format.pdf",
            "dayOfWeek": "Monday",
            "dayOfMonth": 1,
            "filters": "[{\"name\":\"foo1\",\"value\":\"bar1\"},{\"name\":\"foo2\",\"value\":\"bar2\"},{\"name\":\"foo3\",\"value\":\"bar3\"}]",
            "emails": "[\"foo@bar2.com\",\"bar@foo2.com\"]"
        },
        "name": "Daily Sales by Region Version 1.2 AAAA",
        "format": "PDF",
        "delivery": "EMAIL",
        "reportFile": null,
        "dateDelivered": 1518649178917
    }






