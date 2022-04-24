
INSERT INTO pregunta (padre_id, nombre, emoji, texto, visitas, is_final) VALUES
  (NULL, "Inicio", "😎" , "Estas son las categorias de inicio", 0, FALSE),
  (1, "Nosotros", "😎", "Estos son los apartados de informacion", 0, FALSE);
  (1, "Lineas de trabajo", "🛒", "Estos son los apartados de informacion", 0, FALSE);

INSERT INTO pregunta (categoria_id, nombre, emoji) VALUES
  (1, "Nosotros", "😎"),
  (1, "Lineas de trabajo", "🛒"),
  (2, "Categoria de ejemplo", "🏄");
