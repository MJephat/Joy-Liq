import Product from "../models/product.model.js"
import cloudinary from "../lib/cloudinary.js";
import { redis } from "../lib/redis.js";

export const getAllProducts = async (req,res) =>{
    try {
        const products = await Product.find({}); 
        res.json({products});

        
    } catch (error) {
        console.log("Error in getAllProducts controller", error.message);
        res.status(500).json({message: "Server error", error:error.message})
        
    }
}

export const getFeaturedProducts = async (req, res) => {
    try {
        let featuredProducts = await redis.get("featured_products");
        if(featuredProducts) {
            return res.json(JSON.parse(featuredProducts));

        }
        // if not in redis, fetch from mongoDB
        // .lean() is gonna returns a plain javascript object instead of a mongodb document
        // which is good for performance
        featuredProducts = await Product.find({isFeatured:true}).lean();

        if(!featuredProducts){
            return res.status(404).json({message:"No featured products found"});

        }
        await redis.set("featured_products", JSON.stringify(featuredProducts));

        res.json(featuredProducts);
        
    } catch (error) {
        console.log("Error in getFeaturedProducts conroller", error.message);
        res.status(500).json({message: "Server Error", error:error.message})
        
    }
}


export const createProduct = async (req, res) => {
    try {
        const {name, description, price, image, category} = req.body;
        let cloudinaryResponse = null;
        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, {folder:"products"})
            
        }
         const product = await Product.create({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url: "",
            category
         })
         res.status(201).json(product)
    } catch (error) {
        console.log("Error in create product controller")
        res.status(500).json({message:"Server Error", error:error.message});
        
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).json({message: "Product not Found"});
            
        }
        if (product.image) {
            // Get image id
            const publicId = product.image.split("/").pop().split(".")[0];
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`)
                console.log("Deleted Image from Cloudinary")
            } catch (error) {
                console.log("Error deleting image from cloudinary", error)
                
            }
            
        }
        await Product.findByIdAndDelete(req.params.id)

        res.json({message:"Product Deleted Successfully"})
    } catch (error) {
        console.log("Error in deleteProduct controller", error.message)
        res.status(500).json({message: "Server error", error: error.message})
        
    }
} 

export const getRecommendedProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $sample:{size:3}
            },
            {
                $project:{
                    _id:1,
                    name:1,
                    description:1,
                    image:1,
                    price:1
                }
            }
        ])
        res.json(products)
    } catch (error) {
        console.log("Error in getRecommendedProducts controller", error.message)
        res.status(500).json({message: "Server error", error: error.message})
        
    }
}

export const getProductsByCategory = async (req, res) => {
    const { category } = req.params;

    try {
        // Ensure category is case-insensitive
        const products = await Product.find({ category: { $regex: new RegExp(`^${category}$`, "i") } });

        if (!products.length) {
            return res.status(404).json({ message: "No products found for this category" });
        }

        res.json({ products }); // Return as an object for consistency

    } catch (error) {
        console.error("Error in getProductsByCategory controller:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const toogleFeaturedProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            product.isFeatured = !product.isFeatured;
            const updatedProduct = await product.save();
            await updatedFeaturedProductsCache();
            res.json(updatedProduct)
            
        } else{
            res.status(404).json({message: "Product not found"});
        }
        
    } catch (error) {
        console.log("Error in toogleFeaturedProduct controller", error.message)
        res.status(500).json({message: "Server error", error: error.message})
        
    }
}
 async function updatedFeaturedProductsCache(){
    try {
        const featuredProducts = await Product.find({isFeatured: true}).lean();
        await redis.set("featured_products", JSON.stringify(featuredProducts));
        
    } catch (error) {
        console.log("Error in update cache function", error)
        
    }
 }