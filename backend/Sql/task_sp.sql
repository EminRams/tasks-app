DELIMITER //

CREATE PROCEDURE sp_insert_task (
    IN p_user_id INT,
    IN p_title VARCHAR(255),
    IN p_description TEXT,
    IN p_due_date DATE
)
BEGIN
INSERT INTO
    tasks (user_id, title, description, due_date)
VALUES
    (p_user_id, p_title, p_description, p_due_date);
END //


CREATE PROCEDURE sp_get_tasks_by_user (
    IN p_user_id INT
)
BEGIN
SELECT
    id, title, description, due_date
FROM
    tasks
WHERE
    user_id = p_user_id;
END //


CREATE PROCEDURE sp_get_task_by_id (
    IN p_task_id INT,
    IN p_user_id INT
)
BEGIN
SELECT
    id
FROM
    tasks
WHERE
    id = p_task_id AND user_id = p_user_id;
END //


CREATE PROCEDURE sp_delete_task (
    IN p_task_id INT,
    IN p_user_id INT
)
BEGIN
DELETE FROM
    tasks
WHERE
    id = p_task_id AND user_id = p_user_id;
END //

DELIMITER ;