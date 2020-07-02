module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('Account', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,

        }, 
        jwtVersion: {
            type: DataTypes.INTEGER,
                allowNull:false,
                default:0,
        },
    
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