import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("1", "Product 1", 100);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
}

describe("Unit Test update product use case", () => {
    it("should update a product", async () => {
        // Arrange
        const productRepository = MockRepository();
        const updateProductUseCase = new UpdateProductUseCase(productRepository);
        const input = {
            id: "1",
            name: "Product 1 Updated",
            price: 100.90,
        };

        // Act
        const output = await updateProductUseCase.execute(input);

        // Assert
        expect(output).toEqual(input);
    });
});
