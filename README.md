# ZendeskTicketViewer 
An web application created with HTML, CSS, Node.js, and Express. This application makes requests to the Zendesk API to retrieve tickets for an account. This is my submission for the Zendesk Coding Challenge 2021.

---
## Requirements

For development, you will need Node.js and npm installed in your environment.

- Install Node.js v14.17.6
- Install npm v6.14.15 (comes with Node.js v14.17.6)

## Running the project

### Installation
1. Clone the repository to your local machine.
```
$ git clone https://github.com/GuyBritish/ZendeskTicketViewer.git
$ cd ZendeskTicketViewer
```
2. Install dependencies.
```
$ npm install
```
### Configuration
1. In project root directory, create a **.env** file
2. You'll need to specify the following
```
NODE_ENV=production
PORT=3000
DOMAIN=<Your Zendesk API subdomain>
EMAIL=<Your Zendesk account email address>
PASS=<Your Zendesk account password>
```
### Run the application
1. Use the following command
```
$ npm start
```
2. Navigate to localhost:3000 on browser
### Testing
Use the following command
```
$ npm test
```

## Project Design
### Structure Overview
| Name | Description |
|----------------|---------------------------|
|**controllers** | Define functions to serve the Express routes |  
|**node_modules**| Contains all dependencies |
|**public**      | Contains static files for Express application |
|**routes**      | Contains all Express routes |
|**test**        | Contains all test files for mocha testing framework |
|**utils**       | Define helper functions and objects for internal application |
|**views**       | Contains all files EJS template files for rendering interface |
|index.js        | Entry point to Express app |
|package.json    | Contains all project and dependencies information, as well as build scripts |

### Design Choices
