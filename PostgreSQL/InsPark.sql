--Users
INSERT INTO projeta4.users VALUES ('manon.gardin@gmail.com', '123', 'Manon', 'Gardin');

--Learning Package
INSERT INTO projeta4.learning_package (title_package, description_package, category, target_audience, difficulty_level)
VALUES ('Package 1', 'Description du package 1', 'Catégorie A', 'Public cible du package 1', 'Easy');
INSERT INTO projeta4.learning_package (title_package, description_package, category, target_audience, difficulty_level)
VALUES ('Package 2', 'Description du package 2', 'Catégorie B', 'Public cible du package 2', 'Medium');
INSERT INTO projeta4.learning_package (title_package, description_package, category, target_audience, difficulty_level)
VALUES ('Package 3', 'Description du package 3', 'Catégorie C', 'Public cible du package 3', 'Hard');
INSERT INTO projeta4.learning_package (title_package, description_package, category, target_audience, difficulty_level)
VALUES ('Package 4', 'Description du package 4', 'Catégorie A', 'Public cible du package 4', 'Easy');

--Learning Facts
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('Coucou ca va ?', 'Oui et toi ?', 1);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('Nouvelle question', 'Réponse', 1);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('Troisième ligne ?', 'Oui cest ca', 2);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('Et celle la ?', 'La dernière', 3);

--Tests
SELECT * FROM projeta4.users;
SELECT * FROM projeta4.learning_fact;
SELECT * FROM projeta4.learning_package;