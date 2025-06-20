CREATE DATABASE IF NOT EXISTS practicas
  DEFAULT CHARACTER SET utf8
  DEFAULT COLLATE utf8_bin;

USE practicas;

CREATE TABLE IF NOT EXISTS country (
  id INT AUTO_INCREMENT PRIMARY KEY,
  capital VARCHAR(100) NOT NULL,
  language VARCHAR(100) NOT NULL,
  area FLOAT NOT NULL,
  population BIGINT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

DELIMITER //
CREATE PROCEDURE country_get(IN country_id INT)
BEGIN
  SELECT * FROM country WHERE id = country_id;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE country_create(
  IN capital_name VARCHAR(100),
  IN country_language VARCHAR(100),
  IN country_area FLOAT,
  IN country_population BIGINT
)
BEGIN
  INSERT INTO country (capital, language, area, population)
  VALUES (capital_name, country_language, country_area, country_population);
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE country_update(
  IN country_id INT,
  IN capital_name VARCHAR(100),
  IN country_language VARCHAR(100),
  IN country_area FLOAT,
  IN country_population BIGINT
)
BEGIN
  UPDATE country
  SET capital = capital_name,
      language = country_language,
      area = country_area,
      population = country_population
  WHERE id = country_id;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE country_delete(IN country_id INT)
BEGIN
  DELETE FROM country WHERE id = country_id;
END;
//
DELIMITER ;

INSERT INTO country (capital, language, area, population) VALUES
('Buenos Aires', 'Spanish', 2780000, 47000000),   -- Argentina
('Brasília', 'Portuguese', 8516000, 213000000),   -- Brasil
('Washington D.C.', 'English', 9834000, 331000000), -- EE.UU.
('Tokyo', 'Japanese', 377975, 125800000),         -- Japón
('Berlin', 'German', 357022, 83000000);           -- Alemania

CALL country_create('Canberra', 'English', 7692000, 26000000);  -- Australia

CALL country_get(6);

-- actividad_2

USE practicas;

CREATE TABLE IF NOT EXISTS city (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_country INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  population BIGINT NOT NULL,
  area FLOAT NOT NULL,
  postal_code VARCHAR(20),
  coastal BOOLEAN NOT NULL,
  FOREIGN KEY (id_country) REFERENCES country(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

DELIMITER //
CREATE PROCEDURE city_create(
  IN country_id INT,
  IN city_name VARCHAR(100),
  IN city_population BIGINT,
  IN city_area FLOAT,
  IN city_postal_code VARCHAR(20),
  IN city_coastal BOOLEAN
)
BEGIN
  INSERT INTO city (id_country, name, population, area, postal_code, coastal)
  VALUES (country_id, city_name, city_population, city_area, city_postal_code, city_coastal);
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE city_get(IN city_id INT)
BEGIN
  SELECT * FROM city WHERE id = city_id;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE city_update(
  IN city_id INT,
  IN country_id INT,
  IN city_name VARCHAR(100),
  IN city_population BIGINT,
  IN city_area FLOAT,
  IN city_postal_code VARCHAR(20),
  IN city_coastal BOOLEAN
)
BEGIN
  UPDATE city
  SET id_country = country_id,
      name = city_name,
      population = city_population,
      area = city_area,
      postal_code = city_postal_code,
      coastal = city_coastal
  WHERE id = city_id;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE city_delete(IN city_id INT)
BEGIN
  DELETE FROM city WHERE id = city_id;
END;
//
DELIMITER ;
