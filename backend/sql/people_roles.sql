-- Now we have simplified solution for the rights and roles. We can use the people_role table to assign roles to people.
-- people, role, people_role

-- we use join table to assign roles to people
-- and we have possibility to assign multiple roles to one person
-- like this:
-- people_role
-- people_id | role_id
-- 1         | 1
-- 1         | 2
-- 2         | 1
-- 2         | 3

-- with this command we can assign multiple roles to one person
INSERT INTO "people_role" ("people_id", "role_id")
VALUES   (1, 2),
         (1, 3),
         (2, 1),
         (2, 3);

-- as you can see, the same person can have multiple roles

-- you might wonder how to create a user with a role
-- you can do it like this:
-- first create a user
INSERT INTO "people" ("role_id", "username", "passwd", "realname")
VALUES (1, 'admin', 'admin', 'Admin');

-- then assign a role to the user
INSERT INTO "people_role" ("people_id", "role_id")
VALUES (1, 1);

-- if you want to remove all roles from a person, you can do it like this:
-- first remove all roles from the person
DELETE FROM "people_role" WHERE "people_id" = 1;

-- then remove the person if you want
DELETE FROM "people" WHERE "id" = 1;

-- if you want to remove all roles from all people, you can do it like this:
-- first remove all roles from all people
DELETE FROM "people_role";

-- then remove all people if you want
DELETE FROM "people";

-- if you want to see which roles people has, you can do it like this:
SELECT * FROM "people_role"
JOIN "people" ON "people_role"."people_id" = "people"."id"
JOIN "role" ON "people_role"."role_id" = "role"."id";

-- if you want to see which roles a person has, you can do it like this:
SELECT * FROM "people_role"
JOIN "people" ON "people_role"."people_id" = "people"."id"
JOIN "role" ON "people_role"."role_id" = "role"."id"
WHERE "people"."id" = 1;

-- if you want to see which people have a role, you can do it like this:
SELECT * FROM "people_role"
JOIN "people" ON "people_role"."people_id" = "people"."id"
JOIN "role" ON "people_role"."role_id" = "role"."id"
WHERE "role"."id" = 1;

-- if you want to reset password for a person, you can do it like this:
UPDATE "people" SET "passwd" = 'newpassword' WHERE "id" = 1;







-- remove everything from the people
DELETE FROM people;

-- Give roles a name
INSERT INTO "role" ("id", "name")
VALUES (1, 'Admin');


-- people_role
INSERT INTO "people_role" ("people_id", "role_id")
VALUES (1, 2);



-- based on this all, heres how you create a user with a role
-- first create a user
INSERT INTO "people" ("role_id", "username", "passwd", "realname")
VALUES (1, 'admin', 'admin', 'Admin');

-- then assign a role to the user
INSERT INTO "people_role" ("people_id", "role_id")
VALUES (1, 1);

-- if you want to remove all roles from a person, you can do it like this:
-- first remove all roles from the person
DELETE FROM "people_role" WHERE "people_id" = 1;

-- then remove the person if you want
DELETE FROM "people" WHERE "id" = 1;



-- we need to generate the password for the user
create extension if not exists pgcrypto;

-- Generate a random password
INSERT INTO "people" ("role_id", "username", "passwd", "realname", "email")
VALUES (1, 'admin', encode(gen_random_bytes(5), 'base64'), 'Admin Dude', 'admin@email.com');

-- Generate a random password and hash it
INSERT INTO "people" ("role_id", "username", "passwd", "realname", "email")
VALUES (1, 'admin', crypt(encode(gen_random_bytes(5), 'base64'), gen_salt('bf')), 'Admin Dude', 'admin@email.com');

insert into "people_role" ("people_id", "role_id")
values (1, 1);

INSERT INTO "people" ("role_id", "username", "passwd", "realname")
VALUES (2, 'volunteer', 'volunteer', 'Volunteer Dude');

insert into "people_role" ("people_id", "role_id")
values (2, 2);


DELETE FROM "people_role" WHERE "people_id" = 2;

delete from "people" where "id" = 1;