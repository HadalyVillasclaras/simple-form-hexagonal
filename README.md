# Simple sign in / sign up form
I've crafted a very simple web application on an Apache server wich follow a mirror folder structure applying hexagonal architecure and DDD principles in both front-end and back-end.

Front services are fetching data via input stream providers in back controller files with php://input (no routing). The back-end is made with pure PHP(no Composer install), since I didn't want to use libraries that would make its use more complex. That's why it doesn't have routing or other functionalities like auth providers, etc.

Front-end source code is independent of the user interface. main.ts is working as an ui adapter wich connects browser events with app services. 

The purpose of this project was to create a reusable application structure following good practices of software architecture, code and accessibility. And that would let me work on design and UX without worrying about business logic.


## Back-end Architecture
```
back/
  |--config/
      |-- dbConfig.php
      |-- db.sql
  |--controller/
      |-- SignInController.php
      |-- SignUpController.php
  |--src/
      |-- User/
          |-- Domain/
              |--User.php
              |--UserRepositoryInterface.php
              |--ValueObjects/
                  |--Email.php
                  |--Password.php
          |-- Application/
              |--SignInService.php
              |--SignUpService.php
          |-- Infrastructure/
              |--Connection.php
              |--UserRepository.php
```

## Front-end Architecture
```
front/
  |--src/
      |-- AppAdapters.ts
      |-- User/
          |-- Domain/
              |--User.ts
              |--UserRepositoryInterface.ts
              |--ValueObjects/
                  |--Email.ts
                  |--Password.ts
          |-- Application/
              |--SignInService.ts
              |--SignUpService.ts
          |-- Infrastructure/
              |--UserRepository.ts
  |--ui/
    |-- main.ts
    |-- components/
    |-- styles/
```

