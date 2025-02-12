-- Get single user roles based on the username
-- SELECT * FROM get_user_roles('username');
CREATE OR REPLACE FUNCTION get_user_roles(usr TEXT, creator_usr TEXT)
RETURNS TABLE(role_name TEXT) AS $$
DECLARE
    is_admin BOOLEAN;
BEGIN
    -- Check if the creator is an admin
    is_admin := is_user_admin(creator_usr);

    IF NOT is_admin THEN
        RAISE EXCEPTION 'Only admins can retrieve user roles.';
    END IF;

    RETURN QUERY 
    SELECT r.name 
    FROM role r 
    INNER JOIN people_role pr ON r.id = pr.role_id 
    WHERE pr.people_id = (
        SELECT p.id FROM people p WHERE p.username = usr
    );
END;
-- $$ LANGUAGE plpgsql;

-- -- Get all users all roles
-- CREATE OR REPLACE FUNCTION get_all_users_roles(creator_usr TEXT)
-- RETURNS TABLE(username TEXT, role_name TEXT) AS $$
-- DECLARE
--     is_admin BOOLEAN;
-- BEGIN
--     -- Check if the creator is an admin
--     is_admin := is_user_admin(creator_usr);

--     IF NOT is_admin THEN
--         RAISE EXCEPTION 'Only admins can retrieve user roles.';
--     END IF;

--     RETURN QUERY 
--     SELECT p.username, r.name 
--     FROM people p
--     INNER JOIN people_role pr ON p.id = pr.people_id
--     INNER JOIN role r ON r.id = pr.role_id;
-- END;
-- $$ LANGUAGE plpgsql;


-- Validate username and password
-- SELECT validate_user('username', 'password');
-- CREATE OR REPLACE FUNCTION validate_user(usr TEXT, password TEXT)
-- RETURNS BOOLEAN AS $$
-- BEGIN
--     -- Check if the username and password are provided
--     IF usr IS NULL OR password IS NULL THEN
--         RAISE EXCEPTION 'Username and password are required.';
--     END IF;

--     -- Check if the username and password are valid
--     IF EXISTS (
--         SELECT 1 
--         FROM people p 
--         WHERE p.username = usr AND p.passwd = password
--     ) THEN
--         RETURN TRUE;
--     ELSE
--         RAISE NOTICE 'Invalid username or password for user: %', usr;
--         RETURN FALSE;
--     END IF;
-- END;
-- $$ LANGUAGE plpgsql;

-- Validate username and password and return user roles
CREATE OR REPLACE FUNCTION validate_user_and_get_roles(usr TEXT, password TEXT)
RETURNS TABLE(authenticated BOOLEAN, roles TEXT[]) AS $$
BEGIN
    -- Check if the username and password are provided
    IF usr IS NULL OR password IS NULL THEN
        RAISE EXCEPTION 'Username and password are required.';
    END IF;

    -- Check if the username and password are valid
    IF EXISTS (
        SELECT 1 
        FROM public.people p 
        WHERE p.username = usr AND p.passwd = password
    ) THEN
        RETURN QUERY SELECT true AS authenticated, ARRAY(
            SELECT r.name 
            FROM role r 
            INNER JOIN people_role pr ON r.id = pr.role_id 
            WHERE pr.people_id = (
                SELECT p.id FROM people p WHERE p.username = usr
            )
        );
    ELSE
        RETURN QUERY SELECT false AS authenticated, NULL::text[];
    END IF;
END;
$$ LANGUAGE plpgsql;


-- Check whether the user is an admin (this is used when we need to specify the creator of a new user)
CREATE OR REPLACE FUNCTION is_user_admin(username TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    is_admin BOOLEAN;
BEGIN
    -- Check if the username is provided
    IF username IS NULL THEN
        RAISE EXCEPTION 'Username is required.';
    END IF;

    -- Check if the user is an admin
SELECT EXISTS (
    SELECT 1 
    FROM people p 
    JOIN people_role pr ON p.id = pr.people_id
    JOIN role r ON pr.role_id = r.id
    WHERE p.username = creator_usr AND r.name = 'Admin'
) INTO is_admin;

    RETURN is_admin;
END;
$$ LANGUAGE plpgsql;

-- Create new user if you're admin
-- SELECT create_user('username', 'password', 'creator_username');
-- CREATE OR REPLACE FUNCTION create_user(usr TEXT, password TEXT, realname TEXT, email TEXT, active BOOLEAN, creator_usr TEXT)
-- RETURNS VOID AS $$
-- DECLARE
--     is_admin BOOLEAN;
-- BEGIN
--     -- Check if the username, password, and creator username are provided
--     IF usr IS NULL OR password IS NULL OR creator_usr IS NULL THEN
--         RAISE EXCEPTION 'Username, password, and creator username are required.';
--     END IF;

--     -- Check if the creator is an admin
--     is_admin := is_user_admin(creator_usr);

--     IF NOT is_admin THEN
--         RAISE EXCEPTION 'Only admins can create new users.';
--     END IF;

--     -- Check if the username already exists
--     IF EXISTS (
--         SELECT 1 
--         FROM people p 
--         WHERE p.username = usr
--     ) THEN
--         RAISE EXCEPTION 'Username already exists.';
--     ELSE
--         -- Insert the new user into the people table
--         INSERT INTO people (username, passwd, realname, email, active)
--         VALUES (usr, password, realname, email, active);
--     END IF;
-- END;
-- $$ LANGUAGE plpgsql;


-- Function to get all employees
-- CREATE OR REPLACE FUNCTION get_all_employees(creator_usr TEXT)
-- RETURNS TABLE(id INT, role_id INT, username TEXT, password TEXT, realname TEXT, email TEXT) AS $$
-- DECLARE
--     is_admin BOOLEAN;
-- BEGIN
--     -- Check if the creator username is provided
--     IF creator_usr IS NULL THEN
--         RAISE EXCEPTION 'Creator username is required.';
--     END IF;

--     -- Check if the creator is an admin
--     is_admin := is_user_admin(creator_usr);

--     IF NOT is_admin THEN
--         RAISE EXCEPTION 'Only admins can create new users.';
--     END IF;

--     -- Return all employees
--     RETURN QUERY SELECT * FROM public.people;
-- END;
-- $$ LANGUAGE plpgsql;

-- Function to update an employee
-- CREATE OR REPLACE FUNCTION update_employee(creator_usr TEXT, id INT, role_id INT, username TEXT, password TEXT, realname TEXT, email TEXT)
-- RETURNS TABLE(id INT, role_id INT, username TEXT, password TEXT, realname TEXT, email TEXT) AS $$
-- BEGIN
--     -- Check if the creator is an admin
--     IF NOT is_user_admin(creator_usr) THEN
--         RAISE EXCEPTION 'Only admins can update employees.';
--     END IF;

--     -- Update the employee
--     RETURN QUERY UPDATE public.people SET role_id = role_id, username = username, password = password, realname = realname, email = email WHERE id = id RETURNING *;
-- END;
-- $$ LANGUAGE plpgsql;

-- -- Function to delete an employee
-- CREATE OR REPLACE FUNCTION delete_employee(creator_usr TEXT, id INT)
-- RETURNS TABLE(id INT, role_id INT, username TEXT, password TEXT, realname TEXT, email TEXT) AS $$
-- BEGIN
--     -- Check if the creator is an admin
--     IF NOT is_user_admin(creator_usr) THEN
--         RAISE EXCEPTION 'Only admins can delete employees.';
--     END IF;

--     -- Delete the employee
--     RETURN QUERY DELETE FROM public.people WHERE id = id RETURNING *;
-- END;
-- $$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION public.validate_user(usr text, password text)
 RETURNS TABLE(authenticated boolean, roles text[])
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Check if the username and password are provided
    IF usr IS NULL OR password IS NULL THEN
        RAISE EXCEPTION 'Username and password are required.';
    END IF;

    -- Check if the username and password are valid
    IF EXISTS (
        SELECT 1 
        FROM public.people p 
        WHERE p.username = usr AND p.passwd = password
    ) THEN
        RETURN QUERY SELECT true AS authenticated, ARRAY(SELECT pr.role FROM public.people_role pr WHERE pr.username = usr);
    ELSE
        RETURN QUERY SELECT false AS authenticated, NULL::text[];
    END IF;
END;
$function$;