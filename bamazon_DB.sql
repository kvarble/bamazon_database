DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(200) NOT NULL,
  department_name VARCHAR(200) NOT NULL,
  price decimal (10,4),
  stock_quantity INTEGER (10),
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tent", "camping", 100, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("sleeping bag", "camping", 150, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("hammock", "outdoor leisure", 120, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("mountain bike", "sporting goods", 800, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("road bike", "sporting goods", 1800, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("helmet", "sporting goods", 65, 18);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pannier", "sporting goods", 80, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("skis", "sporting goods", 600, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("t-shirt", "clothing", 8, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("sandals", "shoes", 45, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("sunglasses", "accessories", 130, 12);

SELECT * FROM products;