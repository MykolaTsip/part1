const {Op} = require('sequelize')
const dayjs = require('dayjs')


const {oauthService} = require('../services')


module.exports = async () => {
    try {
    await  oauthService.deleteToken({
        created_at: {
            [Op.lte]: dayjs().subtract(3, "day").format("YYYY-MM-DD hh:mm:ss")
        }
    })
    }
    catch (e) {
        console.log(e)
    }
}
