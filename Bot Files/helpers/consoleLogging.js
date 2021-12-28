const chalk = import('chalk')
module.exports = client => {
    /*
    * Log a message in the console but make it look better
    * @param {String} service The server this message has come from
    * @param {String} message The message to log
    * @param {String} color The hex of the color of the message
    */
    client.log = async (service, message, color) => {
        console.log(`[${chalk.bold(service)}] ${chalk.hex(color)(message)}`)
    }

}