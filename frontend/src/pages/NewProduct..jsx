import React, { useState } from "react";
import { IoCloudUpload } from "react-icons/io5";
import { ImageToBeUploaded } from "../utility/imageToBeUploaded"; // Ensure this function is correctly imported
import toast from "react-hot-toast";

export default function NewProduct() {
    const [data, setData] = useState({
        name: "",
        category: "",
        image: "",
        price: "",
        description: ""
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value // Correctly set the key dynamically
        }));
    };

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const uploadedImage = await ImageToBeUploaded(file);
            console.log(uploadedImage);

            // Update the `image` field in the state after uploading
            setData((prev) => ({
                ...prev,
                image: uploadedImage
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);
    
        try {
            let fetchData = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/uploadProduct`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
    
            const dataRes = await fetchData.json();
            toast(dataRes.message);  // Show the message returned by the server
    
            // Handle success and alert from the server
            if (dataRes.alert) {
                toast.success("New Product Created");
            } else {
                toast.error("Product Already Exists");
            }
        } catch (error) {
            // Handle network or unexpected errors
            console.error("Error:", error);
            toast.error("Something went wrong. Please try again later.");
        }
    };    

    return (
        <>
            <div className="p-4">
                <form
                    className="m-auto flex flex-col max-w-md shadow-sm shadow-slate-600 p-3 gap-2 bg-white"
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="bg-slate-300"
                        value={data.name}
                        onChange={handleOnChange}
                    />

                    <label htmlFor="category" className="bg-white">Category</label>
                    <select
                        className="bg-slate-300 p-1"
                        name="category"
                        value={data.category}
                        onChange={handleOnChange}
                    >
                        <option value="">Select Category</option> {/* Default option */}
                        <option value="Fruits">Fruits</option>
                        <option value="Vegetable">Vegetable</option>
                        <option value="IceCream">IceCream</option>
                        <option value="Cake">Cake</option>
                    </select>

                    <label htmlFor="image" className="my-1">Image
                        <div className="h-60 w-full cursor-pointer bg-slate-300 my-3 rounded-sm flex items-center justify-center">
                            {
                                data.image ? <img src={data.image} alt="" /> : <IoCloudUpload className="text-8xl" />
                            }
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                name="image"
                                onChange={uploadImage}
                                className="hidden"
                            />
                        </div>
                    </label>

                    <div className="my-2 flex flex-col ">
                        <label htmlFor="price">Price</label>
                        <input
                            type="text"
                            name="price"
                            className="bg-slate-300"
                            value={data.price}
                            onChange={handleOnChange}
                        />
                    </div>

                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        rows={3}
                        className="bg-slate-300 p-1 my-1 resize-none"
                        value={data.description}
                        onChange={handleOnChange}
                    ></textarea>

                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600 text-white font-medium shadow-md shadow-slate-300"
                    >
                        Save
                    </button>
                </form>
            </div>
        </>
    );
}
