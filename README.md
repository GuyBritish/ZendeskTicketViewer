# ZendeskTicketViewer 
An web application created with HTML, CSS, Node.js, and Express. This application makes requests to the Zendesk API to retrieve tickets for an account. This is my submission for the Zendesk Coding Challenge 2021.

[**Live Demo**](https://zendeskticket.herokuapp.com/) (This is temporary since zcc free trial account will expire)

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
2. You'll need to specify the following information in the file
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
|**views**       | Contains all EJS template files for rendering interface |
|index.js        | Entry point to Express app |
|package.json    | Contains all project and dependencies information, as well as build scripts |

### Design Choices
#### Request tickets from Zendesk API
- Requests in my application are made with Axios which provides a lightweight package with extensible interface for HTTP requests from Node.js and browser. 
- The project uses basic authentication as shown in the Intern Coding Challenge document - with Zendesk account credentials. The account information is stored in environment variables in the .env file, and will be read by the internal Node.js application as well as the unit tests. This method can offer security for my provided Zendesk account information, and potential flexibility if a login page were to be implemented.

#### Display tickets in a list with pagination
- Initially, I chose to request all available tickets and choose the appropriate tickets for displaying in a page. But upon reading more carefully the Zendesk API documentation, I opted for offset pagination - uses *per_page* (25) and *page* parameters to request ticket for a particular page. While cursor pagination is recommended for performance reasons, offset pagination offers a more flexible and user friendly way in navigating the ticket list of a single user without notable compromise to performance.
- The pagination navigation will be a limited series of links (15 max) to available pages around the current page. Therefore, the user can quickly and conveniently move between different pages without having the display cluttered with page links and tickets.
- Display ticket's subject, type, and tags to increase readability and potentially useful for identifying tickets.

#### Display individual ticket details
- Change p tag's style to retain the ticket requester's original message formatting.
- Display ticket's subject, description, requester ID, type, tags, and last-updated time.
  
#### Error handling
- I chose to add a custom error - *ExpressError* - to include more accessible status code and error message for rendering to the interface.
- I implement a catcher function for all internal asynchronous functions to better consolidate potential errors.
- If an unexpected error is thrown, the application will show the default message "Something is wrong!". Otherwise, a friendly error message will be extracted from the Zendesk API's response. 
- While in production the error message will be concise and user-friendly, in development, the error page can also display the stack trace for debugging.

#### Unit test
- The project include unit tests using the Mocha framework and chai assertion library.
- I made test cases for ticket request and helper functions. 
    - The request functions will be tested if they throw the appropriate errors and return output in a correct format.
    - The helper functions will be tested if they throw the appropriate errors and return the correct ouput.
