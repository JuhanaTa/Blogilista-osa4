const blog = require("../models/blog")

const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item
      }
    const likes = blogs.map(blog => blog.likes)
    return likes.reduce(reducer, 0)

}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  console.log(likes)

  var max = likes.reduce(function(a, b) {
    return Math.max(a, b);
  });

  console.log(max)
  const id = likes.indexOf(max)
  console.log(id)
  console.log(blogs[id])
  return blogs[id]
}
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }