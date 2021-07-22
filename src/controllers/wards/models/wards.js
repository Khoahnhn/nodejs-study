'use strict'

const Sequelize = require('sequelize');
const db = require('../../base/mysql/mysql');
const {Districts} = require('../../districts/models/districts');

const Wards = db.sequelize.define('ward', {
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
    district_code: {
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

Wards.belongsTo(Districts, {onDelete: 'CASCADE', foreignKey: "district_code", targetKey: "code"});

module.exports = {
    Wards
}