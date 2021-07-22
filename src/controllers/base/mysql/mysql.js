const debug = require('debug')('debug:mysql');
const Sequelize = require('sequelize');
const convert = require('../convert');
const {mysql} = require('../../../../config/config');

let host = process.env.MYSQL_HOST || mysql.host;
let port = process.env.MYSQL_PORT || mysql.port;
let user = process.env.MYSQL_USER || mysql.user;
let password = process.env.MYSQL_PASSWORD === "" ? "" :  (process.env.MYSQL_DATABASE || mysql.password);
let database = process.env.MYSQL_DATABASE || mysql.database;
let connectionLimit = mysql.connectionLimit;


const sequelize = new Sequelize(database, user, password, {
    host: host,
    port: port,
    logging: false,
    dialect: 'mysql',
    timezone: '+07:00',
    pool: {
        max: connectionLimit,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        freezeTableName: true,
        timestamps: false,
        underscored: false
    },
    dialectOptions: {
        typeCast: function (field, next) {
            if (field.type === 'DATETIME' || field.type === 'DATE') {
                return convert.convertOutputDate(field.string());
            }
            return next();
        }
    }
})

function authenticate() {
    let connection = setInterval(() => {
        authenticate();
    }, 1000 * 60 * 1);
    sequelize.authenticate()
        .then((conn) => {
            clearInterval(connection);
            console.log(`Database connected: ` + `${host}:${port}`);
        })
        .catch(e => {
            console.log(`ERROR: NOT CONNECTED TO DATABASE | ${e}`);
        });
    sequelize.sync()
        .then((res) => {
            console.log(`Đã đồng bộ model.`);
        })
        .catch(err => {
            debug('ERROR: Chưa đồng bộ models: ');
            debug(err);
        });
}

authenticate();

module.exports = {
    sequelize
}