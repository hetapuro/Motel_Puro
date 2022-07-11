const nodemailer = require("nodemailer")
const mailConfig = require("../utils/mailConfig.js")
const createTemp = require("../services/templates/createTemp")
const adminTemp = require("../services/templates/adminTemp")
const deleteTemp = require("../services/templates/deleteTemp")

const sendMail = async (mailOptions) => {
  const transporter = await nodemailer.createTransport(mailConfig.config)
  const mail = await transporter.sendMail(mailOptions)
  return mail
}

const sendCreatedUserMail = async (email, password) => {
    const text = await createTemp.message({email, password})
    const mailOptions = {
        from: mailConfig.config.auth.user,
        to: email,
        subject: createTemp.subject,
        html: text
    }
    sendMail(mailOptions)
}

const sendDeleteUserMail = async (email) => {
    const text = await deleteTemp.message({email})
    const mailOptions = {
        from: mailConfig.config.auth.user,
        to: email,
        subject: createTemp.subject,
        html: text
    }
    sendMail(mailOptions)
}

const sendAdminRightMail = async (email, isAdmin) => {
    const text = await adminTemp.message({email, isAdmin})
    const mailOptions = {
        from: mailConfig.config.auth.user,
        to: email,
        subject: createTemp.subject,
        html: text
    }
    sendMail(mailOptions)
}




module.exports = {
    sendCreatedUserMail,
    sendDeleteUserMail,
    sendAdminRightMail
}