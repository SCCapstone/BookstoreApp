# Book Store App 

We are making a Bookstore App that renders on both mobile and desktop web devices natively. Users and employees will have the ability to create an account, login, browse and purchase books, and many more. Ultimately, we hope that this web application will be used by local businesses to grow their web presence and increase revenue.  

## External Requirements

List all the stuff the reader will need to install in order to get you app to run in their laptop. For example:  

In order to build this project you first have to install:

* [Node.js](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)
* npm `npm i react-download`
* React `npm install react-scripts`
* [Git](https://gist.github.com/derhuerst/1b15ff4652a867391f03) - This website has detailed explainations 
for how to download Git based on the OS system you use (i.e. Windows, Mac, or Linux - Ubuntu)
## Setup

Install npm (npm install react-scripts) and install MongoDB.

## Running
Before running the app a few things have to be installed in both the client and backend:
<u>Back-End<u>
1) npm i -S mongoose express body-parser morgan cors
<u>Client<u>
1) npm i -S axios
2) npm i register-service-worker
To run the app, first enter /client directory. This can be done by running `cd client` and run `npm start` in the terminal.

# Deployment
To deploy our bookstore web application we plan on using DigitalOcean. Embedded into DigitalOcean comes the option of using the mongoDB database which will be used for storing user information and the book inventory. Integrated with this, we plan to use the Amazon API for book browsing and potential book purchases. The stored user information and book inventory will follow JSON formatting. https://www.digitalocean.com/community/tutorials/how-to-deploy-a-react-application-to-digitalocean-app-platform

In using DigitalOcean as the method to deploy our bookstore web application, we will be using Docker containers for development. Using these containers for our web app are essential because they are small, executable packages which are easy to use for development and running the application. The up side to Docker is that it is faster, scalable, and easy to use compared to virtual-machines. https://www.docker.com/

We will use a traditional web app model because the DigitalOcean hosting platform will easily handle the small load of server operations for our app.

# Testing

In 492 you will write automated tests. When you do you will need to add a 
section that explains how to run them.

The unit tests are in `/test/unit`.

The behavioral tests are in `/test/casper/`.

## Testing Technology

In some cases you need to install test runners, etc. Explain how.

## Running Tests

Explain how to run the automated tests.

# Authors
* Rahul Bulusu: rbulusu@email.sc.edu
* William Hobbs: wihobbs@email.sc.edu
* Jack Oberman: joberman@email.sc.edu 
* Sai Oruganti: orugants@email.sc.edu
* Alfred Lin: alfredl@email.sc.edu