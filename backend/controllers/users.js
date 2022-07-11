const usersRouter = require("express").Router()
const usersService = require("../services/users")

usersRouter.post('/', async (request, response) => {
    if(req.user.isAdmin){
        const new_user = await usersService.createUser(request.body.email, request.body.password)
        response.json(new_user)
    }
    else{
        return response(401).json({ error: 'user needs to be admin'})
    }
}) 

usersRouter.delete(':/id', async(req, res) => {
    if(req.user.isAdmin){
        await usersService.deleteUser(req.params.id)
        res.status(204).end()
    }
    else{
        return response(401).json({ error: 'user needs to be admin'})
    }
})

usersRouter.get('/:email', async (request, response) => {
    const user = await usersService.getUserByEmail(request.params.email)
    response.json(user)
})

usersRouter.get("/current/user", async (req, res, next) => {
    res.send(req.user)
  })

usersRouter.put("/:id/give_admin_rights", async (req, res, next) => {
    if(req.user.isAdmin){
        const new_user = await usersService.giveAdminRights(req.params.id)
        res.json(new_user)
    }
    else{
        return response(401).json({ error: 'user needs to be admin'})
    }
})

usersRouter.put("/:id/take_admin_rights", async (req, res, next) => {
    if(req.user.isAdmin){
        const new_user = await usersService.takeAdminRights(req.params.id)
        res.json(new_user)
    }
    else{
        return response(401).json({ error: 'user needs to be admin'})
    }
})

module.exports = usersRouter