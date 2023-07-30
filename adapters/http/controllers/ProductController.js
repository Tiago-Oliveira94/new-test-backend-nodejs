const CreateProductUseCase = require('../../../application/use_cases/CreateProductUseCase');
const UpdateProductUseCase = require('../../../application/use_cases/UpdateProductUseCase');
const DeleteProductUseCase = require('../../../application/use_cases/DeleteProductUseCase');
const CategoryRepository = require('../../../infrastructure/repositories/CategoryRepository');
const ProductRepository = require('../../../infrastructure/repositories/ProductRepository')

const productRepository = new ProductRepository()
const categoryRepository = new CategoryRepository()

const ProductController = () => ({
    createProduct: async (req, res) => {
        const createProduct = new CreateProductUseCase(productRepository, categoryRepository)
        await createProduct.execute(req.body).then((product) => res.status(201).json(product)).catch((error) => {
            if (error.statusCode) {
                res.status(error.statusCode).json({
                    message: error.description
                })
            }
            else return res.status(500).json({ message: 'Internal Server Error' })
        })
    },

    updateProduct: async (req, res) => {
        const productID = req.params.id
        const updateProduct = new UpdateProductUseCase(productRepository, categoryRepository)

        await updateProduct.execute(productID, { ...req.body }).then((product) => res.status(200).json(product)).catch((error) => {
            if (error.statusCode) {
                res.status(error.statusCode).json({
                    message: error.description
                })
            }
            else return res.status(500).json({ message: 'Internal Server Error' })
        })
    },

    deleteProduct: async (req, res) => {
        const productID = req.params.id
        const deleteProduct = new DeleteProductUseCase(productRepository)

        await deleteProduct.execute(productID).then((product) => res.status(200).json(product)).catch((error) => {
            if (error.statusCode) {
                res.status(error.statusCode).json({
                    message: error.description
                })
            }
            else return res.status(500).json({ message: 'Internal Server Error' })
        })
    }
})

module.exports = ProductController