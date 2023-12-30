import { Sequelize, Model, DataTypes } from 'sequelize';

// Configuration de Sequelize
const sequelize = new Sequelize('LearningFactDb', 'learningdbUser', 'projeta4', {
    host: 'localhost',
    dialect: 'postgres'
});

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
        next_date: {
            type: DataTypes.DATE,
        },
        state_fact: {
            type: DataTypes.STRING(50),
        }
    },
    {
        sequelize,
        modelName: 'LearningFact',
        tableName: 'learning_fact',
        schema: 'projeta4',
        timestamps: true,
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
    finished_package: boolean;
}
class LearningPackage extends Model<ILearningPackageAttributes> {
    public id_package!: number;
    public title_package!: string;
    public description_package!: string;
    public category!: string;
    public target_audience!: string;
    public difficulty_level!: string;
    public finished_package!: boolean;
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
        },
        finished_package: {
            type: DataTypes.BOOLEAN,
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
    onDelete: 'CASCADE',
});
LearningPackage.hasMany(LearningFact, { foreignKey: 'id_package' });

//Synchroniser les modèles avec la base de données
async function syncModels() {
    try {
        await sequelize.authenticate();
        console.log('Connecté à la base de données');

        // Synchronise chaque modèle avec la base de données
        await LearningFact.sync();
        await LearningPackage.sync();

        console.log('Synchronisation réussie');
    } catch (error) {
        console.error('Erreur lors de la synchronisation avec la base de données:', error);
    }
}
syncModels();

export { LearningFact, LearningPackage };