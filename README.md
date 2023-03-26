

<div align="center">
  <h1>Auction Api 🔥</h1>

  <img src="https://user-images.githubusercontent.com/28770143/227749718-6bf6ea6d-a0ff-46f5-b4d2-c14e20bafc9d.png" />
  <p> LIVE DEMO: https://auction-app-jaymendez.vercel.app/ </p>
  <p>an Auction Api made with Node.js, Express, Typescript and MongoDB</p>
  <p>Front-end was made with Next.js, Typescript and Tailwind</p>
  <p>Made by Jay Mendez</p>
</div>
<div align="center">

  [![Status](https://img.shields.io/badge/status-active-success.svg)]() 
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

## 📝 Table of Contents- 
- [Problem Statement](#problem_statement)
- [Idea / Solution](#idea)
- [Getting Started](#getting_started)
- [Running the Tests](#tests)
- [Built Using](#built_using)
- [Authors](#authors)

## 🧐 Problem Statement <a name = "problem_statement"></a>
The product that we are building is an online auction system
- IDEAL: We want to build a well tested online auction system that is used by users
- REALITY: We are pretty limited on the resources right, so the implementation would just be for testing purposes with the purpose of showcasing the proficiency of the developer in creating a solution for a problem.
- CONSEQUENCES: The features of the online auction system would be limited to 
  - Login and Registration
  - Deposit of virtual money
  - Adding of biddable item
  - Ability to bid on items that is created by other people.
 

## 💡 Idea / Solution <a name = "idea"></a>
Given the problem:

First, we would be building a web app, separated into 2, a front-end and a back-end. we would need to
1. Design a simple interface based on the lo-fi that we have. It should allow the users to register, log in, browser and bid for items.
  - It's important the UI is user friendly and responsive on all devices
2. We would then set up a system for user authentication and authorization. We want our users to be registered in order to bid on the items.
3. Next would be setting up the database to store all the data created in our system.


4. Once we have the basic infrastructure, we would need to implement
    - Item Listing
    - Deposit Money
    - Bidding Features (Add Bid and Completing a Bid Item)
5. On the item listing, we would have a timer to track the bidding duration, but for this project, we would have a `Force Complete Bid` button that would end the bidding process that would be used for testing the bidding functionality.

Some of the drawbacks of this auction system because it is built with an MVC-like pattern
  - We will have to implement notifications from scratch thus it doesn't have notifications for real-time update of new data, each data would be updated by another query call from the back-end caused by a user action (like Creating an item, then refetches the whole item instead of automatically feeding the data on the frontend with a message broker)
  - We would also be using MongoDB as MongoDB doesn't care about schema and since it's document-oriented it would be easier to change the model if we need to and it will also allow us to develop faster since our back-end is built with Node.js and Express while our front-end is built with Next.js (React), and since we are using Typescript, it will help with us with type safety and improved developer experience, the drawbacks with MongoDB is that the handling of data sets might be challenging because the relations are not clearly stated.
  - I also implemented a simple validation structure on the front-end and back-end, When creating a financial app, you would need a more complex validation system in place in the back-end (For example, validating if the Bid winners received the item and his money is calculated correctly based on the transaction, validating the Item owner if he received the money based from the transaction with the Bid Winners, Implementing 'micro-transactions' for transactions for security and many more). For the front-end, we could have used React Hook Form for better form handling and also yup/zod for schema validations on the client side.
 

## 🏁 Getting Started <a name = "getting_started"></a>
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites
You can install the app in 2 different ways. You can do it through docker or manual installation. Manual installation would need you to install different softwares in order to run the app, while with docker, you would just need docker and git. </br></br>

**Docker is the preferred method to run projects locally! This (should) avoid the _but it works on my machine_ problem.**

But if you're using Windows, I highly recommend that you should use manual installation as i didn't test this app with docker and WSL yet.

### Installing

#### Docker Installation

What things you need to install the software and how to install them.

```
docker desktop
git
```

##### 1. If you have downloaded git, clone the project. You can also download the zip if you don't want to install git.
```
git clone https://github.com/jaymendez/auction-api.git
```
![image](https://user-images.githubusercontent.com/28770143/227701654-273a6037-d25b-40af-b58a-804e33c75b73.png)


##### 2. You would need to install docker desktop based on your Operating system, you can use this guides on how to install them. 
##### Mac
https://docs.docker.com/desktop/install/mac-install/
##### Linux
https://docs.docker.com/desktop/install/linux-install/

##### 3. Rename the file sample.env to .env

##### 4. On the terminal, go to your project directory, and run these commands. It may take 2 - 5 minutes to get it running as it's installing the dependencies of the project.

```
sudo docker-compose build
sudo docker-compose up
```

##### 5. If you got the docker running, open http://localhost:3001 with your browser to see the result. This should be the app that you're seeing in your browser:
```
http://localhost:3001
```

![image](https://user-images.githubusercontent.com/28770143/227701984-c25cf085-267a-4f37-aa22-9612058b1fe1.png)

##### 6. You would have to do the same process on for this project as it needs a backend to run.
```
https://github.com/jaymendez/auction-app
```

---

#### Manual Installation

What things you need to install the software and how to install them.

On any operating system:
```
Text Editor
Node.js v16^
npm v8^
terminal
git
```


A step by step series of examples that tell you how to get your development env running.

##### 1. Clone or download the zip of the project
```
git clone https://github.com/jaymendez/auction-api.git
```
![image](https://user-images.githubusercontent.com/28770143/227701654-273a6037-d25b-40af-b58a-804e33c75b73.png)


##### 2. On your terminal, navigate to the directory of your project then run these commands, this will install the dependencies you need in order to run the project.
```
cd auction-api && npm install
```

##### 3. Rename the file sample.env to .env

##### 4. Run the development server
```
npm run dev
```
Open http://localhost:3001 with your browser to see the result.

##### 5. You would have to do the same process on for this project as it needs a backend to run.
```
https://github.com/jaymendez/auction-api
```
This should be the app that you're seeing in your browser:
![image](https://user-images.githubusercontent.com/28770143/227701984-c25cf085-267a-4f37-aa22-9612058b1fe1.png)


## 🔧 Running the tests <a name = "tests"></a>
The test for the frontend was made with React testing library and Jest

#### Run this command in order to run the tests.
```
npm test
```

## ⛏️ Built Using <a name = "built_using"></a>
- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [TypeScript](https://www.typescriptlang.org/) - Programming Language

## ✍️ Authors <a name = "authors"></a>
- [@jaymendez](https://github.com/jaymendez) - Idea & Coding work


