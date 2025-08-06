import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const product1 = ProductFactory.create("a", "Product A", 100);
const product2 = ProductFactory.create("b", "Product B", 200);

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
        create: jest.fn(),
        update: jest.fn(),
    };
}

describe("Unit Test list product use case", () => {
    it("should list a product", async () => {
        // Arrange
        const productRepository = MockRepository();
        const listProductUseCase = new ListProductUseCase(productRepository);

        // Act
        const output = await listProductUseCase.execute({});

        // Assert
        expect(output).toEqual({
            products: [
                {
                    id: product1.id,
                    name: product1.name,
                    price: product1.price,
                },
                {
                    id: product2.id,
                    name: product2.name,
                    price: product2.price,
                },
            ],
        });
    });
});
