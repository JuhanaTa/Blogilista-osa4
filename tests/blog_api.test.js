const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./blog_test')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const { response } = require('express')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.testBlogs)
})


test('there are right amount of blogs and they are JSON format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
      console.log(response.body)
      console.log(helper.testBlogs)
      expect(response.body).toHaveLength(helper.testBlogs.length)
  })

  test('HTTP POST test', async () => {
    const blog = {
        title: 'test blog',
        author: 'tester',
        url: 'tester@test.com',
        likes: 15
    }

    await api
    .post('/api/blogs')
    .send(blog)
    .expect(200)

    const blogsAfterAdd = await helper.blogsInDb()
    console.log(blogsAfterAdd)
    console.log(helper.testBlogs)

    expect(blogsAfterAdd).toHaveLength(helper.testBlogs.length + 1)
  })

  test('likes without value added', async () =>{
    const blog = {
        title: 'test blog',
        author: 'tester',
        url: 'tester@test.com',
        
    }
    await api
    .post('/api/blogs')
    .send(blog)
    .expect(200)

    const blogsAfterAdd = await helper.blogsInDb()
    const likes = blogsAfterAdd.map(blog => blog.likes)
    console.log(likes)

    const nonLikedBlog = {
        title: 'test blog',
        author: 'tester',
        url: 'tester@test.com',
        likes: 0,
        id: blogsAfterAdd[blogsAfterAdd.length - 1].id
    }
    
    expect(blogsAfterAdd[blogsAfterAdd.length - 1]).toEqual(nonLikedBlog)
  })

  test('blogs without title and url', async () =>{

    const blog = {
        author: 'tester',
        likes: 90
        
    }
    await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.testBlogs.length)
  })

  test('blog deletion', async () => {

    const blogs = await helper.blogsInDb()

    const blogToDelete = blogs[0]

    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.testBlogs.length - 1)

    
  })


  afterAll(() => {
    mongoose.connection.close()
  }) 