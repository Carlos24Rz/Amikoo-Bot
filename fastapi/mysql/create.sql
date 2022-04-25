CREATE DATABASE chatbot DEFAULT CHARSET = utf8mb4 DEFAULT COLLATE = utf8mb4_unicode_ci;

USE chatbot;

CREATE TABLE categoria(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre varchar(80) NOT NULL,
  texto varchar(600) NOT NULL,
  visitas INT NOT NULL,
  is_final BOOLEAN NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE pregunta(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  categoria_id INT NOT NULL,
  nombre varchar(80) NOT NULL,
  emoji varchar(1) NOT NULL,
    FOREIGN KEY (categoria_id)
    REFERENCES categoria(id)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE persona(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre varchar(50) NOT NULL,
  correo varchar(50) NOT NULL,
  fecha DATETIME NOT NULL,
  descripcion varchar(255) NOT NULL
);

CREATE TABLE calificacion(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  calificacion INT NOT NULL,
  fecha DATETIME NOT NULL
);










CREATE DATABASE chatbot DEFAULT CHARSET = utf8mb4 DEFAULT COLLATE = utf8mb4_unicode_ci;

USE chatbot;

CREATE TABLE pregunta(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  padre_id INT,
  nombre varchar(80) NOT NULL,
  emoji varchar(3) NOT NULL,
  texto varchar(600) NOT NULL,
  visitas INT NOT NULL,
  is_final BOOLEAN NOT NULL,
    FOREIGN KEY (padre_id)
    REFERENCES pregunta(id)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;


CREATE TABLE persona(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre varchar(60) NOT NULL,
  correo varchar(50) NOT NULL,
  descripcion varchar(600) NOT NULL,
  fecha DATETIME NOT NULL
);

CREATE TABLE calificacion(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  calificacion INT NOT NULL,
  fecha DATETIME NOT NULL
);
