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
        Prescription.hasOne(models.users);

    };

    return Prescription;
}