DROP DATABASE IF EXISTS bamazon_DB;

create database bamazon_DB;

use bamazon_DB;

CREATE TABLE products (
  id int(11) AUTO_INCREMENT NOT NULL,
  ProductName varchar(45) NOT NULL,
  DepartmentName varchar(45) NOT NULL,
  Price decimal(5,2) NOT NULL,
  StockQuantity int(3) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (id, ProductName, DepartmentName, Price, StockQuantity)
VALUES
(1, 'Fish Oil', 'Supplements', 9.99, 50),
(2, 'Vitamin D3', 'Supplements', 12.99, 50),
(3, 'Soccer Ball', 'Sports', 14.99, 15),
(4, 'Office Chair', 'Office Supplies', 199.99, 5),
(5, 'Scissors', 'Office Supplies', 4.99, 10),
(6, 'Blueberry Muffin', 'Bakery', 3.99, 3),
(7, 'Cheesecake', 'Bakery', 11.99, 20),
(8, 'Pillow', 'Linen', 8.99, 7),
(9, 'Bed Sheets', 'Linen', 19.99, 13),
(10, 'Wireless Mouse', 'Computers', 9.99, 23);
