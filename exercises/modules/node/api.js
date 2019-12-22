const {users, posts} = require('./data');
getUserById = (id, cb) => {
  // simulate API call
  setTimeout(() => {
    const user = users.find(user => user.id === id)
    cb(user)
  }, 150)
}

getPostsForUser = (userId, cb) => {
  // simulate API call
  setTimeout(() => {
    const found_posts = posts.filter(post => post.createdBy === userId)
    cb(found_posts)
  }, 150)
}

module.exports = {getUserById, getPostsForUser};