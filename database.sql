-- DROP SCHEMA IF EXISTS sales;
CREATE SCHEMA sales;
USE sales;

CREATE TABLE product (
    id int auto_increment primary key,
    name varchar(150),
    created_at timestamp default current_timestamp,
    updated_at timestamp null default null on update current_timestamp
) engine = innoDB;

CREATE TABLE sale (
    id int auto_increment primary key,
    product_id int,
    number_products int,
    quantity_sold decimal(16,2),
    created_at timestamp default current_timestamp,
    constraint fk_sale_product foreign key (product_id) references `product` (id)
) engine = innoDB;

INSERT INTO
    product (name)
VALUES
    ('Playeras'),
    ('Camisas'),
    ('Pantalones'),
    ('Shorts'),
    ('Blusas'),
    ('Abrigos'),
    ('Chalecos'),
    ('Sueteres'),
    ('Faldas'),
    ('Sudaderas');