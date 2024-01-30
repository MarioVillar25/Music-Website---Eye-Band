CREATE DATABASE tour;

use tour;


CREATE TABLE band(
band_id MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
band_name VARCHAR(50) NOT NULL,
style VARCHAR(30) NOT NULL,
description VARCHAR(300) NULL,
email VARCHAR(75) UNIQUE KEY NOT NULL,
password VARCHAR(100) NOT NULL,
phone_number VARCHAR(20) NOT NULL,
photo VARCHAR(100) NULL,
band_isdeleted BOOLEAN NOT NULL DEFAULT false
);


INSERT INTO band (band_id, band_name, style, description, email, password, phone_number) values (1, "Nickelback", "Rock", "Cool rock band very popular in 90s", "nickelback@gmail.com", "1234", "455344544");
INSERT INTO band (band_name, style, description, email, password, phone_number) values ("BTS", "K-Pop", "Very popular these last years", "bts@gmail.com", "cool1234", "445686897");

select  * from band;

CREATE TABLE concert(
concert_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
band_id MEDIUMINT NOT NULL ,
city VARCHAR(50) NOT NULL,
address VARCHAR(100) NOT NULL,
date DATE,
schedule VARCHAR(10) NOT NULL,
image VARCHAR(100) NULL,
concert_isdeleted BOOLEAN NOT NULL DEFAULT false,
FOREIGN KEY (band_id) REFERENCES band(band_id)

);

INSERT INTO concert (concert_id, band_id, city, address, date, schedule) values (1, 1, "Madrid", "Plaza la libertad, nº 1", '2024-03-12', "19:00 pm");
INSERT INTO concert (band_id, city, address, date, schedule) values (2, "Barcelona", "Avenida Ruíz Zafón", '2024-04-22', "22:00 pm");
INSERT INTO concert (band_id, city, address, date, schedule) values (2, "Vigo", "Travesía de Vigo", '2025-01-10', "16:30 pm");
INSERT INTO concert (band_id, city, address, date, schedule) values (1, "Vigo", "Avenida Coia", '2025-03-11', "17:30 pm");



select * from concert;

-- Consultas enlazadas:

select band.band_name, concert.date, concert.schedule, concert.city
from band, concert
where band.band_id = concert.band_id
and concert.city = "Vigo";

-- Consulta JOIN

select band.band_name, concert.date, concert.schedule, concert.city
from band
LEFT JOIN concert on band.band_id = concert.band_id
WHERE concert.city = "Vigo";





