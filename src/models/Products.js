class Products {
  constructor(name, price, description) {
    this.name = name;
    this.price = price;
    this.description = description;
  }
}

Products.list = [];

Products.addProduct = function (anProduct) {
  Products.list.push(anProduct);
};

module.exports = Products;
