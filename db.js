module.exports = () => {
    const data = { users: [] }
    // Create 1000 users
    for (let i = 0; i < 1000; i++) {
      data.users.push({ id: i,
         name: `Статья №${i}`,
         src: `https://picsum.photos/id/${i}/200/300`
        })
    }
    return data
  }