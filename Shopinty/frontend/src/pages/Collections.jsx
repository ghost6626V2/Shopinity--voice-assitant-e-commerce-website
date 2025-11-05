import React, { useContext, useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { shopDataContext } from "../context/ShopContext";
import Card from "../component/Card";

function Collection() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { products, search, showSearch } = useContext(shopDataContext);

  const [filterProducts, setFilterProducts] = useState([]);
  const [productsAfterFilter, setProductsAfterFilter] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    const value = e.target.value;
    if (category.includes(value)) setCategory(prev => prev.filter(item => item !== value));
    else setCategory(prev => [...prev, value]);
    if (window.innerWidth < 640) setSidebarOpen(false);
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    if (subCategory.includes(value)) setSubCategory(prev => prev.filter(item => item !== value));
    else setSubCategory(prev => [...prev, value]);
    if (window.innerWidth < 640) setSidebarOpen(false);
  };

  const applyFilter = () => {
    let filtered = [...products];
    if (showSearch && search) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) filtered = filtered.filter(item => category.includes(item.category));
    if (subCategory.length > 0) filtered = filtered.filter(item => subCategory.includes(item.subCategory));
    setProductsAfterFilter(filtered);
  };

  const sortProducts = (type) => {};

  useEffect(() => { 
    applyFilter(); 
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    let fbCopy = [...productsAfterFilter];
    switch (sortType) {
      case "low-high":
        fbCopy.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        fbCopy.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setFilterProducts(fbCopy);
  }, [productsAfterFilter, sortType]);

  return (
    <div className="w-full min-h-screen bg-white relative flex">
      {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-40 z-30 sm:hidden" onClick={() => setSidebarOpen(false)}></div>}
      
      <button
        className="sm:hidden fixed top-[110px] left-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
      </button>

      <div
        className={`fixed top-[70px] sm:top-[80px] left-0 h-[calc(100vh-70px)] sm:h-[calc(100vh-80px)] w-64 bg-white border-r border-gray-300 shadow-xl p-6 z-40 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 overflow-y-auto`}
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Filters</h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Category</h2>
          <div className="flex flex-col gap-3">
            {["Men", "Women", "Kids"].map(cat => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer text-gray-700 hover:text-blue-600 transition">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  value={cat}
                  checked={category.includes(cat)}
                  onChange={toggleCategory}
                />
                <span className="text-base font-medium">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Subcategory</h2>
          <div className="flex flex-col gap-3">
            {["TopWear", "BottomWear", "WinterWear"].map(sub => (
              <label key={sub} className="flex items-center gap-3 cursor-pointer text-gray-700 hover:text-blue-600 transition">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  value={sub}
                  checked={subCategory.includes(sub)}
                  onChange={toggleSubCategory}
                />
                <span className="text-base font-medium">{sub}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className={`flex-1 pt-[100px] sm:pt-[120px] px-4 sm:px-6 lg:px-8 transition-all duration-300 sm:ml-64 w-full`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 border-b pb-4">
          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900">
            {search && showSearch ? `Search Results for "${search}"` : "All Collections"}
          </h1>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap" htmlFor="sort">Sort by:</label>
            <select
              id="sort"
              className="border border-gray-300 rounded-lg p-2 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="relavent">Relavent</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {filterProducts.length === 0 ? (
          <div className="text-center text-gray-500 text-2xl mt-20">
            No products found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filterProducts.map((item) => (
              <Card key={item._id} id={item._id} name={item.name} price={item.price} image={item.image1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Collection;
