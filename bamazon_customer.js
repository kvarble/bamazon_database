var mysql = require("mysql");
var inquirer = require("inquirer")


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_DB"
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    queryAllProducts();
  });

  function queryAllProducts() {
      connection.query("SELECT * FROM products", function(err, res){
         for (var i = 0; i < res.length; i++){
             console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity)
             
         }
         shopForProduct()
      }
      
    )
  }

  function shopForProduct() {
     inquirer.prompt({
         name: "bamazonProducts",
         type: "input",
         message: "please use the most left number to choose the product you would like to buy"
     })
  }
  