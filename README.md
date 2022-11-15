# V-HELP Backend Services
This repository contains the REST API Service for our [assignment project](https://github.com/z80lives/V_HELP-app).


## Usage
In order to quickly start a server, goto the development server and run the npm start script.
```
  cd v-help-be
  npm i 
  npm run start
```
While running a development server, you can use `npm run build:watch` script to ensure that the `dist`
folder is updated as you modify the contents of the `src`.
 
## Setting up the database
By default, if you have not configured a database the system will fallback to a volatile database.
Install mongodb server and set up our system by creating a .env file.
The following variables can be set:
 - DB_URL
 - DB_PASSWORD
 - DB_HOST
 - DB_USER
 
