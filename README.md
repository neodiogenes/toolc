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
4.  Delete all the files in the `src/main/resources/static` directory.
5.  Move all the files in the `dist/` directory to the `src/main/resources/static` directory.  These will be bundled with jar file when you build the Spring boot app

To build the Spring Boot application:

1.  Install maven (maven.apache.org) and configure it to run from the command line.
2.  From the root directory run `mvn clean install` to build the jar file.  Run `mvn clean install -DskipTests` to skip running tests.
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
    
4.  Deploy the jar file to your EBS instance (Upload and Deploy)

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
