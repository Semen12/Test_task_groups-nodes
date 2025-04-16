SELECT
    g.id AS group_id,
    g.caption AS group_caption,
    json_group_array(
            json_object(
                    'node_id', n.id,
                    'node_caption', n.caption,
                    'node_status', json_object(
                            'color', ns.color,
                            'description', ns.description
                                   ),
                    'interface', json_object(
                            'id', i.id,
                            'caption', i.caption,
                            'status', json_object(
                                    'color', is2.color,
                                    'description', is2.description
                                      )
                                 ),
                    'applications', (
                        SELECT json_group_array(
                                       json_object(
                                               'id', a.id,
                                               'caption', a.caption
                                       )
                               )
                        FROM nodes_applications na
                                 JOIN applications a ON na.application_id = a.id
                        WHERE na.node_id = n.id
                    ),
                    'administrator', (
                        SELECT json_object(
                                       'id', u.id,
                                       'firstname', u.firstname,
                                       'lastname', u.lastname,
                                       'email', u.email
                               )
                        FROM users u
                        WHERE u.id = n.admin
                    )
            )
    ) AS nodes
FROM groups g
         JOIN groups_nodes gn ON g.id = gn.group_id
         JOIN nodes n ON gn.node_id = n.id
         JOIN statuses ns ON n.status = ns.Id
         LEFT JOIN interfaces i ON n.interface = i.id
         LEFT JOIN statuses is2 ON CAST(i.status AS INTEGER) = is2.Id
GROUP BY g.id;
