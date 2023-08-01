class BuildCatalogUseCase {
    constructor({ storageRepository, categoryRepository, productRepository }) {
        this.storageRepository = storageRepository
        this.categoryRepository = categoryRepository
        this.productRepository = productRepository
    }

    async execute(message) {
        const { ownerID } = JSON.parse(message.Body)

        let params = {
            owner: ownerID,
            catalog: []
        }

        return this.categoryRepository.findByProperty({ ownerID: ownerID }).then(async (categories) => {
            if (categories.length) {
                const result = categories.forEach(async (category) => {
                    await this.buildCatalog(category, params).then(async () => {
                        await this.storageRepository.publish(params)
                    })
                })
                return result
            }
            else {
                await this.storageRepository.publish(params)
            }

        })
    }

    async buildCatalog(category, params) {
        await this.productRepository.findByProperty({ category: category._id }).then(async (products) => {
            const builtProducts = products.map((product) => {
                return { title: product.title, description: product.description, price: product.price }
            })

            params.catalog.push({
                category_title: category.title,
                category_description: category.description,
                items: builtProducts
            })
        })
    }
}

module.exports = BuildCatalogUseCase