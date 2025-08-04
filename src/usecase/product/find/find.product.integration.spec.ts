import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Test find product use case", () => {
    let sequelize: Sequelize;
    
    beforeEach(async () => {
        sequelize = new Sequelize({
          dialect: "sqlite",
          storage: ":memory:",
          logging: false,
          sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });
    
    it("should find a product", async () => {
        // Arrange
        const productRepository = new ProductRepository();
        const findProductUseCase = new FindProductUseCase(productRepository);
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);
        
        // Act
        const output = await findProductUseCase.execute({ id: product.id });
        
        // Assert
        expect(output).toEqual({
            id: product.id,
            name: product.name,
            price: product.price,
        });
    })
});
