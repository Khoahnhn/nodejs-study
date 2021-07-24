'use strict'

const axios = require('axios');
const service = require('./service');
const serviceDistrict = require('../districts/service');
const serviceWard = require('../wards/service');

// function showAllDivisions(req, res) {
//     (async() => {
//         try {
//             const depth = req.query.depth;
//             const url = depth ? `https://provinces.open-api.vn/api/?depth=${depth}` : `https://provinces.open-api.vn/api/`
//             axios.get(url)
//                 .then((response) => {
//                     res.status(200).json({
//                         ok: true,
//                         message: 'OK',
//                         data: response.data
//                     })
//                 })
//         } catch (e) {
//             res.status(500).json({
//                 ok: false,
//                 message: e.message
//             })
//         }
//     })();
// }

function showAllDivisions(req, res) {
    (async() => {
        try {
            const depth = req.query.depth ?? 1;
            let provinces = await service.ListProvinces();
            let districts = [];
            let wards = [];

            switch (parseInt(depth)) {
                case 1:
                    provinces.map(province => {
                        province.dataValues.districts = [];
                    })

                    return res.status(200).json({
                        ok: true,
                        message: 'OK',
                        data: provinces
                    })
                    break;
                case 2:
                    // provinces.map(async (province) => {
                    //     districts = await serviceDistrict.listAllDistrictsInProvince(province.dataValues.code);
                    //     province.dataValues.districts = districts;
                    // })

                    for(const province of provinces) {
                        districts = await serviceDistrict.listAllDistrictsInProvince(province.dataValues.code);
                        province.dataValues.districts = districts;

                        for(const district of districts) {
                            district.dataValues.wards = [];
                        }
                    }

                    return res.status(200).json({
                        ok: true,
                        message: 'OK',
                        data: provinces
                    })
                    break;
                case 3:
                    for(const province of provinces) {
                        districts = await serviceDistrict.listAllDistrictsInProvince(province.dataValues.code);
                        province.dataValues.districts = districts;

                        for(const district of districts) {
                            wards = await serviceWard.listWardInDistrict(district.dataValues.code);
                            district.dataValues.wards = wards;
                        }
                    }

                    return res.status(200).json({
                        ok: true,
                        message: 'OK',
                        data: provinces
                    })
                    break;
                default:
                    return res.status(422).json({
                        ok: false,
                        message: 'Invalid',
                        errorCode: '10000'
                    })
            }
        } catch (e) {
            res.status(500).json({
                ok: false,
                message: e.message
            })
        }
    })();
}

// function listProvinces(req, res) {
//     (async() => {
//         try {
//             const url = `https://provinces.open-api.vn/api/p/`;
//             axios.get(url)
//                 .then((response) => {
//                     res.status(200).json({
//                         ok: true,
//                         message: 'OK',
//                         data: response.data
//                     })
//                 })
//         } catch (e) {
//             res.status(500).json({
//                 ok: false,
//                 message: e.message
//             })
//         }
//     })();
// }

function listProvinces(req, res) {
    (async() => {
        try {
            let provinces = await service.ListProvinces();
            // provinces.forEach(province => province.dataValues.districts = []);
            let result = provinces.map(province => {
              province.dataValues.districts = [];
              return province;
            })

            return res.status(200).json({
                ok: true,
                message: 'OK',
                data: result
            })
        } catch (e) {
            res.status(500).json({
                ok: false,
                message: e.message
            })
        }
    })();
}

function searchProvinces(req, res) {
    (async() =>{
        try{
            const q = req.query.q;
            const url = `https://provinces.open-api.vn/api/p/search/?q=${q}`;
            axios.get(url)
                .then((response) => {
                    res.status(200).json({
                        ok: true,
                        message: 'OK',
                        data: response.data
                    });
                })
        } catch (e) {
            res.status(500).json({
                ok: false,
                message: e.message
            })
        }
    })();
}

// function getProvinces(req, res) {
//     (async() => {
//         try {
//             const code = req.params.code;
//             const depth = req.query.depth;
//             const url = depth ? `https://provinces.open-api.vn/api/p/${code}/?depth=${depth}` : `https://provinces.open-api.vn/api/p/${code}`;
//             axios.get(url)
//                 .then((response) => {
//                    res.status(200).json({
//                       ok: true,
//                       message: 'OK',
//                       data: response.data
//                    });
//                 });
//         } catch (e) {
//             res.status(500).json({
//                 ok: false,
//                 message: e.message
//             })
//         }
//     })();
// }

function getProvinces(req, res) {
    (async() => {
        try {
            const code = req.params.code;
            const depth = req.query.depth ?? 1;

            let districts = [];
            let wards = [];
            let province = await service.getProvince(code);
            if (!province) {
                return res.status(400).json({
                    ok: false,
                    message: 'Không tìm thấy data',
                    errorCode: '20001'
                })
            }

            switch (parseInt(depth)) {
                case 1:
                    province.dataValues.districts = [];

                    return res.status(200).json({
                        ok: true,
                        message: 'OK',
                        data: province
                    })
                    break;
                case 2:
                    districts = await serviceDistrict.listAllDistrictsInProvince(code);
                    province.dataValues.districts = districts;

                    districts.map(district => {
                        district.dataValues.wards = [];
                    })

                    return res.status(200).json({
                        ok: true,
                        message: 'OK',
                        data: province
                    })
                    break;
                case 3:
                    districts = await serviceDistrict.listAllDistrictsInProvince(code);
                    province.dataValues.districts = districts;

                    for(const district of districts) {
                        wards = await serviceWard.listWardInDistrict(district.dataValues.code);
                        district.dataValues.wards = wards;
                    }

                    return res.status(200).json({
                        ok: true,
                        message: 'OK',
                        data: province
                    })
                    break;
                default:
                    return res.status(422).json({
                        ok: false,
                        message: 'Invalid',
                        errorCode: '20000'
                    })
            }
        } catch (e) {
            res.status(500).json({
                ok: false,
                message: e.message
            })
        }
    })();
}

module.exports = {
    showAllDivisions,
    listProvinces,
    searchProvinces,
    getProvinces
}