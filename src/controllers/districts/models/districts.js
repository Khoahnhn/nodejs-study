'use strict'

const Sequelize = require('sequelize');
const db = require('../../base/mysql/mysql');
const {Provinces} = require('../../provinces/models/provinces');

const Districts = db.sequelize.define('district', {
    code: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    division_type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    code_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    province_code: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    population: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    created_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
});

Districts.belongsTo(Provinces, {onDelete: 'CASCADE', foreignKey: "province_code", targetKey: "code"});

module.exports = {
    Districts
}