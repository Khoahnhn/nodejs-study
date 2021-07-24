'use strict';
const axios = require('axios');
const redis = require("redis");
const MOCK_API_URL = "https://jsonplaceholder.typicode.com/users/";
const dummyUser = require('./models/users');
const xlsx = require('xlsx');
const path = require('path');

const redisClient = redis.createClient(6379);

async function getUser(req, res) {
    try{
        const email = req.query.email;
        axios.get(`${MOCK_API_URL}?email=${email}`)
            .then(function (response) {
        // axios.get(MOCK_API_URL)
        //     .then(response => {
                const users = response.data;

                console.log("User successfully retrieved from the API");

                res.status(200).json(users);
            });
    }catch (error){
        res.status(500).json({ error: err.message });
    }
}

async function getUserUsingRedis(req, res) {
    try {
        const email = req.query.email;
        redisClient.get(email, (err, data) => {
            if (err) {
                console.error(err);
                throw err;
            }

            if (data) {
                console.log("User successfully retrieved from Redis");

                res.status(200).send(JSON.parse(data));
            } else {
                axios.get(`${MOCK_API_URL}?email=${email}`).then(function (response) {
                    const users = response.data;
                    redisClient.setex(email, 600, JSON.stringify(users));

                    console.log("User successfully retrieved from the API");

                    res.status(200).send(users);
                });
            }
        });
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}

function exportExcel(req, res) {
    (async() => {
       try {
           let users = dummyUser;
           const data = users.map(user => {
               return [user.id, user.name, user.age];
           });
           const filePath = './outputFiles/excel-from-js.xlsx';

           const workSheetColumnName = [
               "ID",
               "Name",
               "Age"
           ]

           const workSheetName = 'Users';

           const workBook = xlsx.utils.book_new();
           const workSheetData = [
               workSheetColumnName,
               ... data
           ];
           const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
           xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
           xlsx.writeFile(workBook, path.resolve(filePath));

           return res.json(200).json({
                ok: true
           });
       } catch (e) {
           res.status(500).json({
               ok: false,
               message: e.message
           })
       }
    })()
}

module.exports = {
    getUser,
    getUserUsingRedis,
    exportExcel
}
