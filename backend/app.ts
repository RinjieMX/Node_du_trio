import express from 'express';
import {insertUser, getAllUsers} from "./DBManager";
import { LearningPackage, LearningFact, User } from "./DBManager";

const app = express();
const PORT= 3000;

app.use(express.json())

app.get('/api/liveness', (req, res)=> {
    res.status(200).send('OK');
});

//------------------- PARTIE PACKAGE ---------------------
app.get('/api/getpackage', async (req, res) => {
    try {
        const packages = await LearningPackage.findAll();
        res.status(200).json(packages);
    } catch (error) {
        console.error('Erreur lors de la récupération des packages:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/getpackage/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    const PackageId = await LearningPackage.findByPk(id);

    if (PackageId) {
        res.status(200).json(PackageId);
    } else {
        res.status(404).send(`Entity not found for id: ${id}`);
    }
});

app.get('/api/package-summaries', async (req, res) => {
    try {
        // Utiliser Sequelize pour récupérer tous les Learning Packages
        const learningPackages = await LearningPackage.findAll();

        // Créer un tableau de résumés à partir des Learning Packages
        const packageSummaries = await LearningPackage.findAll({
            attributes: ['id_package', 'title_package'],
        });

        res.status(200).json(packageSummaries);
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la récupération des résumés des Learning Packages' });
    }
});

app.post('/api/createpackage', async (req, res) => {
    const { title_package, description_package, category, target_audience, difficulty_level } = req.body;

    try {
        // Créer un nouveau package dans la base de données
        const newPackage = await LearningPackage.create({
            title_package,
            description_package,
            category,
            target_audience,
            difficulty_level,
        });

        res.status(201).json(newPackage);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});



app.put('/api/editpackage/:id', async (req, res) => {
    console.log('Received PUT request with body:', req.body);

    const id = parseInt(req.params.id);
    const newtitle = req.body.newtitle;
    const newdescription = req.body.newdecription;
    const newcategory = req.body.newcategory;
    const newtarget = req.body.newtarget;
    const newdifficulty = req.body.newdifficulty;

    if (!newtitle ) {
        res.status(400).json({ error: "A modification is required." });
        return;
    }

    try {
        const [rowsUpdated, [updatePackage]] = await LearningPackage.update(
            { title_package: newtitle, description_package: newdescription, category: newcategory, target_audience: newtarget, difficulty_level: newdifficulty},
            {
                returning: true,
                where: { id_package: id },
            }
        );

        if (rowsUpdated === 0 || !updatePackage) {
            res.status(404).json({ error: 'Package not found' });
            return;
        }

        res.status(200).json(updatePackage);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }


});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//------------------ PARTIE USER ---------------------
app.get('/api/users', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send({ error: 'Connexion à la db impossible' });
    }
});

app.post('/api/createUser', async (req, res) => {
    const { email_user, password_user, firstname_user, lastname_user } = req.body;
    console.log(req.body);

    try {
        // Créer un nouveau package dans la base de données
        const result = await User.create({
            email_user,
            password_user,
            firstname_user,
            lastname_user
        });

        res.status(201).json({ success: true, message: 'User created successfully', result });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

//---------------------- PARTIE FACT ----------------------
app.get('/api/getfactfrompackage/:idpackage', async (req, res) => {
    const idpackage = parseInt(req.params.idpackage);
    try {
        const facts = await LearningFact.findAll({
            where: { id_package: idpackage },
        });
        res.status(200).send(facts);
    } catch (error) {
        console.error('Erreur lors de la récupération des facts :', error);
        res.status(500).send('Internal Server Error');
    }
});

//Get le nombre de facts dans un package
app.get('/api/getNbFactinPackage/:idpackage', async (req, res) => {
    const idpackage = parseInt(req.params.idpackage);
    try {
        const count = await LearningFact.count({ where: { id_package: idpackage } });
        res.status(200).json({ count });
    } catch (error) {
        console.error('Erreur lors de la récupération des facts :', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/getfact/:idfact', async (req, res) => {
    const idfact = parseInt(req.params.idfact);
    try {
        const facts = await LearningFact.findByPk(idfact);
        res.status(200).send(facts);
    } catch (error) {
        console.error('Erreur lors de la récupération des facts :', error);
        res.status(500).send('Internal Server Error');
    }
});

app.put('/api/editfact/:id', async (req, res) => {
    console.log('Received PUT request with body:', req.body);


    const id = parseInt(req.params.id);
    const newrecto = req.body.newrecto;
    const newverso = req.body.newverso;

    if (!newrecto && !newverso) {
        res.status(400).json({ error: "A modification is required." });
        return;
    }

    try {
        // Mettre à jour le titre du package dans la base de données
        const [rowsUpdated, [updatedFact]] = await LearningFact.update(
            { recto: newrecto, verso: newverso },
            {
                returning: true, // Retourner les lignes mises à jour
                where: { id_fact: id },
            }
        );

        if (rowsUpdated === 0 || !updatedFact) {
            res.status(404).json({ error: 'Fact not found' });
            return;
        }

        res.status(200).json(updatedFact);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/api/createFact', async (req, res) => {
    const { recto, verso, id_package } = req.body;

    try {
        // Créer un nouveau package dans la base de données
        const result = await LearningFact.create({
            recto,
            verso,
            id_package
        });

        res.status(201).json({ success: true, message: 'Fact created successfully', result });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});
