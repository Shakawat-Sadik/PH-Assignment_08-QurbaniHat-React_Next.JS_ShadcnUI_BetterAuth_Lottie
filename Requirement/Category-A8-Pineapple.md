# **Assignment Category: category-A8-Pineapple**

# **QurbaniHat – Livestock Booking Platform**

**🚩🚩[Explanation Video](https://drive.google.com/file/d/1xurmK-ormxoLcmsfL-fDEum8OF2dVJaF/view?usp=sharing)**

## **Project Theme**

A modern livestock marketplace where users can explore animals for Qurbani such as cows and goats. Users can view details and place a booking after authentication.

##### **Key Things you have must to do**

* **GitHub Commits:** Include at least 10 meaningful commits with descriptive messages.

* **Readme.md:** Include a README file with the project name, purpose, live URL, key features, and any npm packages you have used.

* **Responsiveness:** Ensure the website is fully responsive on mobile, tablet, and desktop.

* **Environment Variables:** Secure configuration keys using environment variables.

* **Unique Design:**  Create a unique design that goes with the given Concept. You can use this [blog](https://medium.com/design-bootcamp/free-images-and-resources-collection-for-website-c77f2fc46ce5) for these kinds of resources 

* **Host your Application:**  You can choose deployment systems  like vercel, render for hosting . As you are developing a single page application   
  * ensure that  page doesn't throw any error on reloading from any routes.


## 

## **Main Requirements**

## **1\. Layout Structure**

### **Navbar** ✅

- [x] * Logo  
- [x] * Links: Home, All Animals  
- [x] * If logged in: avatar and logout  
- [x] * If logged out: login and register buttons

### **Footer** ✅

- [x] * Contact info  
- [x] * Social links  
- [x] * About section

## **2\. Animal Data**

- [x] Create a JSON file with at least 6 animals including id, name, type, breed, price, weight, age, location, description, image, category.

[

{

"id": 1,

"name": "Deshi Shahi Cow",

"type": "Cow",

"breed": "Local Deshi",

"price": 120000,

"weight": 280,

"age": 3,

"location": "Bogura",

"description": "Healthy deshi cow suitable for Qurbani. Well fed with natural খাবার.",

"image": "https://i.postimg.cc/example-cow1.jpg",

"category": "Large Animal"

}

\]

## 

## **3\. Home Page**

- [x] * Hero section with banner and browse button  
- [x] * Featured animals (4 items)  
- [ ] * Extra sections: Qurbani Tips and Top Breeds

## **4\. All Animals Page**

* [x] Sort by price  
* Animal cards with details button

## **5\. Animal Details Page**

* Full details view 
* Booking form (name, email, phone, address) 
* Login required
* Show success toast message

Note: The booking form will be reset on submit and show a success message. (Data will not save in DB or Local Storage)

## **Authentication**

## **User Login**  ✅

The user will  show  a Login page with a form , so that the user can Log in this application. 

- [x] Show a Title for Login.  & Form with following fields   
  ( Email , Password , Login button ) 

If the user Login successfully then 

- [x] navigate him to his Home page.  
- [x] If not, show him an error with toast / error message anywhere in the form.

There will be some other options like 

- [x] Show the user a Link for Register  so that he can go to the register page.   
- [x] Show users a Social Login Button ( Google only ) . on Clicking it   
  - [x] user authenticate with Google  
  - [x] Navigate him to his Home page.

   
**User Registration**  
Create a register page with a form , so that the user can register himself in this application. 

- [x] Show a Title for registration and a Form with following fields

( Name , Email, Photo-url(link), Password & Register Button ) 

If the user Register successfully then 

- [x] navigate him to his login page.  
- [x] If not, show him an error with toast / error message anywhere in the form.

There will be some other options like 

- [x] Show the user a Link for Login so that he can go to the Login page.   
- [x] Show users a Social Login Button ( Google only ) . on Clicking it   
  - [x] user authenticate with Google  
  - [x] Navigate the user to the Home page.

 💡Don’t implement email verification or forget password method as it will inconvenience the examiner. If you want, you can add these after receiving the assignment result.

## 

## **Additional Requirements**

* Add one extra section  
* Toast notifications  
* loading on fetch data   
* not-found page
  
## 

## **Challenges** 

Add your challenge requirements  here.    
with your requirements .  add below 3 requirement 

##### **1\. My Profile** 

My profile page shows logged-in profile data name, photo, email 

**2\.** **Update Information Feature**

- In my-profile route there will be an update button on Clicking it.  Take user to another route   
  - Show user a form with 2 input field ( image and Name )   
  - An Update Information button.

Follow this documentation: [**https://better-auth.com/docs/concepts/users-accounts\#update-user**](https://better-auth.com/docs/concepts/users-accounts#update-user) 

 

##### **3\.** Add requirement implementing  of any one npm package from the following

-   
- [Animate.css](https://animate.style/),   
- [React-Spring](https://www.react-spring.dev/docs/components/parallax)  
- [Lottie](https://www.npmjs.com/package/@lottiefiles/dotlottie-web?activeTab=readme)

## **Routes**

**Public:** / , /animals, /login, /register

**Private:** /details-page /my-profile

## **Submission**

* GitHub link  
* Live site link

