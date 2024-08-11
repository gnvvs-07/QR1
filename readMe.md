Ecards is a completely responsive full stack profile Sharing application to connect along side with social media accounts 

You can visite the website here:

[Ecards](https://ecards.onrender.com/)

Tech Stack Used: MERN

client side:

* react Js
* redux

Server side:

* MongoDB for database
* Node js
* Express Js

This application uses a secure user authentication using jwt and uses redux for state management 

FUNCTIONALITIES:

* GoogleOAuth
* user QR privacy


Running the application:

In your root directory: 

```
npm i
npm run dev
```

client side :

```
cd client
npm i
npm run dev
```

Environmental variables:

root directory:

add .env file and its contents

```
MONGO = your database connection string
JWT_SECRET = your jwt secret
```


client directory:

add .env to client directory with its contents:

```
VITE_FIREBASE = your firebase api key
```
