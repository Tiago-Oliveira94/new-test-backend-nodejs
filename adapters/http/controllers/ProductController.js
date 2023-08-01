class ProductController {
    constructor({ createProductUsecase, updateProductUsecase, deleteProductUsecase }) {
        this.createProductUsecase = createProductUsecase
        this.updateProductUsecase = updateProductUsecase
        this.deleteProductUsecase = deleteProductUsecase
    }

    createProduct = async (req, res) => {
        await this.createProductUsecase.execute(req.body).then(() => res.status(201).json({ message: 'Product successfully created!' })).catch((error) => {
            if (error.statusCode) {
                res.status(error.statusCode).json({
                    message: error.description
                })
            }
            else return res.status(500).json({ message: 'Internal Server Error' })
        })
    }

    updateProduct = async (req, res) => {
        const productID = req.params.id

        await this.updateProductUsecase.execute(productID, { ...req.body }).then(() => res.status(200).json({ message: 'Product successfully updated!' })).catch((error) => {
            if (error.statusCode) {
                res.status(error.statusCode).json({
                    message: error.description
                })
            }
            else return res.status(500).json({ message: 'Internal Server Error' })
        })
    }

    deleteProduct = async (req, res) => {
        const productID = req.params.id

        await this.deleteProductUsecase.execute(productID).then(() => res.status(200).json({ message: 'Product successfully deleted!' })).catch((error) => {
            if (error.statusCode) {
                res.status(error.statusCode).json({
                    message: error.description
                })
            }
            else return res.status(500).json({ message: 'Internal Server Error' })
        })
    }
}

module.exports = ProductController
