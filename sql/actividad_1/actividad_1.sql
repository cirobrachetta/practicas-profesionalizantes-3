CREATE DATABASE IF NOT EXISTS practicas
  DEFAULT CHARACTER SET utf8
  DEFAULT COLLATE utf8_bin;

USE practicas;

CREATE TABLE country (
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