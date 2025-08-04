import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe("Integration Test create product use case", () => {
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
    
    it("should create a product", async () => {
        // Arrange
        const productRepository = new ProductRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);
        const input = {
            type: "a",
            name: "Product 1",
            price: 100,
        };
        
        // Act
        const output = await createProductUseCase.execute(input);
        
        // Assert
        const product = await productRepository.find(output.id);
        expect(product.id).toBe(output.id);
        expect(product.name).toBe(input.name);
        expect(product.price).toBe(input.price);
    });
});
