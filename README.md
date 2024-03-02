Clone the Repository:

Clone this repository to your local machine 

Install Dependencies: npm install



Create a .env file in the root directory.
Define the following environment variables in the .env file:

SECRET=your secret
DB_PASSWORD=YOUR PASSWORD
Database Setup:

Set up your database according to the provided models. You can use mongodb 


Start the Server: node index.js



Open your web browser and navigate to http://localhost:port-number to access the application.

Folder Structure:

config/: Contains configuration files, such as database configuration and nodemailer settings
middleware/: middleware setup.
repository/: for repository files
controllers/: Handles the application's logic by interacting with the models and sending responses to the views.
models/: Defines the data structures 
schemas/: Datebase schemas
routes/: Contains route definitions that specify how the application responds to client requests.
views/: Stores the ejs templates that are rendered by the server and sent to the client.


Please find the video recording explaining the project structure and folder organization here: https://youtu.be/flZzvJALLlE
