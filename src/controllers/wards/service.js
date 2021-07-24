'use strict'

const {Wards} = require('./models/wards');

async function listWardInDistrict(code) {
    return await Wards.findAll({
        where: {
            district_code: code,
        },
        attributes: {exclude: ['created_date']}
    })
}

async function listWards() {
    return await Wards.findAll({
        attributes: {exclude: ['created_date']}
    });
}

async function getWard(code) {
    return await Wards.findOne({
        where: {
            code: code
        },
        attributes: {exclude: ['created_date']}
    })
}

module.exports = {
    listWardInDistrict,
    listWards,
    getWard
}