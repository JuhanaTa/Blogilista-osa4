const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.post('/', async (request, response) =>{
    const items = request.body

    const saltRounds = 10
    if (items.password.length < 3) {
        return response.status(400).json({
            error: 'too short password'
        })
    }
    const passwordHash = await bcrypt.hash(items.password, saltRounds)
     
    const user = new User({
        username: items.username,
        name: items.name,
        passwordHash,
    })
    console.log(user)
    const savedUser = await user.save()
    console.log(savedUser)
    response.json(savedUser)

})

usersRouter.get('/', async (request,response) => {
    const users = await User    
    .find({}).populate('blogs', { url: 1, title: 1, author: 1, likes: 1})

    response.json(users.map(user => user.toJSON()))
})

module.exports = usersRouter