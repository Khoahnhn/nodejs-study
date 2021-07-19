'use strict'

const axios = require('axios');

function showAllDivisions(req, res) {
    (async() => {
        try {
            const depth = req.query.depth;
            const url = depth ? `https://provinces.open-api.vn/api/?depth=${depth}` : `https://provinces.open-api.vn/api/`
            axios.get(url)
                .then((response) => {
                    res.status(200).json({
                        ok: true,
                        message: 'OK',
                        data: response.data
                    }) 
                })
        } catch (e) {
            res.status(500).json({
                ok: false,
                message: e.message
            })
        }
    })();
}

function listProvinces(req, res) {
    (async() => {
        try {
            const url = `https://provinces.open-api.vn/api/p/`;
            axios.get(url)
                .then((response) => {
                    res.status(200).json({
                        ok: true,
                        message: 'OK',
                        data: response.data
                    })
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

function getProvinces(req, res) {
    (async() => {
        try {
            const code = req.params.code;
            const depth = req.query.depth;
            const url = depth ? `https://provinces.open-api.vn/api/p/${code}/?depth=${depth}` : `https://provinces.open-api.vn/api/p/${code}`;
            axios.get(url)
                .then((response) => {
                   res.status(200).json({
                      ok: true,
                      message: 'OK',
                      data: response.data 
                   }); 
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
    showAllDivisions,
    listProvinces,
    searchProvinces,
    getProvinces
}