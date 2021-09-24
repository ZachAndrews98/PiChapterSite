SELECT 
    brothers.*,
    roles.name as role_name
FROM
    brothers
LEFT JOIN roles
ON brothers.role_id = roles.role_id;