DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
 item_id INTEGER NOT NULL AUTO_INCREMENT,
 product_name VARCHAR (45),
 department_name VARCHAR (255),
 price DECIMAL(10,2),
 stock_quantity INTEGER (11) NULL,
 
 PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Toaster", "Houseware", 39.99, 50),
("Leaf blower", "Home & Garden", 49.99, 65),
("Area rug", "Home Decor", 83.80, 99),
("Baby monitor", "Baby Products", 124.99, 50), 
("Headphones", "Electronics", 349.99, 200),
("Watch", "Fashion", 84.98, 75), 
("Dog bed", "Pet", 39.99, 150),
("Hair dryer", "Health & Beauty", 29.99, 100),
("Car mat", "Automotive", 29.32, 80),
("Suitcase", "Travel", 59.99, 250); 

SELECT * FROM products;