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
                            choiceArray.push(results[i].product_name + " - Price: " + results[i].price);
                    
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
                var Item=answer.items;
                console.log(Item);
                var Amount=answer.amount;
                console.log(Amount)
                
                //subtract the orderAmount from the inventory of the selected item
                function inventoryUpdate(){
                    //loop through your database

                    //if the user's order matches an item in the database, update that item

                    //if their are no items left, tell the user we are currently out of stock.
                    //if the user's order amount exceeds what is available tell the user (we only have x items left)
                    //else, complete their order

                }
            });

    })
}




