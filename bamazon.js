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
                // var Item = answer.items;
                // console.log(Item);
                // var Amount = answer.amount;
                // console.log(Amount)
                inventoryUpdate();

                //subtract the orderAmount from the inventory of the selected item
                function inventoryUpdate() {
                    var chosenProduct;
                    //if the chosen item matches an item in the database and the order amount is less than the 
                    //amount the databse has in stock, update the database by subtracting the order amount from the inventory

                    //query the database for all product names
                    connection.query("SELECT * FROM products", function (err, results) {
                        if (err) throw err;
                        //loop through the product names
                        var match=false;
                        for (var i = 0; i < results.length; i++) {
                            //if the user's order matches the item name & the order amount doesnt exceed the items in stock
                            if (answer.items === results[i].product_name && answer.amount<results[i].stock_quantity) {
                                
                                match=true;
                                console.log(results[i].product_name + " " + match);
                                break;
                                //update the database*****
                           
                            

                                //if match is true query the database for 
                                //if the order amount exceeds the items in stock console.log("We only have x items in stock")

                                //if the items in stock = 0 console.log("this item is out of stock")
                            }else if(answer.amount>results[i].stock_quantity){
                                        break;
                                        console.log("I'm sorry, we don have that many in stock");
                                    }else if(results[i].stock_quantity=0){
                                        break;
                                        console.log("I'm sorry, but we are out of this item");
                                    }
                        }
                    });

                }
            });

    })
}




