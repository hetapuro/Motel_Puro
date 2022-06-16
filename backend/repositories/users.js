const User = require('../models/user')
const bcrypt = require("bcrypt")

const getUserByEmail = async (email) => {
    const user = await User.findOne({ email: email }).exec()
    return user
  }

const createUser = async (email, password) => {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const new_user = new User({
        email,
        password: passwordHash
      })
    
    const saved_user = await new_user.save()
    return saved_user

}

const getUserById = async (id) => {
    const user = await User.findById(id).exec()
    return user
}

module.exports = {
    getUserByEmail,
    createUser,
    getUserById
}