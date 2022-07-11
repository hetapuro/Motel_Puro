const User = require('../models/user')
const bcrypt = require("bcrypt")

const getUserByEmail = async (email) => {
    const user = await User.findOne({ email: email }).exec()
    return user
  }

const createUser = async (email, password, isAdmin) => {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const new_user = new User({
        email,
        password: passwordHash,
        isAdmin
      })
    
    const saved_user = await new_user.save()
    return saved_user

}

const getUserById = async (id) => {
    const user = await User.findById(id).exec()
    return user
}

const setAdminRights = async (user_id, newIsAdmin) => {
  const new_user = await User.findByIdAndUpdate(user_id, { isAdmin: newIsAdmin })
  return new_user
}

const deleteUser = async (user_id) => {
  await User.findByIdAndDelete(user_id)
}

module.exports = {
    getUserByEmail,
    createUser,
    getUserById,
    setAdminRights
}