{\rtf1\ansi\ansicpg1252\cocoartf2636
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;\f1\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue0;\red255\green255\blue255;\red100\green241\blue169;
\red173\green173\blue173;}
{\*\expandedcolortbl;;\cssrgb\c0\c1\c1;\cssrgb\c100000\c100000\c100000\c0;\cssrgb\c44607\c94455\c71934;
\cssrgb\c73333\c73333\c73333;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 How to use this system?\
1) This system use  Chudnovsky Algorithm to calculate the PI\
2) If you add a planet that already exist in datable, it will increase the Pi accuracy instead and give a new value base on new accuracy,\
3) If you add a new planet that not exist in datable yet, it will calculate Pi value with accuracy of digit 1.\
\
How to Run the System?\
1) clone the project from\
2) Open terminal/command line and navigate to server folder and run \'91npm install\'92 to install all libraries.\
3) Open your MySql manager and create a database name \'91Naluri_Space\'92.\
4) Right click on the created datable on step 3 and select tools > restore database\
5) Select database backup file \'93dump-Naluri_Space-202207250028.sql\'94 in database folder.\
6) create .env file in the server root folder and set:\
	NODE_ENV=development\
\
	PORT = 3106\
\
	DATABASE = Naluri_Space\
	DATABASE_HOST = localhost\
	DATABASE_USER = root\
	DATABASE_PASSWORD = your password\
7) make sure to set the details (etc: password, host, user) of .env file to follow your MySql server credentials.\
8) open terminal and navigate to server folder and run \'93nom start\'94\
9) The system can be access at http://localhost:3106/\
10) This system use Stored Procedure to execute the query\
\
Back end libraries used:\
1) express.js\
2) big number.js\
3) cors\
4) doenv\
5) mysql2\
6) winston\
7) nodemon\
\
Front end libraries used:\
1) React\
2)\cf2 \cb3  
\f1 \expnd0\expndtw0\kerning0
@reduxjs/toolkit
\f0 \cf0 \cb1 \kerning1\expnd0\expndtw0 \
3) ant\
4) 
\f1 \cf2 \cb3 \expnd0\expndtw0\kerning0
react-highlight-words\
5) rtk query\cf5 \cb1 \
}

Additional thoughts
1) To convert the Pi Algorithm to code is quite challenging, required some mathematics knowledge to understand on how the Pi Algorithm work.
2) This week time really is not in my favor, because has been a very busy week, hope can spend more time on this project to produce a better system.
3) This project can be improve further by providing a notification feedback to user when they perform CRUD.
4) Can improve in the frontend area to provide a picture or animated visual of the sun to make it more engaging and interactive.
