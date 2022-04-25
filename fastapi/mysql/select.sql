
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
select a.id, a.nombre, a.emoji, b.nombre as parent
from pregunta a
left join pregunta b on a.padre_id = b.id
where b.nombre = "Inicio"

-- All rows with their parents row name
select pregunta.id, pregunta.nombre, pregunta.emoji, b.nombre as parent
from pregunta
left join pregunta b on pregunta.padre_id = b.id
where b.nombre = "Inicio"
