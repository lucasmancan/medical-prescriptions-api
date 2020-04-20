module.exports = (sequelize, Sequelize) => {

    const Customer = sequelize.define('customers', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING,
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
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        timestamps: true,
        underscored: false,
        freezeTableName: true,
        tableName: 'customers',
    });

    Customer.associate = function (models) {
        Customer.hasMany(models.prescriptions);
    };

    return Customer;
}