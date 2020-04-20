module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define('users', {
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
        password: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        document: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        email: {
            type: Sequelize.STRING(40),
            validate: {
                isEmail: true,
                notEmpty: true
            },
            allowNull: false
        },
        active: {
            type: Sequelize.BOOLEAN
        
        },
        loggedAt: {
            field: 'logged_at',
            type: Sequelize.DATE
        }
    }, {
        timestamps: true,
        underscored: false,
        freezeTableName: true,
        tableName: 'users',
    });

    // User.associate = function (models) {
    //     User.hasMany(models.phones);
    //     User.belongsTo(models.addresses);
    //     User.belongsTo(models.profiles);
    // };

    return User;
}