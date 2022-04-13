
CREATE DATABASE chatbot DEFAULT CHARSET = utf8mb4 DEFAULT COLLATE = utf8mb4_unicode_ci;

USE chatbot;

CREATE TABLE categoria(
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre varchar(20) NOT NULL,
  texto varchar(500) NOT NULL
);

CREATE TABLE pregunta(
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  categoria_id int NOT NULL,
  nombre varchar(30) NOT NULL,
  emoji varchar(1) NOT NULL,
  visitas int,
    FOREIGN KEY (categoria_id)
    REFERENCES categoria(id)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE persona(
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre varchar(50) NOT NULL,
  correo varchar(50) NOT NULL,
  descripcion varchar(255) NOT NULL
);

CREATE TABLE calificacion(
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  calificacion int NOT NULL,
  fecha date NOT NULL
);

-- TO DOF
CREATE TABLE reporte(
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  fecha datetime NOT NULL
);

CREATE TABLE reportepregunta(
  reporte_id int NOT NULL,
  pregunta_id int NOT NULL,
  visitas int NOT NULL,
  PRIMARY KEY (reporte_id, pregunta_id),
    FOREIGN KEY (reporte_id)
    REFERENCES reporte(id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY (pregunta_id)
    REFERENCES pregunta(id)
    ON UPDATE CASCADE ON DELETE RESTRICT

);
