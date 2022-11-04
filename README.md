![](./public/images/logo.png) 
# Lendsqr_DemoCredit
## Demo Credit 
is a mobile lending app that requires wallet functionality. This is needed as borrowers need a wallet to receive the loans they have been granted and also send the money for repayments.

## How To Install And Run The App

clone the repo and run the following commands
* install all dependencies
    ```bash
        yarn 
    ```
* compile all typescript in src folder to javascript into dist folder
    ```bash
    yarn compile
    ```
* start the server in the development mode
    ```bash
    yarn dev
  ```
* run test
    ```bash
    yarn test
  ```
## Folder structure
```
Lendsqr_Democredit
│
├── bin
│   └── www
├── dist
├── public
├── src
│   ├── app.ts
│   ├── controller
│   │   ├── accountController.ts
│   │   ├── depositController.ts
│   │   ├── transferController.ts
│   │   ├── userController.ts
│   │   └── schema.ts
│   ├── database
│   │   ├── migrations
│   │   │    └──lendsqrTable.ts
│   │   ├── db.ts
│   │   └── knexfile.ts
│   │   
│   ├── middleware
│   │   └── auth.ts
│   │
│   ├── routes
│   │   ├── users.ts
│   │   ├── account.ts
│   │   ├── deposit.ts
│   │   ├── transfer.ts
│   │   └── withdrawal.ts
│   │
│   └── utils
│       ├── banks.ts
│       ├── flutter.ts
│       └── utils.ts
│
├── .env
├── .gitignore
├── tsconfig.json
├── package.json
├── jest.config.js
└── yarn.lock
```
## Routes
1. Users
```
create user : POST localhost:7000/democredit/users
login a user: POST localhost:7000/democredit/users/login
get all user: GET localhost:7000/democredit/users
get single user: GET localhost:7000/democredit/users/:id
Update a user : PATCH localhost:7000/democredit/users/:id
delete a user : DELETE localhost:7000/democredit/users/:id

```
2. Account
```
create account : POST localhost:7000/democredit/accounts/:user_Id
get all account : GET localhost:7000/democredit/accounts
get single account: GET localhost:7000/democredit/accounts/user_Id
delete account: DELETE localhost:7000/democredit/accounts/account_Id
```

3. Deposit
```
create account : PATCH localhost:7000/democredit/deposits/:user_Id
get all deposit : GET localhost:7000/democredit/deposits
get single deposit: GET localhost:7000/democredit/accounts/:user_Id
delete deposit: DELETE localhost:7000/democredit/accounts/:deposit_Id
```
4. Transfer
```
transfer from wallet : POST localhost:7000/democredit/transfers/:user_Id
get all transfer : GET localhost:7000/democredit/transfers

delete deposit: DELETE localhost:7000/democredit/transfers/:transfer_Id
```
5. withdrawal
```
transfer from wallet : POST localhost:7000/democredit/withdrawals/:user_Id
get all withdrawal : GET localhost:7000/democredit/withdrawals
delete deposit: DELETE localhost:7000/democredit/transfers/:transfer_Id
```

## API Examples
* Register a User
    * Method and Headers
    ```
    POST /democredit/users
    Host: localhost:7000
    Content-Type: application/json
    ```
    * Request Body

    ```json
    {
        "username" : "Janishar Ali",
        "fullname" : "Gideon Doe",
        "phonenumber" : "08087302415",
        "email": "ali@afteracademy.com",
        "password" : "1234",
        "confirm_password" : "1234"
    }
    ```
    * Response Body: 200

    ```json
    {
        "msg": "User created successfully",
        "user": {
            "id": "a695c822-4268-4489-ae2b-484b0a37c46e",
            "username": "Gardon",
            "fullname": "Gideon Doe",
            "password": "$2a$08$8G06D8PCgjkr5hyGYgEa6ehRA3uOtpcPoVZfBQgYWl9ihnRtUZjtG",
            "phonenumber": "08087302415",
            "email": "gideon@gmail.com",
            "wallet": 0
        }
    }
    ```
* Login User
    * Method and Headers
    ```
    POST /democredit/users/login
    Host: localhost:7000
    Content-Type: application/json
    ```
    * Request Body

    ```json
    {
        
        "email": "ali@afteracademy.com",
        "password" : "1234",
        
    }
    ```
    * Response Body: 200

    ```json
   {
    "msg": "You have successfully logged in",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMzNmIwYTJjLTA1OWMtNDEwNy1hYTczLWYyZjVlNjM4MDE4YyIsImlhdCI6MTY2NzUwNDU3MCwiZXhwIjoxNjY4MTA5MzcwfQ.rdMzwXKcdU5MiCqcYMMCQ-4a9ZHfA3oWk4_oc92ST80",
    "user": {
        "id": "336b0a2c-059c-4107-aa73-f2f5e638018c",
        "username": "frank",
        "email": "frank@gmail.com",
        "fullname": "frankline",
        "password": "$2a$08$IyA49NKZRwHSEW9e01r2IeQTA3.D.V.2dEFtItQYM/avDOE4jGV/O",
        "phonenumber": "08167331223",
        "wallet": 5300,
        "created_at": "2022-10-30T14:14:59.000Z",
        "updated_at": "2022-10-30T14:14:59.000Z"
    }
    }

* Creat an Account
    * Method and Headers
    ```
    POST /democredit/users/login
    Host: localhost:7000
    Content-Type: application/json
    ```
    * Request Body
    ```json
    {
        "bankName" : "fidelity bank",
        "accountName":"kingsley",
        "accountNumber":"1233134537"
    }
    ```
    * Respond Body : 201
    ```json
    {
    "msg": "Acount created successfully",
    "info": {
        "id": "6cd1a092-f55f-47e4-aa88-b38e85fb10e7",
        "bankName": "fidelity bank",
        "accountName": "kingsley",
        "accountNumber": "1233134537",
        "bankCode": "044",
        "userId": "f1c5bcda-68a1-45ca-8972-998be74f0c59",
        "status": "inactive"
    }
   }
    ```
>Note: The application is not authenticated to enable easy testing of the app. the authorization and authentication middleware was implemented but was not included in the route this means a user have permission to every functionality of the app
