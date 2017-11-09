var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    //Your username
    user: "Aaron",

    //Your password
    password: "password",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);

    start();

});


function start() {
    // query the database for all items on the products table.
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log(results);
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
            .prompt([
                {
                    name: "items",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            //information from two database columns will be pushed into the choiceArr
                            //this might make referencing the database difficult.
                            choiceArray.push(results[i].product_name);
                            // " - Price: " + results[i].price

                        }
                        return choiceArray;
                    },
                    message: "Select an item"
                },
                {
                    name: "amount",
                    type: "input",
                    message: "How many would you like to buy?"
                }
            ])
            .then(function (answer) {
                var item = answer.items;
                console.log(item);
                var amount = answer.amount;
                console.log(amount)
                inventoryCheck();

                //subtract the orderAmount from the inventory of the selected item
                function inventoryCheck() {
                    var chosenProduct;
                    //if the chosen item matches an item in the database and the order amount is less than the 
                    //amount the databse has in stock, update the database by subtracting the order amount from the inventory

                    //query all columns from the product table where the product_name = the item the customer selected.
                    connection.query(`SELECT * FROM products WHERE product_name = "${item}"`, function (err, results) {
                        if (err) throw err;
                        console.log("hello ", results);
                    

                        // var selectedProduct = item

                        // var subtract = results[i].stock_quantity - amount

                       
                            //if the user's order amount doesnt exceed the items in stock update the inventory.
                            if (amount < results[0].stock_quantity) {

                                var newAmount = results[0].stock_quantity - amount;
                                
                               
                                updateProduct(newAmount);
                               

                            } else if (item === results[0].product_name && amount > results[0].stock_quantity) {
                                console.log("Insufficient quantity.");
                               
                                //if the items in stock = 0 console.log("this item is out of stock")
                            } else if (item === results[0].product_name && results[0].stock_quantity === 0) {
                                console.log("I'm sorry, this item is out of stock.");
                               
                            }
                        

                    });

                        
                }

                    function updateProduct(newAmount){
                        console.log("updating inventory for " + item);
                        connection.query("UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newAmount
                            },
                            {
                                product_name: item
                            }

                        ],
                        function(err, res){
                         console.log(res.affectedRows + "product updated")
                         console.log(res);  
                         start();
                        }

                    )}

            });

            

    })
}