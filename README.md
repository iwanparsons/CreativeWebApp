# CreativeWebApp

For my Creative Web App I plan on making a car curation web app in  a similar functional manner to an existing web app called VinWiki. My web app will allow for users to enter the registration plate of a vehicle and be given information such as the make and model, in addition users can also add photos of car whose number plate has been searched to build up a more in depth database of information about the vehicles.

The overall user experience will be similar to most social media sites in terms of layout with recently edited collections and added cars from users showing on a main feed with the ability to comment on each post.

The technology stack I intend to use is the MExN stack

For the base database in the app I plan to use Vehicle Enquiry Service (VES) API from the DVLA which will be combined with the user entered data to improve the detail and accuracy of the database. The main database along with user login and passwords wil be stored externally with current sessions being stored locally.

My main audience would be car enthusiasts who would like to catologue seen cars as well as use it as a tool to determine the rarity of vehicles on the road. A smaller userbase would be people that have a rising interest in cars and want to learn more about then.

Submission point 2b
In the experiments folder are my prototype and experiments. For the VehicleSearch program open index.html with live server, there are 2 reg numbers that return results; LC62LHE and BX16BUJ. For the 2ndExperiment use the command 'node index.js' in a dedicated terminal to run the app at localhost:3000

Submission point 2c
for this submission point there is a multi page app in the root of the repo this app allows the user to login and register with accounts being stored in a database. The code for the user login and registration was lifted from in class examples made by Dave anything not marked with a comment that it is Dave's code outside of all the pages in the views folder other than search.html is my own work. To run the code all that is needed is to run `node index.js` in the terminal, for the search page use any reg number you would like but if not use LC62LHE. Not all the user pages are fully styled as they are not the ine that are frequently visited so the main pages are somewhat styled. For my web technologies I am still using the MExN stack as well as using the DVLA Open Data API to get the vehicle information. I encountered an issue with my API choice as it does not hold the vehivle model just the make so in order to fix this I need to find another API that I will have the required data to call to in order to get the model data.