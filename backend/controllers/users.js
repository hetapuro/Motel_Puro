const usersRouter = require("express").Router()
const usersService = require("../services/users")

usersRouter.post('/', async (request, response) => {
    const new_user = await usersService.createUser(request.body.email, request.body.password)
    response.json(new_user)
}) 

usersRouter.get('/:email', async (request, response) => {
    console.log("LOL")
    const user = await usersService.getUserByEmail(request.params.email)
    response.json(user)
})

usersRouter.get("/current/user", async (req, res, next) => {
    res.send(req.user)
  })

module.exports = usersRouter