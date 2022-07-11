const usersRepository = require("../repositories/users")

const getUserByEmail = async (email) => {
    const user = await usersRepository.getUserByEmail(email)
    return(user)
}

const createUser = async (email, password, isAdmin=false) => {
    const new_user = await usersRepository.createUser(email, password, isAdmin)
    return(new_user)
}

const getUserById = async (email) => {
    const user = await usersRepository.getUserById(email)
    return user
}

const giveAdminRights = async(user_id) => {
    const new_user = await usersRepository.setAdminRights(user_id, true)
    return new_user
}

const takeAdminRights = async(user_id) => {
    const new_user = await usersRepository.setAdminRights(user_id, false)
    return new_user
}

const deleteUser = async (user_id) => {
    await usersRepository.deleteUser(user_id)
}

module.exports = {
    getUserByEmail,
    createUser,
    getUserById,
    giveAdminRights,
    takeAdminRights,
    deleteUser
}