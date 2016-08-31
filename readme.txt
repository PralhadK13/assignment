This application is basically Manage Books

We can add Book
We can edit book
we can delete book
also books will be listed in grid format
Technology used :  React.js + Cassandra


To execute this application first you need to set up database

Cassandra :

Download cassandra from http://www.planetcassandra.org/cassandra/
you need to download the MSI file and install it on machine
after successfully installed you need to open the Cql shell
To open the cql you just need to type the cql in windows serarch and it will come.
open it and execute below mentioned db script for cassandra

CREATE KEYSPACE bookmanagement WITH replication = {'class' :'SimpleStrategy','replication_factor' : 3};
use bookmanagement;
CREATE TABLE book(id uuid,name varchar,category varchar,price varchar, PRIMARY KEY (id));


set path in CMD to assginment folder
 -->npm install
 set path in CMD to server folder
 --> npm install


 to run the server you have to perform below mentioned command

 node server.js

 to run the GUI you need to perform
 npm run gulp
