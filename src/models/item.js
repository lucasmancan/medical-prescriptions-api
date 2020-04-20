module.exports = (sequelize, Sequelize) => {

    const Item = sequelize.define('items', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        frequency: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        frequencyType: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
        underscored: false,
        freezeTableName: true,
        tableName: 'items',
    });

    Item.associate = function (models) {
        Item.belongsTo(models.prescriptions);
        Item.belongsTo(models.drugs);

    };

    return Item;
}