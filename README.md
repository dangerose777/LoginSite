# Login Site
Login / Register / Todo site with "admin panel". As admin you can delete users tasks.

## Technologies:
- React / Vite
- Bootstrap
- MySQL
- Axios
- React Icons
- React Router

## Setup:
in C:\xampp\htdocs\
```
git clone https://github.com/dangerose777/LoginSite.git
```
```
cd LoginSite-main
```
```
npm install
```
After this, create loginsitedb and import 'loginsitedb.sql' in phpMyAdmin

## Host PHP XAMPP:
1) WIN+R
2) sysdm.cpl
3) advanced
4) environment variables
5) in system variables find Path
6) edit
7) add "C:\xampp\htdocs\LoginSite-main\backend" (or other path where you downloaded project)
8) add "C:\php\php.exe"
9) add "C:\php"
10) inf variables for user edit path
11) add "C:\xampp\php"
12) open powershell
```
cd C:\xampp\htdocs\LoginSite-main\backend
```
```
php -S localhost:8000
```

## Run:
```
npm run dev
```

## To do:
### UI
- [x]  Login / register site
- [x]  User site
- [ ]  Admin site
### FUNCTIONALITY
- [x]  Login / register site
- [x]  User site
- [ ]  Admin site
- [x]  Database Users
- [x]  Database Tasks
### OTHER
- [ ] Add if user exist in register
- [ ] Change UI
- [ ] Clean code
- [ ] Add communication with user (about an unhosted server and other)
