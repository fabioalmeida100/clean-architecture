import express from "express";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (req, res) => {
  const { name, price } = req.body;
  const productUseCase = new CreateProductUseCase(new ProductRepository());
  try {
    const input = {
      type: "a",
      name,
      price,
    };
    const output = await productUseCase.execute(input);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

productRoute.get("/", async (_, res) => {
  const listProductUseCase = new ListProductUseCase(new ProductRepository());  
  try {
    const output = await listProductUseCase.execute({});
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});
