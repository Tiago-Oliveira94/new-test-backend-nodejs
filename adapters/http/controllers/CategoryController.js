const CreateCategoryUseCase = require('../../../application/use_cases/CreateCategoryUseCase');
const CategoryRepository = require('../../../infrastructure/repositories/CategoryRepository')

const categoryRepository = new CategoryRepository()

const CategoryController = () => ({
    createCategory: async (req, res) => {
        const createCategory = new CreateCategoryUseCase(categoryRepository)
        await createCategory.execute(req.body).then((category) => res.status(201).json(category)).catch((error) => res.status(error.statusCode).json({
            message: error.description
        }));
    }
})

module.exports = CategoryController