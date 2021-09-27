SELECT
    brothers.*,
    roles.name as role_name,
    roles.role_rank as role_rank
FROM
    brothers
LEFT JOIN roles
ON brothers.role_id = roles.role_id
WHERE brother_id=:#brotherId;