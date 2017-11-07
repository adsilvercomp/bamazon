DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
item_id INTEGER(30) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(30),
department_name VARCHAR(30),
price DECIMAL(6,2),
stock_quantity INTEGER(30),
PRIMARY KEY(item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES(1, "Audio Technica Turn Table", "Electronics", 99.00, 10 );

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES(2, "Sony Handycam camcorder", "Electronics", 849.99, 25 );

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES(3, "Rawlings Baseball Mitt", "Sports & Outdoors", 344.91, 14 );

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES(4, "Babolat tennis racket", "Sports & Outdoors", 199.00, 30);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES(5, "Fender Stratocaster", "Musical Instruments", 599.99, 20);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES(6, "Gibson Les Paul", "Musical Instruments", 3969.00, 15 );

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES(7, "Fender Stratocaster", "Musical Instruments", 344.91, 14 );

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES(8, "Abbey Road CD", "Music", 15.00, 14 );

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES(9, "Fender Telecaster", "Musical Instruments", 400.00, 100 );

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES(10, "django reinhardt CD", "Music", 20.00, 100 );

SELECT * FROM products;



