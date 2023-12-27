--Users
INSERT INTO projeta4.users VALUES ('manon.gardin@gmail.com', '123', 'Manon', 'Gardin');

--Learning Package
INSERT INTO projeta4.learning_package (title_package, description_package, category, target_audience, difficulty_level)
VALUES ('English for All', 'A class for beginner in english, learning the basics here.', 'English', 'Any', 'Easy');
INSERT INTO projeta4.learning_package (title_package, description_package, category, target_audience, difficulty_level)
VALUES ('French History', 'Learn about French history, from the small gallic villages to Napoleons Empire', 'History', 'Children', 'Medium');
INSERT INTO projeta4.learning_package (title_package, description_package, category, target_audience, difficulty_level)
VALUES ('Learn Python', 'Advanced class in python', 'Informatics', 'Adults', 'Hard');
INSERT INTO projeta4.learning_package (title_package, description_package, category, target_audience, difficulty_level)
VALUES ('Europe Geography', 'Learn the positions of Countries, their capitals and their flags', 'Geography', 'Eldery', 'Easy');

--Learning Facts
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('Coucou ca va ?', 'Oui et toi ?', 1);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('Nouvelle question', 'Réponse', 1);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('Troisième ligne ?', 'Oui cest ca', 2);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('Et celle la ?', 'La dernière', 3);

--Tests
SELECT * FROM projeta4.users;
SELECT * FROM projeta4.learning_fact;
SELECT * FROM projeta4.learning_package;