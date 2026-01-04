import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct, removeErrors, resetUpdate } from '../features/admin/adminSlice';
import { getProductDetails } from '../features/products/productSlice';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateProduct() {
    const { loading, error: updateError, isUpdated } = useSelector(state => state.admin);
    const { product, error: productError } = useSelector(state => state.product);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const [name, setname] = useState('');
    const [price, setprice] = useState('');
    const [description, setdescription] = useState('');
    const [category, setcategory] = useState('');
    const [stock, setstock] = useState('');
    const [size, setSize] = useState('');
    const [images, setimages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    const categories = ['Electronics', 'Clothing', 'Books', 'Grocery', 'Makeup', 'Heels', 'Shoes', 'Laptop', 'Glass', 'Shirts'];
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

    useEffect(() => {
        if (!product || product._id !== id) {
            dispatch(getProductDetails(id));
        } else {
            setname(product.title);
            setprice(product.price);
            setdescription(product.description);
            setcategory(product.category);
            setstock(product.stock);
            setSize(product.size);
            setOldImages(product.image || []);
        }

        if (productError) {
            toast.error(productError, { position: 'top-center', autoClose: 3000 });
        }

        if (updateError) {
            toast.error(updateError, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors());
        }

        if (isUpdated) {
            toast.success("Product Updated Successfully", { position: 'top-center', autoClose: 3000 });
            dispatch(resetUpdate());
            navigate('/admin/products');
        }

    }, [dispatch, product, id, isUpdated, updateError, productError, navigate]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        setimages([]);
        setImagePreviews([]);
        setOldImages([]);    // clear old images if new ones are selected

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onloadend = () => {
                if (reader.readyState === 2) {
                    setImagePreviews((prev) => [...prev, reader.result]);
                    setimages((prev) => [...prev, file]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    const updateProductSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set('title', name);
        myForm.set('price', price);
        myForm.set('description', description);
        myForm.set('category', category);
        myForm.set('stock', stock);
        myForm.set('size', size);

        images.forEach((img) => {
            myForm.append('images', img);
        });

        dispatch(updateProduct({ id, productData: myForm }));
    };

    return (
        <>
            <Navbar />
            <PageTitle title={'Update Product'} />

            <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-6">
                <h2 className="text-2xl font-bold mb-6 text-center">Update Product</h2>

                <form
                    className="space-y-4"
                    encType="multipart/form-data"
                    onSubmit={updateProductSubmit}
                >
                    <input
                        name="product"
                        type="text"
                        placeholder="Product Name"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        required
                    />

                    <input
                        name="price"
                        type="number"
                        placeholder="Product Price"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={price}
                        onChange={(e) => setprice(e.target.value)}
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Product Description"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={description}
                        onChange={(e) => setdescription(e.target.value)}
                        required
                    />

                    <select
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={category}
                        onChange={(e) => setcategory(e.target.value)}
                        required
                    >
                        <option value="">Choose Category</option>
                        {categories.map((item) => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <select
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        required
                    >
                        <option value="">Choose Size</option>
                        {sizes.map((item) => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <input
                        name="stock"
                        type="number"
                        placeholder="Enter Product Stock"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={stock}
                        onChange={(e) => setstock(e.target.value)}
                        required
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Images</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            name="images"
                            className="w-full px-4 py-1 border border-black rounded-lg file:mr-4 file:py-1 file:px-4 file:bg-gray-100 file:rounded-lg file:text-sm file:border-black transition"
                        />
                    </div>

                    <div className="flex flex-wrap gap-4 mt-4">
                        {/* show old images */}
                        {oldImages && oldImages.map((img, index) => (
                            <img
                                key={`old-${index}`}
                                src={img.url}
                                alt="Old Product"
                                className="w-28 h-28 object-cover rounded-lg border border-gray-300 opacity-70"
                            />
                        ))}

                        {/* show new image previews */}
                        {imagePreviews.map((img, index) => (
                            <img
                                src={img}
                                alt={`New Preview ${index + 1}`}
                                key={`new-${index}`}
                                className="w-28 h-28 object-cover rounded-lg border border-green-500"
                            />
                        ))}
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                        text={loading ? 'Updating Product...' : "Update Product"}
                    />
                </form>
            </div>

            <Footer />
        </>
    );
}

export default UpdateProduct;
