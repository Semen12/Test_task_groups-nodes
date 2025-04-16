-- database: ../sqlite3.db
SELECT
    m.id AS metric_id,
    m.datetime,
    m.cpu_utilization,
    m.memory_utilization,
    m.disk_utilization,
    json_object(
            'id', n.id,
            'caption', n.caption,
            'status', json_object(
                    'color', ns.color,
                    'description', ns.description
                      )
    ) AS node_info
FROM metrics m
         JOIN nodes n ON m.node_id = n.id
         LEFT JOIN statuses ns ON n.status = ns.Id
ORDER BY m.datetime;

