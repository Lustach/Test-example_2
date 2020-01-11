module.exports = () => {
  const data = {
    articles: [],
    favourite: [],
  };
  // Create 1000 users
  for (let i = 1; i <= 20; i++) {
    data.articles.push({
      id: i,
      name: `Статья №${i}`,
      src: `https://picsum.photos/id/${i}/200/300`,
      favourite: false,
      body:
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas dui id ornare arcu. Laoreet id donec ultrices tincidunt arcu non sodales neque. In cursus turpis massa tincidunt dui ut ornare lectus. Suscipit adipiscing bibendum est ultricies. Leo vel orci porta non pulvinar neque. Lectus sit amet est placerat in. Netus et malesuada fames ac. Purus in massa tempor nec feugiat nisl pretium fusce. Et malesuada fames ac turpis egestas sed tempus urna. Neque volutpat ac tincidunt vitae. Lobortis mattis aliquam faucibus purus in massa tempor nec feugiat.",
      comments: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas dui id ornare arcu.`,
    });
  }
  return data;
};
