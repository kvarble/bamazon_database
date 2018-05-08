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
    runSearch();
  });


  function runSearch() {
    inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products Sales by Department",
        "Create New Department"
      ]
    })
    .then(function(answer) {
        switch (answer.action) {
        case "View Products Sales by Department":
          queryProductSales();
          break;
  
        case "Create New Department":
          createNewDepartment();
          break;
        }
      });
  }
  function queryProductSales(){
    connection.query("SELECT departments.*, products.* FROM departments, products WHERE departments.department_name = products.department_name", function(err, res){
        // console.log("Department ID  |  Department_Name  |  over_head_costs  |  Price  |  Quantity")
      if (err) throw err;
       for (var i = 0; i < res.length; i++){
        var total_profit = res[0].product_sales - res[0].over_head_costs;
           console.log(res[i].department_id + " | " + res[i].department_name + " | " + res[i].over_head_costs + " | " + res[i].product_sales + " | " + res[i].total_profit)
           
       }
       runSearch();
    })
}

function addNewDepartment(){
    inquirer
        .prompt([
          {
            name: "department",
            type: "input",
            message: "What is the deparment you would like to add?"
          },
          {
            name: "id",
            type: "input",
            message: "What would you like the department ID to be?"
          },
          {
            name: "overhead",
            type: "input",
            message: "What are the over head costs?",
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
              "INSERT INTO departments SET ?",
              {
                department_name: answer.department,
                department_id: answer.id,
                over_head_costs: answer.overhead
              },
              function(err) {
                if (err) throw err;
                console.log("Your department was added successfully!");
                runSearch();
              }
            );
          });
      }