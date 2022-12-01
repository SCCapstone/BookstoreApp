# Book Store App 
We are making a Bookstore App that renders on both mobile and desktop web devices natively. Users and employees will have the ability to create an account, login, browse and purchase books, and more. Ultimately, we hope that this web application will be used by local businesses to grow their web presence and increase revenue.  

## External Requirements Installation
In order to build this project install:
* [Node Package Manager](https://www.npmjs.com/)
* [Node.js](https://nodejs.org/en/)
* All of the required packages, APIs, and libraries - description for how to do this in Setup.

## Setup
Before running the app a few things have to be installed in both the client and backend. Run these instructions in the terminal:  
#### Base Folder 
Ensure you are in "BufferOverload" and run these commands:  
`npm i`  

#### Back-End  
`cd` into the backend folder and run: `npm i`  

#### Client    
`cd` into the client folder and run: `npm i && npm run build` 

NOTE: If you are running locally, you will need a `.env` file which contains, among other things,
private keys for authentication. Contact the developers for more information about this.

## Running
To run the app make sure to cd into the base-folder (Buffer-Overload) and run `npm start` in the terminal.
The terminal should tell you what port it launches on (usually 3001). Navigate to `localhost:3001/` or equivalent.

# Deployment
To deploy our bookstore web application we plan on using Heroku. Embedded into Heroku comes the option of using the mongoDB database which will be used for storing user information and the book inventory. Integrated with this, we plan to use the Amazon API for book browsing and potential book purchases. The stored user information and book inventory will follow JSON formatting. https://www.heroku.com/

In using Heroku as the method to deploy our bookstore web application, we will be using Docker containers for development. Using these containers for our web app are essential because they are small, executable packages which are easy to use for development and running the application. The up side to Docker is that it is faster, scalable, and easy to use compared to virtual-machines. https://www.docker.com/

We will use a traditional web app model because the Heroku hosting platform will easily handle the small load of server operations for our app.


## Testing
In 492 we plan to write tests for our app.

## Testing Technology

In some cases you need to install test runners, etc. Explain how.

## Running Tests

Explain how to run the automated tests.

## Authors

* Rahul Bulusu: rbulusu@email.sc.edu
* William Hobbs: wihobbs@email.sc.edu
* Jack Oberman: joberman@email.sc.edu 
* Sai Oruganti: orugants@email.sc.edu
* Alfred Lin: alfredl@email.sc.edu
