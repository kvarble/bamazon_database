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
    // console.log("connected as id " + connection.threadId);
    runSearch();
  });
  function runSearch() {
    inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ]
    })
    .then(function(answer) {
        switch (answer.action) {
        case "View Products for Sale":
          queryAllProducts();
          break;
  
        case "View Low Inventory":
          queryLowInventory();
          break;
  
        case "Add to Inventory":
          addToInventory();
          break;
  
        case "Add New Product":
          addNewProduct();
          break;
        }
      });
  }
  
function queryAllProducts(){
    connection.query("SELECT * FROM products", function(err, res){
        console.log("Product ID  |  Name  |  Department  |  Price  |  Quantity")
      if (err) throw err;
       for (var i = 0; i < res.length; i++){
           console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity)
           
       }
       runSearch();
    })
}

function queryLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function(err, res){
        console.log("Product ID  |  Name  |  Department  |  Price  |  Quantity")
      if (err) throw err;
       for (var i = 0; i < res.length; i++){
           console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity)
       }
       runSearch();
    })
    
}
function addToInventory(){
    inquirer
    .prompt([
        {
      name: "add",
      type: "input",
      message: "What product would you like to add to? (please choose by id number)",
      validate: function(value) {
        if (isNaN(value) === false) {
            return true;
        }
        return false;
    }
    },
      {
        name: "increase",
        type: "input",
        message: "How many are you adding?",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }
])
    .then(function(answer) {
        var selectedProduct = answer.add;
        var newQuantity = answer.increase;
        connection.query(
            "SELECT * FROM products WHERE ?",
                {
                    id: answer.add
                }, function(err, res) {                
        var newStockQuantity = parseInt(res[0].stock_quantity) + parseInt(newQuantity);

        connection.query(
            "UPDATE products SET ? WHERE ?",
            [{
                stock_quantity: newStockQuantity
            },
            {
               id: selectedProduct
            }],
            function(err, res)
            
    {
        console.log("Stock quantity updated! There are now: " + newStockQuantity)
        runSearch()
    }
        )
    })
})
    }

function addNewProduct(){
inquirer
    .prompt([
      {
        name: "product",
        type: "input",
        message: "What is the product you would like to add?"
      },
      {
        name: "department",
        type: "input",
        message: "What department would you like to place your product in?"
      },
      {
        name: "price",
        type: "input",
        message: "How much does the product cost?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "quantity",
        type: "input",
        message: "How many of this product do you have to add?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
        connection.query(
          "INSERT INTO products SET ?",
          {
            product_name: answer.product,
            department_name: answer.department,
            price: answer.price,
            stock_quantity: answer.quantity
          },
          function(err) {
            if (err) throw err;
            console.log("Your product was added successfully!");
            runSearch();
          }
        );
      });
  }
  
  
