
INSERT INTO categoria (nombre, texto) VALUES
  ("Inicio", "Estas son las categorias de inicio"),
  ("Nosotros", "Estos son los apartados de informacion");

INSERT INTO pregunta (categoria_id, nombre, emoji, visitas) VALUES
  (1, "Nosotros", "😎", 0),
  (1, "Lineas de trabajo", "🛒", 0),
  (2, "Categoria de ejemplo", "🛒", 0);
