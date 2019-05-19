//Dependencies here
// npm install inquirer
var inquirer = require("inquirer");
// mysql
var mysql = require("mysql");
// var table = require("table")
// I tried to print the data to a table but wasn't successful here.

var connection = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "root",
    database: "bamazon"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId + "\n");
    displayData();
    //insert the name of the function when you start the app
})

//first display all of the items available for sale. 
//Include the ids, names, and prices of products for sale.

function displayData() {
    //Include the ids, names, and prices of products for sale.
    connection.query("SELECT item_id, product_name, price from products", function (err, res) {
        if (err) throw err;
        else console.log(res);
        runSearch();
    });
};


function runSearch() {
    inquirer
        .prompt([
            /* Put questions here*/
            {
                name: "prodid",
                type: "input",
                //* The first should ask them the ID of the product they would like to buy.
                message: "Please input the product ID.",
            },
           // The second message should ask how many units of the product they would like to buy.
            {
                name: "quant",
                type: "input",
                message: "How many units would you like to buy?"
            }
        ]).then(function(answers) {
            //Use user feedback to do case statements
            var userID = answers.prodid;
            //console.log(answers.prodid);
            console.log("You entered Product ID " + userID)
            var userQuantity = answers.quant;
            console.log("You're looking for " + userQuantity + " of Product ID " + userID);

            //check to see if there is enough product to meet the customer request
            connection.query("SELECT * from products WHERE item_id= " + userID, function (err, res) {
                if (err) throw err;
               // console.log(res);

                // if there is enough quantity, fulfill the order
                var inStock = res[0].stock_quantity;
                console.log("Your item is in stock: " + inStock + " available");
                

                // once the udpate goes thru --> show the customer the total cost of their purchase
                // i.e. # products - # purchased - remainder
                if (inStock >= userQuantity) {
                    var remainingStock = inStock - userQuantity;
                    var cost = res[0].price;
                    console.log("We have reserved " + userQuantity + " units for you.");
                    var roundedNumber = Math.round((userQuantity * cost)*100)/100;
                    console.log("Your total today is: $ " + roundedNumber);
                    // update the SQL database to reflect remaining quantity
                    console.log("Remaining inventory in stock: " + remainingStock);
                    connection.query("UPDATE products SET stock_quantity = " + remainingStock + " WHERE item_id = " 
                    + userID);
                }
                else{
                                // if no -> the app should log something like "Insufficient quantity" & prevent the order from going thru
                    console.log("Insufficient quantity. We are short " + (userQuantity - inStock) + " units. Come back next time!");
                }
                connection.end();
            });

        });
}// end of runSearch

