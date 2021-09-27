UPDATE brothers
SET     `first_name` = IfNull(:#${exchangeProperty.firstName}, first_name),
        `last_name` = IfNull(:#${exchangeProperty.lastName}, last_name),
        `email` = IfNull(:#${exchangeProperty.email}, email),
        `phone` = IfNull(:#${exchangeProperty.phone}, phone),
        `grad_year` = IfNull(:#${exchangeProperty.gradYear}, grad_year),
        `major` = IfNull(:#${exchangeProperty.major}, major),
        `minor` = IfNull(:#${exchangeProperty.minor}, minor),
        `brother_status` = IfNull(:#${exchangeProperty.status}, brother_status),
        `role_id` = IfNull(:#${exchangeProperty.roleId}, role_id)
WHERE brother_id=:#brotherId;