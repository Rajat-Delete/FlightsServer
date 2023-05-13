This is a base node js project template, which anyone can useas it has been prepared by keeping some of the most important code principles and project management recommendations.Feel Free to change anything.

`src` -> Inside the src folder all the actual source code regardring the project will reside, this will not include any kinds of tests.(You might want to create a seperate tests folder).

Let's take a look inside the `src` folder

- `config` -> In this folder anything and everything regarding any configurations or setup of a library will be done. For example: setting up `dotenv` so that we can use the environment variables anywhere in a cleaner fashion, this is done in the `server-config.js`.One more example can be to setup you logging library that can help you to prepare meaningful logs, so configuration for this library should also be done here.

- `routes` ->In the routes folder, we register a route and the corresponding middleware and controllers to it.

- `middlewares` -> they are just going to intercept the incoming request where we can write our validators, authenticators etc.

- `controllers` -> they are kind of the last middleware as post them you call your business layer to execute the business logic. In controllers we just receive the incoming requests and then pass it to the business layer, and once business layer returns an output, we structure the API response in controllers and send the output.

- `repositories` -> this folder contains all the logic using which we interact the DB by writing queries, all the raw queries or ORM will go here.

- `services` -> contains all the business logic and interacts with repositories for data from the database.

- `utils` -> contains helper methods, error classes etc.


### Setup the project

- Download the template from github and open it in your favourite code editor.

- Go inside the folder path and execute the following command:
```
    npm install
```

-In the root directory create a `env` file and add the following env variables

```
    PORT=<port number of your choice>
```

ex :
```
    PORT=3000
```
- go inside the `src` folder and execute the following command:
```
    npx sequelize init
```
- By executing the above command you will get migrations and seeders folder along with a config.json inside the config folder.


- If you're setting up development environment, then write the username of your db, password of your db and in dialect mention the db you are using for ex: mysql, mariadb etc

- If you're setting up test for prod environment, make sure you also replace the host with the hosted db url. 

- To run the server execute
```
npm run dev
```