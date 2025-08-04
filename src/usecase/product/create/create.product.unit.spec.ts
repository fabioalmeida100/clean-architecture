import CreateProductUseCase from "./create.product.usecase";


const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
}

describe("Unit Test create product use case", () => {
    it("should create a product", async () => {
        // Arrange
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);
        const input = {
            type: "a",
            name: "Product 1",
            price: 100,
        };
        
        // Act
        const output = await createProductUseCase.execute(input);
        
        // Assert
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });
    });
});
