const Blog = require('../models/blog')
const User = require('../models/user')

const testBlogs = [
  {
    title: 'My first blog',
    author: 'Juhana',
    url: 'blog@blog.com',
    likes: 12
  },
  {
    title: 'My first blog',
    author: 'Aasi',
    url: 'blog@blog.com',
    likes: 8
  }
]


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () =>{
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  testBlogs, blogsInDb, usersInDb
}