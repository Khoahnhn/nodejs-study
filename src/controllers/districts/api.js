'use strict'

const service = require('./service');
const serviceWard = require('../wards/service');

function listDistricts(req, res) {
    (async() => {
        try{
            let districts = await service.listDistricts();
            if (!districts) {
                return res.status(400).json({
                    ok: false,
                    message: 'Không tìm thấy data',
                    errorCode: '30001'
                })
            }

            districts.map(district => {
                district.dataValues.wards = [];
            })

            return res.status(200).json({
                ok: true,
                message: 'OK',
                data: districts
            })
        }catch (e) {
            res.status(500).json({
                ok: false,
                message: e.message
            })
        }
    })();
}

function getDistrict(req, res) {
    (async() => {
        try{
            let code = req.params.code;
            let depth = req.query.depth ?? 1;

            let wards = [];
            let district = await service.getDistrict(code);

            switch (parseInt(depth)){
                case 1:
                    district.dataValues.wards = [];

                    return res.status(200).json({
                        ok: true,
                        message: 'OK',
                        data: district
                    })
                    break;
                case 2:
                    wards = await serviceWard.listWardInDistrict(district.dataValues.code);
                    district.dataValues.wards = wards;

                    return res.status(200).json({
                        ok: true,
                        message: 'OK',
                        data: district
                    })
                    break;
                default:
                    return res.status(422).json({
                        ok: false,
                        message: 'Invalid',
                        errorCode: '30000'
                    })
            }
        }catch (e) {
            res.status(500).json({
                ok: false,
                message: e.message
            })
        }
    })();
}

module.exports = {
    listDistricts,
    getDistrict
}