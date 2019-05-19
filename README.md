# Bamazon

### Overview

Bamazon is an app that takes in orders from customers and depletes stock from the store's inventory. 

## Repository

https://github.com/DarjeelingLimited/bamazon

## Technology Used

* NPM
* MySQL
* Node.js

## NPM Packages

   * [MySQL](https://www.npmjs.com/package/mysql)

   * [Inquirer](https://www.npmjs.com/package/inquirer)

   
## Getting started

1. Clone a copy of the repository to your local machine. 
2. Run 'npm install' in Terminal (Mac) or GitBash (Windows)
3. Run the command
```node bamazonCustomer```

** Example videos in the "Screenshots" folder of this repository. The links are also below.
** Create the database in MySQL: https://www.screencast.com/t/qgrz2SdSD
** Running node:  https://www.screencast.com/t/7GpG0S4Okb2

## Command + prompts

1. `npm install`
    * Need to use `npm install mysql` and `npm install inquirer`

2. `node bamazonCustomer` (Scenario: not enough items in stock)
    * Prompts the user for the Product ID of the product they are looking to order
     * Enter the product_id number
    * Prompts the user for the number of units they would like to order
     * Enter the number of units
     * If the number of units is greater than the stock_quantity, the order will not go through
    
3. `node bamazonCustomer` (Scenario: sufficient number of items in stock)
    * Prompts the user for the Product ID of the product they are looking to order
     * Enter the product_id number
    * Prompts the user for the number of units they would like to order
     * Enter the number of units
     * If the number of units is less than or equal to the stock_quantity, the order will go through! 
     * The order cost will be calculated and the stock_quantity will be updated in the "Products" table
     
## "Products" database

* Upon running the command, if the user input is less than or equal to the "product_quantity", the "product_quantity" reflects the new amount of inventory left in stock. 

