const bcrypt = require("bcrypt")
const passport = require("passport")
const authRouter = require("express").Router()
const usersService = require("../services/users")
const config = require("../utils/config")




authRouter.post(
  "/email",
  passport.authenticate("local", {
    failureRedirect: "/",
    failureMessage: true,
  }),
  (req, res) => {
    // Successful authentication, redirect home.
    console.log("email success", req.user)
    res.redirect("/api/auth/success")
  }
)

authRouter.post("/email/register", async (req, res) => {
  const { email, password } = req.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  user = await usersService.getUserByEmail(email, usersRepository)
  console.log(user)
  if (user) {
    if (user.password) {
      res.send("User has been registered with email already")
    } else {
      await usersService.setUserPassword(user.id, password)
      res.send("We found user with your email and added password to that")
    }
  } else {
    const url = `http://${config.SERVER_HOSTNAME}/api/auth/email/verify?email=${email}&password=${passwordHash}`
    console.log(url)
    const template = await mailService.initiateVerificationMail(email, url)
    await mailService.sendAutomaticMail(template)
    res.send(`Verification email has been sent to ${email}`)
  }
})

authRouter.post("/email/reset_password", async (req, res) => {
  const { email, password } = req.body
  const user = await usersService.getUserByEmail(email, usersRepository)
  if (!user) {
    res.status(400).send("No user with that email")
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const url = `http://${config.SERVER_HOSTNAME}/api/users/${user.id}/reset_password?passwordHash=${passwordHash}`
    const template = await mailService.initiatePasswordResetMail(email, url)
    await mailService.sendAutomaticMail(template)
    res.send(`Palautus sähköposti on lähetetty osoitteeseen ${email}`)
  }
})

authRouter.get("/email/verify", async (req, res) => {
  await usersService.createUser(req.query.email, req.query.password)
  res.redirect("/api/auth/success")
})

authRouter.get("/success", (req, res) => {
  console.log("successfully logged in", req.user)
  res.redirect("/")
})

authRouter.get("/logout", (req, res) => {
  console.log("===============> logout")
  req.logout()
  res.redirect("/")
})

authRouter.get("/notauth", (req, res) => {
  res.send("not authenticated")
})

module.exports = authRouter
