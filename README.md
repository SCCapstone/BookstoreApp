# Book Store App

We are making a Bookstore App 
Rahul did it wrong and edited this line This first paragraph should be a short description of the app. You can add links to your wiki pages that have more detailed descriptions.  

Your audience for the Readme.md are other developers who are joining your team.  
Specifically, the file should contain detailed instructions that any developer can follow to install, compile, run, and test your project. These are not only useful to new developers, but also to you when you have to re-install everything because your old laptop crashed. Also, the teachers of this class will be following your instructions.  

## ALfred was here (External Requirements)

List all the stuff the reader will need to install in order to get you app to run in their laptop. For example:  

In order to build this project you first have to install:

* [Node.js](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)

If possible, list the actual commands you used to install these, so the reader can just cut-n-paste the commands and get everything setup.  

You only need to add instructions for the OS you are using.

## Setup

Here you list all the one-time things the developer needs to do after cloning your repo. Sometimes there is no need for this section, but some apps require some first-time configuration from the developer, for example: setting up a database for running your webapp locally.  

## Running

Specify the commands for a developer to run the app from the cloned repo.

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

William Hobbs, Jack Oberman... blah blah blah
