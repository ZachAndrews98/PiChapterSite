INSERT INTO brothers (
    first_name, last_name, email, phone, grad_year,
    major, minor, brother_status, role_id
) VALUES (
    :#${exchangeProperty.firstName},
    :#${exchangeProperty.lastName},
    :#${exchangeProperty.email},
    :#${exchangeProperty.phone},
    :#${exchangeProperty.gradYear},
    :#${exchangeProperty.major},
    :#${exchangeProperty.minor},
    :#${exchangeProperty.status},
    :#${exchangeProperty.roleId}
);