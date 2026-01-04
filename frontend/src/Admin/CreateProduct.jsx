import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, removeErrors, removeSuccess } from '../features/admin/adminSlice';
import { toast } from 'react-toastify';

function CreateProduct() {
  const { success, loading, error } = useSelector(state => state.admin);
  const dispatch = useDispatch();
  const [name, setname] = useState('');
  const [price, setprice] = useState('');
  const [description, setdescription] = useState('');
  const [category, setcategory] = useState('');
  const [stock, setstock] = useState('');
  const [size, setSize] = useState([]);
  const [images, setimages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const categories = ['Electronics', 'Clothing', 'Books', 'Grocery', 'Makeup', 'Heels', 'Shoes', 'Laptop', 'Glass', 'Shirts'];
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setimages([]);        // clear existing images
    setImagePreviews([]); // clear previews

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.readyState === 2) {
          setImagePreviews((prev) => [...prev, reader.result]);
          setimages((prev) => [...prev, file]); // Save actual file
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSizeChange = (selectedSize) => {
    setSize((prev) =>
      prev.includes(selectedSize)
        ? prev.filter((s) => s !== selectedSize)
        : [...prev, selectedSize]
    );
  };

  const createProductSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set('title', name);
    myForm.set('price', price);
    myForm.set('description', description);
    myForm.set('category', category);
    myForm.set('stock', stock);



    size.forEach(s => {
      myForm.append('size', s);
    });

    images.forEach((img) => {
      myForm.append('images', img); // key name must match backend
      // console.log()
    });

    dispatch(createProduct(myForm))

    // Send myForm to backend or dispatch Redux action
    console.log('Submitting product:', {
      name, price, description, category, stock, size, images
    });


  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: 'top-center', autoClose: 3000 });
      dispatch(removeErrors());
    }
    if (success) {
      toast.success("Product created successfully.", { position: 'top-center', autoClose: 3000 });
      dispatch(removeSuccess());
      setname("");
      setprice("");
      setdescription("");
      setcategory("");
      setimages([]);
      setImagePreviews([]);
      setstock("");
      setSize([]);
    }
  }, [dispatch, error, success])

  return (
    <>
      <Navbar />
      <PageTitle title={'Create Products'} />

      <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Product</h2>

        <form
          className="space-y-4"
          encType="multipart/form-data"
          onSubmit={createProductSubmit}
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

          <div className="space-y-2">
            <p className="font-semibold text-gray-700">Select Sizes</p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => handleSizeChange(item)}
                  className={`px-4 py-2 rounded border transition-colors ${size.includes(item)
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
            {size.length === 0 && <p className="text-red-500 text-sm">Please select at least one size.</p>}
          </div>

          <input
            name="stock"
            type="number"
            placeholder="Enter Product Stock"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={stock}
            onChange={(e) => setstock(e.target.value)}
            required
          />

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            name="images"
            className="w-full px-4 py-1 border border-black rounded-lg file:mr-4 file:py-1 file:px-4 file:bg-gray-100 file:rounded-lg file:text-sm file:border-black transition"
          />

          <div className="flex flex-wrap gap-4 mt-4">
            {imagePreviews.map((img, index) => (
              <img
                src={img}
                alt={`Preview ${index + 1}`}
                key={index}
                className="w-28 h-28 object-cover rounded-lg border"
              />
            ))}
          </div>

          <Button
            type="submit"
            className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg border-none"
            disabled={loading}
            Icon={FaPlus}
            text={loading ? 'Creating Product...' : "Create"}
          />
        </form>
      </div>

      <Footer />
    </>
  );
}

export default CreateProduct;
