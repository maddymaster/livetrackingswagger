# livetrackingswagger
Basic live tracking for mobile apps and vehicle tracking hardware devices with swagger integration for Rest APIs documentation. 

There is a socket listener to it built in nodejs and a DB where the real time data is logged. Run the node app to know more. 

I have also built a computing engine that does basic time and distance calculations

After you clone the repo, run app.js in ADOM folder, you will notice that port 1337 will be run and this is the main app. there is also a communication server that does all the listening on port 1338. 
This communication server is the centrpiece of the application that talks to the main app (in ADOM folder)

Then there is swagger integration, visit swagger petstore and fire up the url, you can see the documentation built in. you may alternatively access swagger.yaml file located in the swagger drectory.

This application can help solve real time vehicle tracking problems in logistics, transport (like Uber), consignment management, delivery, hyperlocal delivery etc., and lots more

I call this application ADOM, it means Aggregation and Distribution on Mobile.

Contributions are welcome

regards
Maddy


