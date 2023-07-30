const CreateProductUseCase = require('../../../application/use_cases/CreateProductUseCase');
const CategoryRepository = require('../../../infrastructure/repositories/CategoryRepository');
const ProductRepository = require('../../../infrastructure/repositories/ProductRepository')

const productRepository = new ProductRepository()
const categoryRepository = new CategoryRepository()

const ProductController = () => ({
    createProduct: async (req, res) => {
        const createProduct = new CreateProductUseCase(productRepository, categoryRepository)
        await createProduct.execute(req.body).then((product) => res.status(201).json(product)).catch((error) => res.status(error.statusCode).json({
            message: error.description
        })
        );
    }
})

module.exports = ProductController