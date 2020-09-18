PROJECT TITLE : Zapplabs website
First Revision on 24-04-2020

Our project include MERN Stack : Mongodb,Express,React and Node

How to run this project?

    PREREQUISITES:machine should have installed node,npm(node package manager) 

Clone Project:You can clone from gitlab using this url

    FRONTEND : "https://gitlab.com/zapplabs/angel-working"

    BACKEND : "https://gitlab.com/zapplabs/angel-backend"

To run this project ,first clone and then in 
backend code ,install node_modules using <npm install> and run <node server>
frontend code,install node_modules using <yarn install> and run <yarn start>


***************************ZAPPLABS*****************************


Major Dependencies:
    * "aws-sdk":To use the AWS Services .
    * "bcryptjs":To store password in database in secured form .
    * "cors":A mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served.
    * "crypto-js" :Provide cryptographic algorithm .Security purpose (payment.js)
    * "csvtojson" : Conert CSV file to JSON file
    * "dotenv" :Module that loads environment variables from a .env file into process.env. 
    * "fs":To access Physical File System.
    * "jsonwebtoken":To generate json token .
    * "mongodb":Database used for zapplabs.
    * "multer": Multer is used for uploading files.
    * "nodemailer": A module for Node.js applications to allow easy email sending.
    * "razorpay" : Accept payment using payment gateway.
    * "antd" : React UI Library.
    * "axios" :Promise based HTTP client for the browser and node.js
    * "bootstrap" : Fron-end framework for easier web development.
    * "firebase" : Authentication via google and facebook.
    * "history" : The library lets you easily manage session history anywhere JavaScript runs. 
    * "moment" : A library for parsing, validating, manipulating, and formatting dates.
    * "node-sass" : Allows to natively compile .scss files to css at incredible speed and automatically via a connect middleware. 
    * "redux-thunk" : Redux Thunk middleware allows to write action creators that return a function instead of an action
    * "redux" : State management Library


NOTE:
    *Frontend:To know about component ,which route include which component ,all information can easily fetch from filename "index.js".
    *Backend:To know about component,which route include which component,all information can easily fetch from filename "server.js".
    *As we have used redux ,global states are stored in store ,while accessing any data you need not to call data at specific component ,all data already saved in props.
    *Without login you cannot pay.



*****Components of Zapplab*****

Portal is categorised into 2 parts:

admin login:
        Credentials:
    url:
    email:
    password:
user login:
        Credentials:
    url(https://zapplabs.in/user/login)


*******Common Components******

Navbar : Component can be extract from index.js file i.e (DemoNavbar)
Footer : Component can be extract from index.js file i.e (Footer)
Verify Email :Component can be extract from index.js file i.e (ConfirmEmail)
Reset Password : Component can be extract from index.js file i.e (ResetPasswordForm)
Reset Token : Component can be extract from index.js file i.e (ResetPTokenVarify)
Change Password : Component can be extract from index.js file i.e (ChangePasswordForm)


************As a user login******

**Signup Page**
Frontend : component can be extract from index.js file i.e (UserRegister)
Backend : 
        Route="./routes/api/users"
        Model=User.js
        Mongodb table=users
    For google and facebook login firebase services are used


**Login Page**
Frontend : component can be extract from index.js file i.e (UserLogin)
Backend : 
        Route = "/routes/api/users"
                "/routes/api/auth" for authentication
        Model=User.js
        Mongodb table=users

***Landing Page***
1. My services(https://zapplabs.in/my-services)
As a user you can upload your service like if you want to earn,you can upload image add title and skills,then enter the price then your service will be visible to all users so that they can buy.
Frontend:component can be extract from index.js file i.e (AddService)
Backend : 
        Route="./routes/api/service"
        Model=Service.js
        Mongodb table=services


2. Profile(https://zapplabs.in/user/profile/id)
As a user you can upload your profile,first you need to enter the basic details
Frontend:component can be extract from index.js file i.e (Profile)
Backend : 
        Route="./routes/api/profile"
        Model=Profile.js
        Mongodb table=profiles

After enter basic details Many components will be shown like
{About,Experience,Project,DesignerProjects,Education,Skills,Certificate}
every component present in different js file which can be easily fetch from profile.js
You never need to extract data at a single component all data according to profile id will be saved in props once you upload and then it can be easily accessible to every component.


3. Designer Projects(https://zapplabs.in/designer-projects)
As a user you can search any designer project based on filter 
Frontend:component can be extract from index.js file i.e (AllDesignrProjects)
Backend : 
        Route="/routes/api/designer-project"
        Model=DesignerProject.js
        Mongodb table=designerprojects


4. Development  Projects(https://zapplabs.in/projects)
As a user you can search any project based on filter 
Frontend:component can be extract from index.js file i.e (AllProjects)
Backend : 
        Route="/routes/api/project"
        Model=Project.js
        Mongodb table=projects


5. Services(https://zapplabs.in/services)
As a user you can search any Service based on filter 
Frontend:component can be extract from index.js file i.e (Services),
            can share services from (Service)
Backend : 
        Route="./routes/api/service"
        Model=Service.js
        Mongodb table=services
 

6. Transactions(https://zapplabs.in/transactions)
As a user you can View all transactions 
Frontend:component can be extract from index.js file i.e (Transactions)
Backend : 
        Route="/routes/api/transaction"
                "/routes/api/payment"

        Model=Transaction.js
        Mongodb table=transactions
 


7. Find Developers(https://zapplabs.in/dev-profiles)
As a user you can View all developers along with their skills, also you can search developer based on skill 
Frontend:component can be extract from index.js file i.e (DevelopersProfile,CallBackForm)

Backend : 
        Route="./routes/api/profile"
        Model=Profile.js
        Mongodb table=profiles


8. Contact(https://zapplabs.in)
As a user, can contact to us by filling form
Backend : 
        Route="./routes/api/contact""
        Model=BusinessContact.js
        Mongodb table=contacts


9. chat(https://zapplabs.in/chats)
As a user you can chat 
Frontend:component can be extract from index.js file i.e (ChatRoom,Chats)
Backend : 
        Route="./routes/api/chatroom"
        Model=chatroom.js
        Mongodb table=chatrooms


**NAVBAR**
Frontend code include folder name "Navbars" ,where code of navbar is included

 **Footer**
Frontend code include folder name "Footer" ,where code of footer is included






************As a Admin login******

**Login Page**

        Credentials:
    url:
    email:
    password:
    
Frontend : component can be extract from index.js file i.e (UserLogin)
Backend : 
        Route = "./routes/api/users"
                "./routes/api/auth"(for authentication)
        Model=User.js
        Mongodb table=users

***Landing Page***


1. users(https://zapplabs.in/admin/allusers)
As a admin you can add new user,business user and admin user
Frontend:component can be extract from index.js file i.e (UploadUsers)
Backend : 
        Route="./routes/api/users"
        Model=User.js
        Mongodb table=users


2. Designer Projects(https://zapplabs.in/admin/all-designer-projects)
As a Admin you can add any designer project also you can search designer projects
Frontend:component can be extract from index.js file i.e (UploadDesignrProjects)
Backend : 
        Route="/routes/api/designer-project"
        Model=DesignerProject.js
        Mongodb table=designerprojects


4. Development  Projects(https://zapplabs.in/admin/allprojects)
As a Admin you can add any development project also you can search development projects
Frontend:component can be extract from index.js file i.e (UploadProjects)
Backend : 
        Route="/routes/api/project"
        Model=Project.js
        Mongodb table=projects


5. Services(https://zapplabs.in/admin/allservices)
As a Admin you can add any services also you can search services 
Frontend:component can be extract from index.js file i.e (UploadServicesinBulk),
Backend : 
        Route="./routes/api/service"
        Model=Service.js
        Mongodb table=services
 

6. orders(https://zapplabs.in/admin/transactions)
As a admin you can View all transactions 
Frontend:component can be extract from index.js file i.e (Transactions)
Backend : 
        Route = "/routes/api/transaction"
                "/routes/api/payment"
        Model=Transaction.js
        Mongodb table=transactions
 

6. Find Developers(https://zapplabs.in/dev-profiles)
As a admin or user you can View all developers along with their skills, also you can search developer based on skill 
Frontend:component can be extract from index.js file i.e (DevelopersProfile,CallBackForm)
Backend : 
        Route="./routes/api/profile"
        Model=Profile.js
        Mongodb table=profiles

7. Contact(https://zapplabs.in)
As a admin or user, can contact to us by filling form(same as user component)
Backend : 
        Route="./routes/api/contact""
        Model=BusinessContact.js
        Mongodb table=contacts
        

**NAVBAR**
Frontend code include folder name "Navbars" ,where code of navbar is included

 **Footer**
Frontend code include folder name "Footer" ,where code of footer is included

