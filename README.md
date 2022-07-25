How to use this system?
1) This system use  Chudnovsky Algorithm to calculate the PI.
2) If you add a planet that already exist in datatable, it will increase the Pi accuracy instead and give a new value base on new accuracy.
3) If you add a new planet that not exist in datatable yet, it will calculate Pi value with accuracy of digit 1.

How to Run the System?
1) clone the project.
2) Open terminal/command line and navigate to server folder and run "npm install" to install all libraries.
3) Open your MySql manager and create a database name "Naluri_Space".
4) Right click on the created database on step 3 and select tools > restore database.
5) Select database backup file "dump-Naluri_Space-202207250028.sql" in database folder.
6) create .env file in the server root folder and set:

	NODE_ENV=development

	PORT = 3106

	DATABASE = Naluri_Space
	
	DATABASE_HOST = localhost
	
	DATABASE_USER = root
	
	DATABASE_PASSWORD = your password
	
7) make sure to set the details (etc: password, host, user) of .env file to follow your MySql server credentials.
8) open terminal and navigate to server folder and run "npm start".
9) The system can be access at http://localhost:3106/
10) This system use Stored Procedure to execute the query

Back end libraries used:
1) express.js
2) big number.js
3) cors
4) doenv
5) mysql2
6) winston
7) nodemon

Front end libraries used:
1) React
2) @reduxjs/toolkit
3) ant
4) react-highlight-words
5) rtk query

Additional thoughts
1) To convert the Pi Algorithm to code is quite challenging, required some mathematics knowledge to understand on how the Pi Algorithm work.
2) This week time really is not in my favor, because has been a very busy week, hope can spend more time on this project to produce a better system.
3) This project can be improve further by providing a notification feedback to user when they perform CRUD.
4) Can improve in the frontend area to provide a picture or animated visual of the sun to make it more engaging and interactive.
