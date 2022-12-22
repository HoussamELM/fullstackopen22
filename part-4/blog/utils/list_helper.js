const Blog = require('../models/blog')
const dummy = (blogs) => {

  return blogs? 1 : 0

}
const initialBlogs = [
  {
  title: 'Harry potter',
  author: 'idk',
  url: 'HP.com',
  likes: 34,
  id: '638fb28c13097f4c2e40d611'
  },
  {
  title: 'layla wa di2b',
  author: 'idk',
  url: 'ld.com',
  likes: 34,
  id: '638fb29b13097f4c2e40d613'
  },
  {
  title: 'arissala',
  author: 'idk',
  url: 'arissala.com',
  likes: 43,
  id: '638fb9d0ffc61794117f2adf'
  }
]

module.exports = {
  dummy
}

const totalLikes = (blogs) => {

  if (!Array.isArray(blogs) || !blogs.length) return 0

  if (blogs.length === 1) return blogs[0].likes

  return blogs.reduce((total, blog) => total + blog.likes, 0)

}

const mostLikes = (blogs) => {

  let x = Math.max(...blogs.map(o => o.likes))

  let desiredObject = blogs.find(element => element.likes === x)

  return desiredObject

}

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
}

module.exports = {
  totalLikes,
  dummy,
  mostLikes,
  blogsInDb,
  initialBlogs
}