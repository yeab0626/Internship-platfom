const installService = require("../services/install.service");


async function install(req, res) {

    const result = await installService.installDatabase();

    if (result.success) {
        return res.status(200).json(result);
        } 

    return res.status(500).json(result);
}

module.exports = {
    install,
};