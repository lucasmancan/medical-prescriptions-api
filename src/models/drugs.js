module.exports = (sequelize, Sequelize) => {

    const Drug = sequelize.define('drugs', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            field: 'name',
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
            field: 'description',
            type: Sequelize.STRING,
            allowNull: false
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        timestamps: true,
        underscored: false,
        freezeTableName: true,
        tableName: 'drugs',
    });


    return Drug;
}