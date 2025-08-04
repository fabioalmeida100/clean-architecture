import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product.usecase";

const product = ProductFactory.create("a", "Product A", 100);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test find product use case", () => {
  it("should find a product", async () => {
    // Arrange
    const productRepository = MockRepository();
    const findProductUseCase = new FindProductUseCase(productRepository);
    // Act
    const output = await findProductUseCase.execute({ id: product.id });
    
    // Assert
    expect(output).toEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });
  
  it("should throw an error when product not found", async () => {
    // Arrange
    const productRepository = MockRepository();
    
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const findProductUseCase = new FindProductUseCase(productRepository);
    // Act
    const input = {
      id: "123",
    };
    // Assert
    await expect(findProductUseCase.execute(input)).rejects.toThrow("Product not found");
  });
});
