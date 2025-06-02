DELIMITER //

CREATE PROCEDURE sp_insert_user (
    IN p_username VARCHAR(50),
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(255)
) BEGIN
INSERT INTO
    users (username, email, password)
VALUES
    (p_username, p_email, p_password);
END; // 

CREATE PROCEDURE sp_get_user_by_email (
    IN p_email VARCHAR(100)
) BEGIN
SELECT
    id, username, password
FROM
    users
WHERE
    email = p_email;
END; //

DELIMITER ;
