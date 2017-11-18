var prompt = require('prompt');
var inquirer = require('inquirer');
var mysql = require('mysql');
var colors = require('colors');

var connection = mysql.createConnection({
     host: 'localhost',
     port: 3306,
     user: 'root',
     password: '',
     database: "bamazon_DB"
});

connection.connect(function(err) {
     if (err) throw err;
     //console.log("connected as id " + connection.threadId);
});

function showInventory() {
     connection.query('SELECT * FROM products', function(err, inventory) {
     	if (err) throw err;
               console.log("Bamazon's Inventory");
               for(var i = 0; i < inventory.length; i++) {
          	console.log("Item ID: " + inventory[i].id + " | Product: " + inventory[i].ProductName 
                    + " | Department: " + inventory[i].DepartmentName + " | Price: " +  inventory[i].Price 
                    + " | Quantity: " + inventory[i].StockQuantity);
          }

          inquirer.prompt([

          	// Here we create a basic text prompt.
          	{
          		type: "input",
          		message: "What is the id of the item you would like to buy?",
          		name: "id"
          	},

               {
          		type: "input",
          		message: "How many would you like to buy?",
          		name: "quantity"
          	}

         // Taking the order
          ]).then(function (order) {
          	
                    var quantity = order.quantity;
                    var itemId = order.id;
                    connection.query('SELECT * FROM products WHERE id=' + itemId, function(err, selectedItem) {
                    	if (err) throw err;
                         if (selectedItem[0].StockQuantity - quantity >= 0) {
                              console.log("Bamazon's Inventory has enough of that item (".green 
                                   + selectedItem[0].ProductName.green + ")!".green);
                              console.log("Quantity in Stock: ".green + selectedItem[0].StockQuantity 
                                   + " Order Quantity: ".green + quantity);
                              console.log("You will be charged ".green + (order.quantity * selectedItem[0].Price) 
                                   +  " dollars.  Thank you for shopping at Bamazon.".green);
                              connection.query('UPDATE products SET StockQuantity=? WHERE id=?', [selectedItem[0].StockQuantity - quantity, itemId],
                              function(err, inventory) {
                              	if (err) throw err;
                                   // Runs the prompt again, so the user can keep shopping.
                                   showInventory();
                              });  // Ends the code to remove item from inventory.

                         }

                         else {
                              console.log("Insufficient quantity.  Please order less of that item, as Bamazon only has ".red 
                                   + selectedItem[0].StockQuantity + " " + selectedItem[0].ProductName.red + " in stock at this moment.".red);
                              showInventory();
                         }
                    });
          });
     });
}

showInventory();