module.exports = (sequelize, Sequelize) => {

    const Prescription = sequelize.define('prescriptions', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        expiresAt: {
            type: Sequelize.DATE,            
            allowNull: false,
        },
        signature: {
            type: Sequelize.TEXT,            
        },
        userId: {
            type: Sequelize.INTEGER,
            references: {
               model: 'users', // 'persons' refers to table name
               key: 'id', // 'id' refers to column name in persons table
            }
         },
        customerId: {
            type: Sequelize.INTEGER,
            references: {
               model: 'customers', // 'persons' refers to table name
               key: 'id', // 'id' refers to column name in persons table
            }
         }
    }, {
        timestamps: true,
        underscored: false,
        freezeTableName: true,
        tableName: 'prescriptions',
    });

    Prescription.associate = function (models) {
        Prescription.hasMany(models.items);
        Prescription.belongsTo(models.customers);
        Prescription.belongsTo(models.users);

    };

    return Prescription;
}