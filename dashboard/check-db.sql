-- Check all students in the database
SELECT id, username, name, surname, "classId" 
FROM "Student" 
ORDER BY id;

-- Check if the Clerk user ID exists in Student table
SELECT id, username, name, surname, "classId"
FROM "Student"
WHERE id = 'user_378UCAmGnIuXpjGiyb7zZ2zjBuZ';

-- Check all classes
SELECT id, name FROM "Class" ORDER BY id;

-- Check which class has students
SELECT c.id, c.name, COUNT(s.id) as student_count
FROM "Class" c
LEFT JOIN "Student" s ON s."classId" = c.id
GROUP BY c.id, c.name
ORDER BY c.id;
user_378UCAmGnIuXpjGiyb7zZ2zjBuZ
user_378UCAmGnIuXpjGiyb7zZ2zjBuZ