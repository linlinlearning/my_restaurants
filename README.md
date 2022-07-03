# My Restaurants
An exercise project, this is a restaurant finder website that selects restaurants in Taipei, Taiwan (Chinese interface)

## Features
- Get a quick view on all restaurants on the homepage
- Click on a restaurant photo or the Details button to view more details
- Link to Google Map of a restaurant address
- Search for restaurants by keyword (name, category, or description)
- Add a restaurant
- Edit restaurant details from the homepage or a detail page 
- Delete a restaurant
- Sort restaurants by name, category, or location

## Getting started
1. Clone the project
```
git clone https://github.com/linlinlearning/my_restaurants.git
```
2. Go to the directory
```
cd my_restaurants
```
3. Install required dependencies
```
npm install
```
4. Install nodemon
```
npm i nodemon
```
5. Set environment variable: MONGODB_URI
```
MONGODB_URI=your connection string
```
6. Seed your database
```
npm run seed
```
7. Start the server
```
npm run dev
```
8. Copy the URL to a browser when seeing this message
```
App is running on http://localhost:3000
```
## Built with
-  node.js @ 14.16.0
-  express @ 4.16.4
-  express-handlebars @ 3.0.0
-  bootstrap @ 5.2.0
-  font-awesome @ 5.15.4