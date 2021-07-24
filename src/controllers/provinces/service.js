'use strict'

const { Provinces } = require('./models/provinces');

// function ListProvinces() {
//     (async() => {
//         return await Provinces.findAll();
//     })();
// }

async function ListProvinces() {
    return await Provinces.findAll({
        attributes: {exclude: ['created_date']}
    });
}

async function getProvince(code) {
    return await Provinces.findOne({
        where: {
            code: code
        },
        attributes: {exclude: ['created_date']}
    });
}

module.exports = {
    ListProvinces,
    getProvince
}