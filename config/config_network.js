const ip = require("ip");

module.exports = {
    "hostname": ip.address(),
    "domain": "",
    "port": process.env.port || "3000",
}