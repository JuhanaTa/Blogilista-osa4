const listHelper = require('../utils/list_helper')

describe('total likes', () => {
    let listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      
    ]
    let emptyList = []

    let biggerList = [
      {
        
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        
      },
      {
        
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 10,
        
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
      }
    ]
    
    const favorite = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    }
  
    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
    test('of empty list is zero', () => {
        listWithOneBlog = []
        const result = listHelper.totalLikes(emptyList)
        expect(result).toBe(0)
      })
      test('of a bigger list is calculated right', () => {
      
        const result = listHelper.totalLikes(biggerList)
        expect(result).toBe(27)
      })

      test('Favorite blog', () => {
        const result = listHelper.favoriteBlog(biggerList)
        expect(result).toEqual(favorite)
      })
  })