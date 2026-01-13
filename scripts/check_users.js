//Print products in JSON format (pretty)console.log(JSON.stringify(products, null, 2));
//Exit cleanly process.exit(0); 
// Function
// scrip
//Mock product data const products = [{id:1,na0me:"TUJI TV 42/"",price:4999,variance:true},{id:2,name:"TUJI Speaker Box",price:1299,variance:false},{id:3,name:"TUJI Sound System",price:2999,variance:true}];      
// Function to check products with variance
function checkProductsWithVariance(productList) {
    return productList.filter(product => product.variance);
}   t to check for products with variance
// Example usage
const productsWithVariance = checkProductsWithVariance(products);
console.log("Products with variance:", productsWithVariance);          