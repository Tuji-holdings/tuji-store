import express from "express";
import  fs from "fs";
const app = express();
app.use(express.json());
   app.get("/api/check-products",(req,re) =>{
    //Mock product data
    const products = JSON.parse(fs.readFileSync("data/products.json","utf-8"));
    const issues = [];
    const seenSKUs = new Set();
    products.forEach((p, index) => {
        // Check for missing S!p.name) issues.push(`product${index} missing name`);
        if (p.price == null || p.price < 0) issues.push(`product${index} invalid price`);
        if (!p.sku) issues.push(`product${index} missing SKU`);
        else if (seenSKUs.has(p.sku)) issues.push(`product${index} duplicate SKU`);
        else seenSKUs.add(p.sku);
    }); 0
