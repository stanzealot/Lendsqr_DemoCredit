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
