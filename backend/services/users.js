const usersRepository = require("../repositories/users")

const getUserByEmail = async (email) => {
    const user = await usersRepository.getUserByEmail(email)
    return(user)
}

const createUser = async (email, password) => {
    const new_user = await usersRepository.createUser(email, password)
    return(new_user)
}

const getUserById = async (email) => {
    const user = await usersRepository.getUserById(email)
    return user
}

module.exports = {
    getUserByEmail,
    createUser,
    getUserById
}