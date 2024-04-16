const shortenText = (text) => {
  return text.split(" ").slice(0, 3).join(" ");
};

const searchProducts = (products, search) => {
  if (!search) return products;
  const searchedProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search)
  );

  return searchedProducts;
};

const filterProducts = (products, filter) => {
  if (!filter) return products;
  const filteredProducts = products.filter((p) => p.category === filter);
  return filteredProducts;
};

const createQueryObject = (currentQuery, newQuery) => {
  if (newQuery.category === "all") {
    const { category, ...rest } = currentQuery; //rest is every key value in currentQury except category
    return rest;
  }
  if (newQuery.search === "") {
    const { search, ...rest } = currentQuery;
    return rest;
  }
  return { ...currentQuery, ...newQuery }; //if there is a two search for ex, it will update the last search in currentQury wirh search in newQuery
};

const getInitialQuery = (searchParams) => {
  const query = {};
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  if (category) query.category = category;
  if (search) query.search = search;
  return query;
};

const sumPrice = (products) => {
  return products
    .reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
    .toFixed(2);
};
const sumQuantity = (products) => {
  return products.reduce((acc, curr) => acc + curr.quantity, 0);
};

const productQuantity = (state, id) => {
  const index = state.selecteditems.findIndex((item) => item.id === id);
  if (index === -1) {
    return 0;
  } else {
    return state.selecteditems[index].quantity;
  }
};

export {
  shortenText,
  searchProducts,
  filterProducts,
  createQueryObject,
  getInitialQuery,
  sumPrice,
  sumQuantity,
  productQuantity,
};
