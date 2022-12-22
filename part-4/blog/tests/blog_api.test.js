const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/list_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

test('blogs are returned as json', async () => {
   await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  },100000)

  afterAll(() => {
    mongoose.connection.close()
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(3)
  })

  test('id instead of _id',async () => {

    const response = await api.get('/api/blogs')
    const ids = response.body.map((blog) => blog.id)

    for (const id of ids) {
        expect(id).toBeDefined()
    }
  })

  // test('a valid blog can be added', async () => {
  //   const newBlog = {
        // title: 'test blog',
        // author: 'idk',
        // url: 'test.com',
  //       likes: 69

  //   }

  //   await api
  //     .post('/api/blogs')
  //     .send(newBlog)
  //     .expect(200)
  //     .expect('Content-Type', /application\/json/)

  //     const blogsAtEnd = await helper.blogsInDb()
  //     expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  // })

// test('a blog without likes defaults to 0 likes', async () => {

//   const blogNoLikes = {
//         title: 'test blog',
//         author: 'idk',
//         url: 'test.com',
//   }

//   await api
//     .post('/api/blogs')
//     .send(blogNoLikes)
//     .expect(200)

//   const blogsInDb = await helper.blogsInDb()

//   const likes = blogsInDb.map((blog) => blog.likes)
//   expect(likes).toContain(0)

// })

test('a blog without likes defaults to 0 likes', async () => {

  const blogNoLikes = {

        url: 'test.com',
  }
 await api
    .post('/api/blogs')
    .send(blogNoLikes)
    .expect(400)
})
test('deleting a blog', async () => {

  const blogTodelete = {

        title: 'delete me',
        author: 'delete',
        url: 'delete.com',
  }
 await api
  .post('/api/blogs')
  .send(blogTodelete)
  .expect(200)


    const blogsatEnd = await helper.blogsInDb()
    const blogToDelete = blogsatEnd[3]

   await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
})
test('add a like to a blog', async () => {
  const blogsInDb = await helper.blogsInDb()
  const firstblog = blogsInDb[0]
  const beforeLikes = firstblog.likes
  firstblog.likes = beforeLikes + 1

 await api.put(`/api/blogs/${firstblog.id}`).send(firstblog).expect(200)

  const updateBlogsInDb = await helper.blogsInDb()
  const firstblogUpdated = updateBlogsInDb[0]

  expect(firstblogUpdated.likes).toBe(beforeLikes + 1)
})


