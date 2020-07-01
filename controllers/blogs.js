const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
  .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
    
  })

  
  blogsRouter.post('/', async (request, response) => {
    const items = request.body
    


    if(items.likes === undefined){
      items.likes = 0
    }
    if(items.title === undefined || items.url === undefined){
      response.status(400).json({error: 'title or url missing or both'})
    }
    else{
      console.log("request token: "+request.tokenExtractor)
      const decodedToken = jwt.verify(request.tokenExtractor, process.env.SECRET)  
      if (!request.tokenExtractor || !decodedToken.id) {    
        return response.status(401).json({ error: 'token missing or invalid' })  
      }  
      const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: items.title,
      author: items.author,
      url: items.url,
      likes: items.likes,
      user: user._id
    })
  
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)  
    await user.save()

    response.json(savedBlog.toJSON())
  }
  })

  blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  })

  blogsRouter.put('/:id', async (request, response) => {
    const items = request.body

    const moddedBlog = {
      title: items.title,
      author: items.author,
      url: items.url,
      likes: items.likes
    }

    await Blog.findByIdAndUpdate(request.params.id, moddedBlog, {new: true})
    .then(modifiedBlog => {
      response.json(modifiedBlog.toJSON())
    })
    

  })

module.exports = blogsRouter