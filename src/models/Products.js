const products = [];

class Products {
  constructor(name, price, description, image) {
    this.title = name;
    this.price = price;
    // this.description = description;
    // this.image = image;
  }
  save() {
    products.push(this);
  }

  static list() {
    return products;
  }
}

module.exports = Products;
