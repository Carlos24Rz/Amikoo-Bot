
-- Recursive select of all childs of $id
WITH RECURSIVE cte (id, padre_id, nombre, emoji) AS (
  SELECT     id,
             padre_id,
             nombre,
             emoji
  FROM       pregunta
  WHERE      id = 2
  UNION ALL
  SELECT     id,
             padre_id,
             nombre,
             emoji
  FROM       pregunta
  WHERE      padre_id = 2
  UNION ALL
  SELECT     p.id,
             p.padre_id,
             p.nombre,
             p.emoji
  FROM       pregunta p
  INNER JOIN cte
          ON p.padre_id = cte.id
)
SELECT * FROM cte;


-- All rows with their parents row name
SELECT a.id, a.nombre, a.emoji, b.nombre AS parent
FROM pregunta a
LEFT JOIN pregunta b ON a.padre_id = b.id
WHERE b.nombre = "Inicio"

-- All rows with their parents row name
SELECT pregunta.id, pregunta.nombre, pregunta.emoji, b.nombre AS parent
FROM pregunta
LEFT JOIN pregunta b ON pregunta.padre_id = b.id
WHERE b.nombre = "Inicio"

-- Get Parent of a pregunta
SELECT pregunta.id, pregunta.nombre, pregunta.emoji, b.nombre AS parent
FROM pregunta
LEFT JOIN pregunta b ON pregunta.padre_id = b.id
WHERE pregunta.nombre = "Nosotros"

-- IDK
SELECT id, nombre, emoji
FROM pregunta
WHERE id = (SELECT padre_id
            FROM pregunta
            WHERE pregunta.nombre = "Nosotros"
            )

-- Select count
SELECT count(*)
FROM pregunta
LEFT JOIN pregunta Parent ON pregunta.padre_id = Parent.id
WHERE Parent.nombre = "Nosotros";
