# fullstack-demo01-node-server

```
create database `lunch-orders`;
use `lunch-orders`;
create table orders(
	`id` int(12) auto_increment primary key,
    `first_name` VARCHAR(25) not null,
    `last_name` VARCHAR(25) not null,
    `food_order` TEXT not null,
    `paid` BOOL
);

```

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=i-love-tdd
DB_NAME=lunch-orders
```