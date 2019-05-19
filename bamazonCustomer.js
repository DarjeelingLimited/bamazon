//Dependencies here
// npm install inquirer
var inquirer = require("inquirer");
// mysql
var mysql = require("mysql");

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
                name: "action",
                type: "input",
                //* The first should ask them the ID of the product they would like to buy.
                message: "Please input the product ID.",
            },
            //The second message should ask how many units of the product they would like to buy.
            {
                name: "action",
                type: "input",
                message: "How many units would you like to buy?"
            }
        ]).then(answers => {
            //Use user feedback to do case statements
            var userID = answers.ID;
            console.log("You entered " + userID)
            var userQuantity = answers.Quantity;
            console.log("You're looking for " + userQuantity + userID);

            //check to see if there is enough product to meet the customer request
            connection.query("SELECT * from products WHERE item_id= " + ID, function (err, res) {
                if (err) throw err;
                console.log(res);

                // if there is enough quantity, fulfill the order
                var inStock = res[0].stock_quantity;
                console.log("Good news! Your item is in stock: " + inStock + "remain");
                var remainingStock = inStock - answerQuantity;
                console.log("Remaining items in stock: " + remainingStock);
                var cost = res[0].price;

                // once the udpate goes thru --> show the customer the total cost of their purchase
                // i.e. # products - # purchased - remainder
                if (inStock >= answers.Quantity) {
                    console.log("Remaining items: " + remainingStock);
                    console.log("Your total today is " + (answerQuantity * price));
                    // update the SQL database to reflect remaining quantity
                    connection.query("UPDATE products SET stock_quantity -" + answers.Quantity + "WHERE ID = " 
                    + answers.ID);
                }
                else{
                                // if no -> the app should log something like "Insufficient quantity" & prevent the order from going thru
                    console.log("Insufficient quantity. Come back next time!");
                }
                connection.end();
            });

        });
}// end of runSearch

