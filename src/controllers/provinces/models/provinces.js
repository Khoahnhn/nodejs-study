'use strict'

const Sequelize = require('sequelize');
const db = require('../../base/mysql/mysql');

const Provinces = db.sequelize.define('provinces', {
    code: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    division_type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    code_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone_code: {
        type: Sequelize.NUMBER,
        allowNull: false,
        unique: true
    },
    zip_code: {
        type: Sequelize.NUMBER,
        allowNull: false,
        unique: true
    },
    population: {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    created_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
});

module.exports = {
    Provinces
}