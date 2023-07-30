class CategoryController {
    constructor({ createCategoryUsecase, updateCategoryUsecase, deleteCategoryUsecase }) {
        this.createCategoryUsecase = createCategoryUsecase
        this.updateCategoryUsecase = updateCategoryUsecase
        this.deleteCategoryUsecase = deleteCategoryUsecase
    }

    createCategory = async (req, res) => {

        await this.createCategoryUsecase.execute(req.body).then((category) => res.status(201).json(category)).catch((error) => {
            if (error.statusCode) {
                res.status(error.statusCode).json({
                    message: error.description
                })
            }
            else return res.status(500).json({ message: 'Internal Server Error' })
        });
    }

    updateCategory = async (req, res) => {
        const categoryID = req.params.id

        await this.updateCategoryUsecase.execute(categoryID, { ...req.body }).then((category) => res.status(200).json(category)).catch((error) => {
            if (error.statusCode) {
                res.status(error.statusCode).json({
                    message: error.description
                })
            }
            else return res.status(500).json({ message: 'Internal Server Error' })
        })
    }

    deleteCategory = async (req, res) => {
        const categoryID = req.params.id

        await this.deleteCategoryUsecase.execute(categoryID).then((product) => res.status(200).json(product)).catch((error) => {
            if (error.statusCode) {
                res.status(error.statusCode).json({
                    message: error.description
                })
            }
            else return res.status(500).json({ message: 'Internal Server Error' })
        })
    }
}

module.exports = CategoryController
