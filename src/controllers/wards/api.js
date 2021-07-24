'use strict'

const service = require('./service');

function listWards(req, res) {
    (async() => {
        try{
            let wards = await service.listWards();
            if (!wards) {
                return res.status(400).json({
                   ok: false,
                   message: "Không tìm thấy dữ liệu",
                   errorCode: "30000"
                });
            }

            return res.status(200).json({
                ok: true,
                message: 'OK',
                data: wards
            })
        } catch (e) {
            res.status(500).json({
                ok: false,
                message: e.message
            })
        }
    })();
}

function getWard(req, res) {
    (async() => {
        try{
            let code = req.params.code;
            let ward = await service.getWard(code);
            if (!ward) {
                return res.status(400).json({
                   ok: false,
                   message: "Không tìm thấy dữ liệu",
                   errorCode: "40000"
                });
            }

            return res.status(200).json({
               ok: true,
               message: "OK",
               data: ward
            });

        } catch (e) {
            res.status(500).json({
                ok: false,
                message: e.message
            })
        }
    })();
}

module.exports = {
    listWards,
    getWard
}