

## before you start
Before you actually start developing run these commands in your terminal
    git checkout -b"{Name of your branch}"
    git push --set-upstream origin {branchname}
then when you push your commits they'll be sent to a seperate branch in the main repository.


## how to get it running

    NPM install

npm start will only start the node server

##You must have docker installed if you don't want to set your local postgres up to work with the project

To use postgres with this type
docker-compose up --build -d
then to manually connect to it type
psql -h localhost -U postgres -d bnb {whatever database you want to connect to} 
-h is for the host
-U is for what user you want to login as


If you want to use local postgres and not run it in a docker container just copy the sql commands from the users.sql file and paste it in psql

