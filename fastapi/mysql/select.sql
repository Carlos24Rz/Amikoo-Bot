WITH RECURSIVE cte (id, padre_id, nombre, emoji) AS (
  SELECT     id,
             padre_id,
             nombre,
             emoji
  FROM       pregunta
  WHERE      padre_id = 1
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
