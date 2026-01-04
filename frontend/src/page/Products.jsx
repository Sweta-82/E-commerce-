import React, { useEffect, useState } from 'react';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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
    <div className="flex flex-col min-h-screen bg-white text-[#121212]">
      <PageTitle title="All Products" />
      <Navbar />

      {loading ? (<Loader />) : (
        <div className="flex-grow max-w-[1400px] mx-auto w-full px-4 md:px-8 py-10">

          {/* Header */}
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight">Our Collection</h1>
            <p className="text-gray-500 mt-2">Discover our curated selection of premium goods.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
            {/* Category Side (Sticky on Desktop) */}
            <div className="w-full md:w-1/5 md:sticky md:top-24 h-fit">
              <h3 className="text-lg font-bold uppercase tracking-widest border-b border-black pb-3 mb-6">Categories</h3>

              {/* Category List - Scrolls horizontal on mobile, vertical list on desktop */}
              <div className="flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-visible no-scrollbar pb-2 md:pb-0">
                <button
                  className={`whitespace-nowrap text-left text-sm font-medium transition-all duration-200 ${category === '' ? "text-black font-bold pl-2 border-l-2 border-black" : "text-gray-500 hover:text-black"}`}
                  onClick={() => setCategory('')}
                >
                  All Items
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`whitespace-nowrap text-left text-sm font-medium transition-all duration-200 ${category === cat ? "text-black font-bold pl-2 border-l-2 border-black" : "text-gray-500 hover:text-black"}`}
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* product cards */}
            <div className="w-full md:w-4/5">
              {error ? (
                <p className="text-center text-red-500 py-10">{error}</p>
              ) : (
                <div className="min-h-[50vh]">
                  {products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                      <p className="text-xl">No products found in this category.</p>
                      <button onClick={() => setCategory('')} className="mt-4 text-black underline">View all products</button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {products.map((product) => (
                        <Product key={product._id} product={product} />
                      ))}
                    </div>
                  )}
                </div>
              )}
              <div className='mt-12'>
                <Pagination
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Products;
