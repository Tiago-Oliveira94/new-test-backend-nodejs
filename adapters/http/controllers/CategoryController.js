const CreateCategoryUseCase = require('../../../application/use_cases/CreateCategoryUseCase');
const UpdateCategoryUseCase = require('../../../application/use_cases/UpdateCategoryUseCase');
const DeleteCategoryUseCase = require('../../../application/use_cases/DeleteCategoryUseCase');
const CategoryRepository = require('../../../infrastructure/repositories/CategoryRepository');
const ProductRepository = require('../../../infrastructure/repositories/ProductRepository');

const categoryRepository = new CategoryRepository()
const productRepository = new ProductRepository()

const CategoryController = () => ({
    createCategory: async (req, res) => {
        const createCategory = new CreateCategoryUseCase(categoryRepository)

        await createCategory.execute(req.body).then((category) => res.status(201).json(category)).catch((error) => {
            if (error.statusCode) {
                res.status(error.statusCode).json({
                    message: error.description
                })
            }
            else return res.status(500).json({ message: 'Internal Server Error' })
        });
    },

    updateCategory: async (req, res) => {
        const categoryID = req.params.id
        const updateCategory = new UpdateCategoryUseCase(categoryRepository)

        await updateCategory.execute(categoryID, { ...req.body }).then((category) => res.status(200).json(category)).catch((error) => {
            if (error.statusCode) {
                res.status(error.statusCode).json({
                    message: error.description
                })
            }
            else return res.status(500).json({ message: 'Internal Server Error' })
        })
    },

    deleteCategory: async (req, res) => {
        const categoryID = req.params.id
        const deleteProduct = new DeleteCategoryUseCase(categoryRepository, productRepository)

        await deleteProduct.execute(categoryID).then((product) => res.status(200).json(product)).catch((error) => {
            if (error.statusCode) {
                res.status(error.statusCode).json({
                    message: error.description
                })
            }
            else return res.status(500).json({ message: 'Internal Server Error' })
        })
    }

})

module.exports = CategoryController