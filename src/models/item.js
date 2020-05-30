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
        detail: {
            type: Sequelize.STRING,
            allowNull: true
        },
        drugId: {
            type: Sequelize.INTEGER,
            references: {
               model: 'drugs', // 'persons' refers to table name
               key: 'id', // 'id' refers to column name in persons table
            }
         },
         prescriptionId: {
             type: Sequelize.INTEGER,
             references: {
                model: 'prescriptions', // 'persons' refers to table name
                key: 'id', // 'id' refers to column name in persons table
             }
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