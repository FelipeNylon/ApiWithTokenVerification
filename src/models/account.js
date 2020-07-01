module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('Account', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,

        }
    
    })

    Account.associate = (models) => {
        Account.hasMany(models.Link, {foreignKey: 'accountId'});
    }

    Account.prototype.toJSON= function () {
        const value = {...this.get() }
        delete value.password;
        return value;
    }

    return Account;
}