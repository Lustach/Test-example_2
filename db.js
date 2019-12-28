module.exports = () => {
    const data = { users: [] }
    // Create 1000 users
    for (let i = 0; i < 10; i++) {
      data.users.push({ id: i,
         name: `Статья №${i}`,
         src: `https://picsum.photos/id/${i}/200/300`,
         favourite:false,
        })
    }
    return data
  }