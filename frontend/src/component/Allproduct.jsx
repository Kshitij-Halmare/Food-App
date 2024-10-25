import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CardFeatures from "./CardFeatures";
import FilterProduct from "./FilterProduct";

export default function AllProduct() {
    const ProductData = useSelector((state) => state.product.products);
    const [filterBy, setFilterBy] = useState(""); // For category filtering
    const [dataFilter, setDataFilter] = useState([]); // To store filtered products

    // Get unique categories for filtering
    const categoryList = [...new Set(ProductData.map((product) => product.category))];

    // Filter products based on selected category
    useEffect(() => {
        if (filterBy) {
            const filteredProducts = ProductData.filter(
                (product) => product.category.toLowerCase() === filterBy.toLowerCase()
            );
            setDataFilter(filteredProducts);
        } else {
            // If no filter is selected, show all products
            setDataFilter(ProductData);
        }
    }, [filterBy, ProductData]);

    const loadingArray = new Array(4).fill(null); // Placeholder loading array for 4 items

    return (
        <div className="px-6 py-8">
            {/* Filter Section */}
            <div className="hover:scale-105 flex gap-4 items-center justify-center overflow-x-auto scroll-hidden"> {/* Add scroll-hidden class */}
                {categoryList.length > 0 ? (
                    categoryList.map((category, index) => (
                        <FilterProduct
                            key={index}
                            category={category}
                            setFilterBy={setFilterBy} // Pass the function
                        />
                    ))
                ) : (
                    loadingArray.map((_, index) => (
                        <FilterProduct key={index} category="loading" />
                    ))
                )}
            </div>

            {/* Products Display Section */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {dataFilter.length > 0 ? (
                    dataFilter.map((product) => (
                        <CardFeatures
                            key={product._id}
                            id={product._id}    // Pass the id prop
                            name={product.name}
                            image={product.image}
                            price={product.price}
                            category={product.category}
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">
                        No products available for this category.
                    </p>
                )}
            </div>
        </div>
    );
}
