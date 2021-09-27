SELECT 
    brothers.*,
    roles.name as role_name,
    roles.role_rank as role_rank
FROM
    brothers
LEFT JOIN roles
ON brothers.role_id = roles.role_id
WHERE
    brothers.firstName LIKE #${exchangeProperty.firstName} AND
    brothers.lastName LIKE #${exchangeProperty.lastName} AND
    brothers.grad_year LIKE #${exchangeProperty.gradYear} AND
    brothers.major LIKE #${exchangeProperty.major} AND
    brothers.minor LIKE #${exchangeProperty.minor} AND
    brothers.role_id LIKE #${exchangeProperty.roleId};