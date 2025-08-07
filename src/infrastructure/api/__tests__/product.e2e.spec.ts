import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../product/repository/sequelize/product.model";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
    await createProduct("a", "Product 1", 100);
    await createProduct("a", "Product 2", 200);
  });

  afterAll(async () => {
    await ProductModel.destroy({ where: {} });
    await sequelize.close();
  });
  
  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product XPTO",
        price: 190.99,
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product XPTO");
    expect(response.body.price).toBe(190.99);
  });
  
  it("should list a product", async () => {
    const response = await request(app)
      .get("/product")
      .send();

    expect(response.status).toBe(200);
    expect(response.body.products.length).toBe(2);
    expect(response.body.products[0].name).toBe("Product 1");
    expect(response.body.products[0].price).toBe(100);
    expect(response.body.products[1].name).toBe("Product 2");
    expect(response.body.products[1].price).toBe(200);
  });   
});

const createProduct = async (type: string, name: string, price: number) => {
    const productRepository = new ProductRepository();
    const product = ProductFactory.create(type, name, price);
    await productRepository.create(product as Product);
    return product;
};
