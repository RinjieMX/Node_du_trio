import express from 'express';
import {insertUser, getAllUsers} from "./DBManager";
import { LearningPackage, LearningFact, User } from "./DBManager";

const app = express();
const PORT= 3000;

app.use(express.json())

app.get('/api/liveness', (req, res)=> {
    res.status(200).send('OK');
});

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
    const id = parseInt(req.params.id);
    const newtitle = req.body.newtitle;

    if (!newtitle) {
        res.status(400).json({ error: "New title is required" });
        return;
    }

    try {
        // Mettre à jour le titre du package dans la base de données
        const [rowsUpdated, [updatedPackage]] = await LearningPackage.update(
            { title_package: newtitle },
            {
                returning: true, // Retourner les lignes mises à jour
                where: { id_package: id },
            }
        );

        if (rowsUpdated === 0 || !updatedPackage) {
            res.status(404).json({ error: 'Package not found' });
            return;
        }

        res.status(200).json(updatedPackage);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//TEST DE LA DATABASE
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