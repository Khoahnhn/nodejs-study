'use strict'

const {Districts} = require('./models/districts');

async function listAllDistrictsInProvince(code) {
    return await Districts.findAll({
        where: {
            province_code: code,
        },
        attributes: {exclude: ['created_date']}
    })
}

async function listDistricts() {
    return await Districts.findAll({
        attributes: {exclude: ['created_date']}
    });
}

async function getDistrict(code) {
    return await Districts.findOne({
        where: {
            code: code
        },
        attributes: {exclude: ['created_date']}
    });
}

module.exports = {
    listAllDistrictsInProvince,
    listDistricts,
    getDistrict
}

