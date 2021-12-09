const faker = require("faker");
const fs = require("fs")
// set
faker.locale = "vi"
// random data
const randomCategoryList = (n) => {
    if(n<=0) return [];

    const categoryList = [];
    // loop add push category
    Array.from(new Array(n)).forEach(() => {
        const category = {
            id: faker.datatype.uuid(),
            name: faker.commerce.department(),
            createdAt : Date.now(),
            updateAt: Date.now(),
        };

        categoryList.push(category)
    })

    return categoryList;
}
const randomProductList = (categoryList , numberOfProducts) => {
    if(numberOfProducts <= 0) return [];

    const productList = [];

    for(const category of categoryList) {
        Array.from(new Array(numberOfProducts)).forEach(() => {
            const product = {
                categoryId: category.id,
                id : faker.datatype.uuid(),
                name: faker.commerce.productName(),
                color: faker.commerce.color(),
                price: Number(faker.commerce.price()),
                description: faker.commerce.productDescription(),
                createdAt: new Date(),
                updatedAt: new Date(),
                thumbnailUrl: faker.image.imageUrl(444,444),
            }
            productList.push(product)
        })
    }
    return productList;
}
;(()=>{ 
    // random data
    const categoryList = randomCategoryList(4)
    const productList = randomProductList(categoryList, 5)
   //prepair db object
    const db = {
        categories: categoryList,
        products: productList,
        profile: {
            name: "Po",
        },
    };

    // write db object to db.json
    fs.writeFile('db.json', JSON.stringify(db), () => {
        console.log('random success')
    });
})()