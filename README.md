# Real-Time Menu Recommendation and Order Application Based on Weather Change built by React, Node, and MongoDB

## Front-end : React (redux, reduxForm, react-router-dom react-bootstrap)
###  - library and API : react-stripe, react-google-maps, react-slick, react-modal, moment and etc.
###  - css control : react-bootstrap, wow.js
## Back-end : Node.js (express and mocha)
###  - library : stripe, mongoose, bcrypt
## Database : MongoDB

## Manual
### clone or download applications
### type "npm install" in terminals at the most parent root and client directories  

## Application Concept :
#### Weather always impacts on customer's menu choice in a restaurant. By employing recommendation menu (Current Specials) based on the weather information, the application helps customers intuitively choose and place an order their favorit foods in a bit.

## App Structure :
#### Restaurant locations
#### Real-time weather based on locations
#### Recommendation menu based on present weather information
#### Menu order with detailed food information additionally containing other customer's reviews
#### Guesbooks (containing customer's food evaluation and recommendation)
#### Login & guestbook management (for instance, delete customer's post)

#### 1. Restaurant Location and Weather Information
####      - displaying local weather information 
####      - and updating weather information every 5 minute 
####      - by utilizing OpenWeatherMap and GoogleMap packages
##### [Toronto Restaurant]
##### ![Main Page1](/client/public/images/git_readme/location.PNG)
##### [Vancouver Restaurant]
##### ![Main_Page2](/client/public/images/git_readme/location2.PNG)
#### 2. Recommendatiion Menus  
####      - implementing weather information in the background
####      - and updating new recommendation menus every 5 minute
####      - by plugging in a menu recommendation engine built by myself
##### ![Recommendation_Menu](client/public/images/git_readme/recommendation.PNG)
#### 3. Menu Detail  
####      - implementing customer reviews for each food
####      - including other related menus
####      - by implementing react-bootstrap.modal
##### ![Detail1](client/public/images/git_readme/detail1.PNG)
##### ![Detail2](client/public/images/git_readme/detail2.PNG)
#### 4. Menu & Order  
####      - dipalying simple and intuitive buttons for the customers to finalize a number of orders
####      - and linking to food detail pages which also show customer's reviews and recommendations
##### ![Menu_Order1](client/public/images/git_readme/selectMenu.PNG)
#### 5. Ordering  
####      - automatically switching/showing the left and right buttons in terms of a number of selected menus and screen sizes        
####      - and dipalying selected menu for the customers to check out what they just ordered before they palce an order
####      - by utilizing React-Slick 
##### ![Ordering1](client/public/images/git_readme/placeanorder.PNG)
#### 6 Estimated Reciept
#####     - displaying estimated billing information 
#####     - and including a function to cancel and to submit their orders
#####     - FYI, React-Modal is imported to display billing information
##### ![Menu_Order3](client/public/images/git_readme/bill.PNG)
#### 7. Credit Card by employing Stripe.js
#####     - In test mode, the card number : 4242 4242 4242 4242
#####       date : any day from today
#####     - CVS : any 3 digit numbers
##### ![Menu_Order2](client/public/images/git_readme/creditcard.PNG)
#### 8. Customer Survey  
####      - generating a form where the customers can enter their posts about food and service evaluations
####      - automatically generating the foods the customers just placed an order
####      - and providing email and password inputs that are required for the customers to login and then delete their posts
####      - by enclosing redux-form validation
##### ![Survey](client/public/images/git_readme/survey.PNG)
#### 9. Posting Board
#####     - listing the all posts the customers uploaded 
#####     - hiding the "dislike"ed posts for the marketing reason
#####     - and limiting a number of posts to 10 to save time
#####     - FYI, it works with mlab 
##### ![Board](client/public/images/git_readme/postingboard.PNG)
#### 10. Post
#####     - displaying the previous customer's posts 
#####     - and hiding "Delete" button without user login
##### ![Post](client/public/images/git_readme/post.PNG)
#### 11. Login
#####     - rendering a form where the customers enter email and password to delete their posts 
#####     - and functioning validation about email and password
##### ![Login](client/public/images/git_readme/login.PNG)
#### 12. Individual Customer's Posting Board
#####     - displaying individual customer's posts as they logged in
#####     - FYI, all data are pulled out of mlab through node
##### ![Customer_Board](client/public/images/git_readme/yourposts.PNG)
##### 5.2 Customer Post
#####     - displaying a "Delete" button only when the customer logged in 
##### ![Customer_Board](client/public/images/git_readme/eachpost.PNG)






