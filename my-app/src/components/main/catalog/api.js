const delay = ms =>{
    return new Promise(resolve => setTimeout(() => resolve(),ms));
}

export async function fetchProducts() {
    await delay(2000);
    const response = await fetch('https://61f5558a62f1e300173c40f3.mockapi.io/products')
    const status =  response.status

    if (status === 200) return await response.json();
    const errorText = await response.text()

    throw new Error(errorText)

}

export async function fetchCategories() {
    const response = await fetch('https://61f5558a62f1e300173c40f3.mockapi.io/categories')
    const status = response.status

    if (status === 200) return await response.json();

    const errorText = await response.text()

    throw new Error(errorText)
}