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
          console.log("Product ID  |  Name  |  Department  |  Price  |  Quantity")
        if (err) throw err;
         for (var i = 0; i < res.length; i++){
             console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity)
             
         }
         shopForProduct()

  

  function shopForProduct() {
     inquirer.prompt([
         {
         name: "product",
         type: "input",
         message: "please use the most left number to choose the product you would like to buy"
         },
         {
         name: "quantities",
         type: "input",
         message: "how many would you like?", 
         validate: function(value) {
             if (isNaN(value) === false) {
                 return true;
             }
             return false;
         }
         }
     ])
     .then(function(answer){
         var selectedProduct = answer.product;
         var selectedQuantity = answer.quantities;

            connection.query(
                "SELECT * FROM products WHERE ?",
                    {
                        id: answer.product
                    }, function(err, res) {
                        if (selectedQuantity > res[0].stock_quantity) {
                            console.log("Apologies! we don't have that many")
                        } else {
                        console.log("that is a great selection!")
                        var newStockQuantity = res[0].stock_quantity - selectedQuantity;
                        var totalPrice = res[0].price * selectedQuantity;
                    connection.query("UPDATE products SET ? WHERE ?",
                    [{
                        stock_quantity: newStockQuantity
                    },
                    {
                       id: selectedProduct
                    }],
                    function(err, res)
                    {
                        console.log("That will cost $" + totalPrice)
                        shopForProduct()
                    })
                    
                    }
                    })
        })
    }
    
    
      
      
}) 
}