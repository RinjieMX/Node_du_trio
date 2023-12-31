import express from 'express';
import { LearningPackage, LearningFact } from "./DBManager";
import { Sequelize, Op } from "sequelize";

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
    const { title_package, description_package, category, target_audience, difficulty_level, finished_package } = req.body;

    try {
        // Créer un nouveau package dans la base de données
        const newPackage = await LearningPackage.create({
            title_package,
            description_package,
            category,
            target_audience,
            difficulty_level,
            finished_package,
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

app.put('/api/editpackageFinished/:id', async (req, res) => {

    console.log('Received PUT request with body:', req.body);
    const id = parseInt(req.params.id);
    const newfinished = req.body.newfinishedvalue;
    try {
        const [rowsUpdated, [updatePackage]] = await LearningPackage.update(
            { finished_package: newfinished},
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

app.delete('/api/deletePackage/:id_package', async (req, res) => {

    const id_package = req.params.id_package;
    try {
        console.log("on veut delete le package " ,id_package);
        const result = await LearningPackage.destroy({
            where: { id_package: id_package }
        });
        if (result === 0) {
            res.status(404).json({ success: false, message: 'No matching rows found for deletion.' });
            return;
        }

        res.status(200).json({ success: true, message: 'Package deleted successfully', result });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
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
        const count = await LearningFact.count({
            where: {
                id_package: idpackage,
            }
        });
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

//Récupération des facts marquées comme Easy
app.get('/api/geteasyfact/:idpackage', async (req, res) => {
    const idpackage = parseInt(req.params.idpackage);
    try {
        const count = await LearningFact.count({
            where: {
                id_package: idpackage,
                state_fact: 'Easy',
            }
        });
        res.status(200).json({ count });
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

app.delete('/api/deleteFact/:id_fact', async (req, res) => {
    const id_fact = req.params.id_fact;
    try {
        const result = await LearningFact.destroy({
            where: { id_fact: id_fact }
        });

        res.status(201).json({ success: true, message: 'Fact deleted successfully', result });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.put('/api/setStateFact/:id_fact', async (req, res) => {
    const id_fact = req.params.id_fact;
    const state = req.body.state_fact;
    const next_date = req.body.next_date;
    try {
        const [rowsUpdated] = await LearningFact.update(
            { state_fact: state, next_date: next_date },
            {
                returning: false, // Ne retourne pas les lignes mises à jour
                where: { id_fact: id_fact },
            }
        );

        if (rowsUpdated === 0) {
            res.status(404).json({ error: 'Fact not found' });
            return;
        }
        const updatedFact = await LearningFact.findOne({ where: { id_fact: id_fact } });
        res.status(200).send(updatedFact);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/getactualfactfrompackage/:idpackage', async (req, res) => {
    const idpackage = parseInt(req.params.idpackage);
    const currentDate = new Date(); // Date actuelle
    try {
        const facts = await LearningFact.findAll({
            where: {
                id_package: idpackage,
                next_date: {
                    [Op.lt]: currentDate // Vérifie que next_date est supérieure à la date actuelle
                }
            },
        });
        res.status(200).send(facts);
    } catch (error) {
        console.error('Erreur lors de la récupération des facts :', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/getNbactualfactfrompackage/:idpackage', async (req, res) => {
    const idpackage = parseInt(req.params.idpackage);
    const currentDate = new Date(); // Date actuelle
    try {
        const count = await LearningFact.count({
            where: {
                id_package: idpackage,
                next_date: {
                    [Op.lt]: currentDate // Vérifie que next_date est supérieure à la date actuelle
                }
            }
        });
        res.status(200).json({ count });
    } catch (error) {
        console.error('Erreur lors de la récupération des facts :', error);
        res.status(500).send('Internal Server Error');
    }
});


//--------------------- GET ALL -------------------------
app.get('/api/getAllPackages', async (req, res) => {
    try {
        const packs = await LearningFact.findAll();
        res.status(200).send(packs);
    } catch (error) {
        console.error('Erreur lors de la récupération des packages :', error);
        res.status(500).send('Internal Server Error');
    }
});
