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
    queryAllProducts();
  });

  function queryAllProducts() {
      connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        console.log("RESULTS" + res)
        inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
         for (var i = 0; i < res.length; i++){
             choiceArray.push(res[i].product_name + res[i].stock_quantity);
            }
            return choiceArray;
          },
      
      
      message: "What product would you like?"
    },
    {
      name: "sell",
      type: "input",
      message: "How many would you like?",
    //   validate: function(value) {
    //     if (isNaN(value) === false) {
    //         return true;
    //     }
    //     return false;
    // }
    }
  ])

//   function shopForProduct() {
//      inquirer.prompt([
//          {
//          name: "bamazonProducts",
//          type: "input",
//          message: "please use the most left number to choose the product you would like to buy"
//          },
//          {
//          name: "bamazonQuantities",
//          type: "input",
//          message: "how many would you like?", 
         
    //      }
    //  ])
     .then(function(answer){
         console.log("ANSWER" + answer)
         var selectedProduct;
         for (var i=0; i<res.length; i++){
             if (res[i].id === answer.choice) {
                 selectedProduct = res[i];
             }
         }
        if (choice.stock_quantity > parseInt(answer.sell)) {
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: stock_quantity-answer.sell
                    },
                    {
                        id: selectedProduct.id
                    } 
                ]
            )
        }
     });
  });
      }
  