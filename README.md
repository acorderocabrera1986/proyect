# Project for the control of gateways and their peripherals
This sample project is managing gateways - master devices that control multiple peripheral
devices.
Your task is to create a REST service (JSON/HTTP) for storing information about these
gateways and their associated devices. This information must be stored in the database.
When storing a gateway, any field marked as “to be validated” must be validated and an
error returned if it is invalid. Also, no more that 10 peripheral devices are allowed for a gateway.
The service must also offer an operation for displaying information about all stored gateways (and their devices) and an operation for displaying details for a single gateway. Finally, it must be possible to add and remove a device from a gateway.

## Project setup

### Node Server
```
- you must have previously installed mongodb

- you must have previously installed postman

npm install

cd proyecto inicial/proyect

node app.js
```