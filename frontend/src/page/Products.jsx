import React, { useEffect, useState } from 'react';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import { getProduct, removeErrors } from '../features/products/productSlice';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function Products() {
  const { loading, error, products, resultsPerPage, productCount } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams()
  const pageFromURL = parseInt(searchParams.get("page"), 10) || 1
  const [currentPage, setCurrentPage] = useState(pageFromURL);
  const navigate = useNavigate();
  const [keyword] = useState('');
  // const [currentPage] = useState(1);
  const [category, setCategory] = useState('');
  const categories = ['Electronics', 'Clothing', 'Books', 'Grocery', 'Makeup', 'Heels', 'Shoes', 'Laptop', 'Glass', 'Shirts'];

  useEffect(() => {
    dispatch(getProduct({ keyword, page: currentPage, category }));
  }, [dispatch, keyword, currentPage, category]);

  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: 'top-center', autoClose: 3000 });
      dispatch(removeErrors())
    }
  }, [dispatch, error])
  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      const newSearchParams = new URLSearchParams(location.search);
      if (page === 1) {
        newSearchParams.delete('page')
      } else {
        newSearchParams.set('page', page)
      }
      navigate(`?${newSearchParams.toString()}`)
    }
  }

  return (
    <>
      {loading ? (<Loader />) : (
        <>
          <PageTitle title="All Products" />
          <Navbar />

          <div className="flex p-6 gap-6">
            {/* Category Side */}
            <div className="w-1/5">
              <h3 className="text-xl font-semibold mb-4">Categories</h3>
              <div className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`p-2 rounded text-left ${category === cat ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-blue-100 text-gray-800"}`}
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Cards */}
            <div className="w-4/5">
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <div className="flex flex-wrap gap-6">
                  {products.length === 0 ? (
                    <div className="w-full text-center py-10">
                      <h2 className="text-2xl font-bold text-gray-500">No Product Found</h2>
                    </div>
                  ) : (
                    products.map((product) => (
                      <Product key={product._id} product={product} />
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </>)}
      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default Products;
