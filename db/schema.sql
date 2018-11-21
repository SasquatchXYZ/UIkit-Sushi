CREATE DATABASE sushi_db;

USE sushi_db;

CREATE TABLE sushi (
  id INT AUTO_INCREMENT NOT NULL,
  sushi_name VARCHAR(255) NOT NULL,
  mindfully_eaten BOOLEAN NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);