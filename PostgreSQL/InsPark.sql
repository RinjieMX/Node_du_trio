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
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('What is the official language of England?', 'The official language of England is English.', 1);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('How many letters are there in the English alphabet?', 'There are 26 letters in the English alphabet.', 1);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('What does the word "book" mean?', 'A book is a written or printed work consisting of pages glued or sewn together along one side and bound in covers.', 1);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('Can you name three common English greetings?', 'Three common English greetings are "Hello," "Hi," and "Good morning."', 1);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('What is the past tense of the verb "to read"?', 'The past tense of the verb "to read" is "read."', 1);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('What is the color of the sky', 'The is usually blue. During the sunrise or sunset it can be orange and yellow as well.', 1);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('What is the difference between "its" and "it''s"?', '"Its" is a possessive pronoun, while "it''s" is a contraction of "it is" or "it has."', 1);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('Give one opposite and one synonym of the word : intelligent', 'Intelligent has the same meaning as clever and is the opposite of stupid.', 1);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('What is the plural form of "child"?', 'The plural form of "child" is "children."', 1);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('Give at least one country where English is or one of the official language(s)', 'United Kingdom, Canada, United States, Australia, India, South Africa, ', 1);

INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('What is the capital of France?', 'The capital of France is Paris.', 2);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('Who was the first Emperor of France?', 'The first Emperor of France was Napoleon Bonaparte.', 2);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('In which century did the French Revolution take place?', 'The French Revolution took place in the 18th century.', 2);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('What is the significance of the Bastille?', 'The Bastille was a symbol of royal tyranny and its storming marked the beginning of the French Revolution.', 2);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('Who is Joan of Arc?', 'Joan of Arc, also known as Jeanne d Arc, was a heroine of France and a key figure during the Hundred Years War.', 2);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('What is the Palace of Versailles?', 'The Palace of Versailles is a royal palace in France, known for its opulent architecture and gardens.', 2);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('Who wrote "Les Misérables"?', 'Victor Hugo wrote "Les Misérables," a classic novel set against the backdrop of post-revolutionary France.', 2);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('What is the significance of the Eiffel Tower?', 'The Eiffel Tower is an iconic symbol of France and was built for the 1889 Exposition Universelle in Paris.', 2);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('Which famous French queen was married to Louis XVI?', 'Marie Antoinette was the queen of France and the wife of King Louis XVI.', 2);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('What is the motto of the French Republic?', 'The motto of the French Republic is "Liberté, égalité, fraternité" (Liberty, equality, fraternity).', 2);

INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('What is Python?', 'Python is a high-level programming language known for its readability and versatility.', 3);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('What are the main features of Python?', 'Python is known for its simplicity, readability, and extensive libraries that support various applications.', 3);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('How do you declare a variable in Python?', 'In Python, you can declare a variable by simply assigning a value to a name, like: "x = 10".', 3);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('What is a Python function?', 'A function in Python is a reusable block of code that performs a specific task. It is defined using the "def" keyword.', 3);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('Explain the concept of indentation in Python.', 'In Python, indentation is used to define blocks of code. It replaces curly braces used in many other programming languages.', 3);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('What is the purpose of the "if" statement in Python?', 'The "if" statement is used for conditional execution, allowing the program to make decisions based on certain conditions.', 3);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('Can you name some popular Python frameworks?', 'Yes, some popular Python frameworks include Django (for web development), Flask, and PyTorch (for machine learning).', 3);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('How do you install external libraries in Python?', 'You can use the "pip" tool to install external libraries in Python. For example, "pip install library_name".', 3);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('What is the purpose of the "__init__" method in Python classes?', 'The "__init__" method is a constructor in Python classes and is automatically called when an object is created from the class.', 3);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('What are some advantages of using Python?', 'Advantages of Python include its simplicity, readability, extensive libraries, and strong community support.', 3);

INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('What is the capital of France?', 'The capital of France is Paris.', 4);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('Can you name three countries in Western Europe?', 'Three countries in Western Europe are France, Germany, and Spain.', 4);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('Which river is the longest in Europe?', 'The longest river in Europe is the Volga River.', 4);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('What is the official currency of the European Union?', 'The official currency of the European Union is the Euro.', 4);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('Identify the country with the highest mountain in Europe.', 'The country with the highest mountain in Europe is Russia, with Mount Elbrus.', 4);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('Name two landlocked countries in Europe.', 'Two landlocked countries in Europe are Austria and Switzerland.', 4);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('Which sea separates Italy from the Balkan Peninsula?', 'The Adriatic Sea separates Italy from the Balkan Peninsula.', 4);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('Identify the northernmost country in Europe.', 'The northernmost country in Europe is Norway.', 4);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('What is the symbol on the flag of Greece?', 'The symbol on the flag of Greece is the blue and white cross.', 4);
INSERT INTO projeta4.learning_fact (recto, verso, id_package) VALUES ('Which country is known as the "Land of a Thousand Lakes"?', 'Finland is known as the "Land of a Thousand Lakes" in Europe.', 4);

--Tests
SELECT * FROM projeta4.users;
SELECT * FROM projeta4.learning_fact;
SELECT * FROM projeta4.learning_package;