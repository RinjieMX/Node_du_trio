import {Sequelize, Model, DataTypes } from 'sequelize';

// Configuration de Sequelize
const sequelize = new Sequelize('LearningFactDb', 'learningdbUser', 'projeta4', {
    host: 'localhost',
    dialect: 'postgres'
});

// Class User
class User extends Model {}
User.init({
    email_user: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    password_user: {
        type: DataTypes.STRING,
    },
    firstname_user: {
        type: DataTypes.STRING,
    },
    lastname_user: {
        type: DataTypes.STRING,
    },
}, { sequelize, modelName: 'user', schema: 'projeta4', timestamps: false });

//Class LearningFact
class LearningFact extends Model {}
LearningFact.init(
    {
        id_fact: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        recto: {
            type: DataTypes.STRING(500),
        },
        verso: {
            type: DataTypes.STRING(500),
        },
        id_package: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        modelName: 'LearningFact',
        tableName: 'learning_fact',
        schema: 'projeta4',
        timestamps: false,
    }
);

// Class LearningPackage
interface ILearningPackageAttributes {
    id_package?: number;
    title_package: string;
    description_package: string;
    category: string;
    target_audience: string;
    difficulty_level: string;
}
class LearningPackage extends Model<ILearningPackageAttributes> {
    public id_package!: number;
    public title_package!: string;
    public description_package!: string;
    public category!: string;
    public target_audience!: string;
    public difficulty_level!: string;
}
LearningPackage.init(
    {
        id_package: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        title_package: {
            type: DataTypes.STRING(50),
        },
        description_package: {
            type: DataTypes.STRING(200),
        },
        category: {
            type: DataTypes.STRING(50),
        },
        target_audience: {
            type: DataTypes.STRING(500),
        },
        difficulty_level: {
            type: DataTypes.STRING(50),
        }
    },
    {
        sequelize,
        modelName: 'LearningPackage',
        tableName: 'learning_package',
        schema: 'projeta4',
        timestamps: false,
    }
);

//Relations
LearningFact.belongsTo(LearningPackage, {
    foreignKey: 'id_package',
    targetKey: 'id_package',
});
LearningPackage.hasMany(LearningFact, { foreignKey: 'id_package' });

//Synchroniser les modèles avec la base de données
async function syncModels() {
    try {
        await sequelize.authenticate();
        console.log('Connecté à la base de données');

        // Synchronise chaque modèle avec la base de données
        await User.sync();
        await LearningFact.sync();
        await LearningPackage.sync();

        console.log('Synchronisation réussie');
    } catch (error) {
        console.error('Erreur lors de la synchronisation avec la base de données:', error);
    }
}
syncModels();

// Fonction pour insérer un utilisateur
async function insertUser(mail: string, password: string, firstname: string, lastname: string) {
    try {
        await sequelize.authenticate();
        console.log('Connecté à la base de données');

        const newUser = await User.create({
            email_user: mail,
            password_user: password,
            firstname_user: firstname,
            lastname_user: lastname
        });

        console.log('Utilisateur inséré:', newUser.toJSON());
    } catch (error) {
        console.error('Erreur lors de l\'insertion:', error);
    }
}

// Fonction pour récupérer des utilisateurs
async function getAllUsers() {
    try {
        await sequelize.authenticate();
        console.log('Connecté à la base de données');

        const users = await User.findAll();

        console.log('Nombre de users:', users.length);

        const usersText = users.map(user => JSON.stringify(user.toJSON())).join(', ');

        return `Utilisateurs récupérés: ${usersText}`;
    } catch (error) {
        console.error('Erreur lors de la récupération:', error);
        throw error;
    }
}

export { LearningFact, LearningPackage, User, insertUser, getAllUsers };