var mysql = require("mysql");
var inquirer = require("inquirer");
// require("console.table");
var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,
  user: "root",
  password: "Testing1",
  database: "bamazon"
});

connection.connect(err => {
  if (err) {
    console.error("No connection");
  }
  gimmeeItem();
});

function gimmeeItem() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    console.table(res);

    custInq(res);
  });
}

function custInq(stuff) {
  inquirer
    .prompt([
      {
        name: "id",
        type: "enter",
        message: "What would you like to buy?",
        validate: function(val) {
          return !isNaN(val);

        }
      },
      {
        name: "quantity",
        type: "enter",
        message: "How many would you like to buy?",
        validate: function(val) {
          return !isNaN(val);

        }
      }
    ])
    .then(function(answer) {
      console.log(answer.id + "line43")
      findItem(answer.id, answer.quantity);

      // if (product) {
      //   howMuch(stuff);
      // }
      // else {
      //   console.log("We're sorry, that product is no longer in stock.");
      //   showItem();
      // }
  
    });
}
//make a purchase
function findItem(id, quantity) {
connection.query("SELECT * from products WHERE item_id =" + id,  function(err, res) {
  if (err) throw err;

  console.log(res);
  console.log(quantity)
  if (res[0].stock_quantity >= quantity) {
    console.log("we have enough");
    console.log("you owe")
  } 
  else {
    console.log("Not enough items");
    console.log("Please select another quantity")
  }
})
};

//subtract quantity forom stock quantity
//money owed