import React, { useContext, useState } from "react";
import Sidebar from "../components/Sidebar";
import Nav from "../components/Nav";
import upload from "../assets/upload.png";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { FaBars } from "react-icons/fa";

function Add() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("TopWear");
  const [price, setPrice] = useState("");
  const [bestseller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const { serverUrl } = useContext(authDataContext);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("image1", image1);
      formData.append("image2", image2);
      formData.append("image3", image3);
      formData.append("image4", image4);

      const result = await axios.post(
        `${serverUrl}/api/product/addproduct`,
        formData,
        { withCredentials: true }
      );

      toast.success("Product Added Successfully ✅");

      if (result.data) {
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setBestSeller(false);
        setCategory("Men");
        setSubCategory("TopWear");
        setSizes([]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to Add Product ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-50 text-gray-900 overflow-x-hidden relative">
      <Nav />
      <div className={`fixed top-0 left-0 h-full z-40 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-64`}>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      <div className={`flex-1 flex flex-col transition-all duration-300 md:ml-64`}>
        <button
          className="fixed top-[80px] left-4 z-50 bg-gray-800 p-3 rounded-full shadow-xl hover:bg-gray-700 transition duration-300 md:hidden"
          onClick={toggleSidebar}
        >
          <FaBars className="text-white text-xl" />
        </button>

        <div className="pt-[70px] sm:pt-[80px] px-4 sm:px-6 md:px-8 pb-10"> 
          <div className="w-full bg-black rounded-xl py-4 sm:py-6 px-4 sm:px-6 mb-6 shadow-md text-center mt-4">
            <h1 className="text-xl md:text-3xl font-bold text-white">
              Add New Product
            </h1>
          </div>

          <form
            onSubmit={handleAddProduct}
            className="w-full max-w-4xl mx-auto flex flex-col gap-6 py-8 px-4 sm:px-6 md:px-10 bg-white rounded-2xl shadow-xl border-2 border-gray-200"
          >
            <div className="flex flex-col gap-4">
              <p className="text-xl font-semibold text-gray-700 border-b pb-2">
                Upload Images (Max 4)
              </p>
              <div className="grid grid-cols-4 gap-4 sm:gap-6">
                {[image1, image2, image3, image4].map((img, idx) => (
                  <label
                    key={idx}
                    className="aspect-square w-full cursor-pointer rounded-lg border-2 border-dashed border-gray-400 hover:border-blue-400 flex items-center justify-center transition duration-200 p-2"
                  >
                    <img
                      src={!img ? upload : URL.createObjectURL(img)}
                      alt={`upload-${idx}`}
                      className="w-full h-full object-contain rounded-md"
                    />
                    <input
                      type="file"
                      hidden
                      required
                      onChange={(e) => {
                        if (idx === 0) setImage1(e.target.files[0]);
                        if (idx === 1) setImage2(e.target.files[0]);
                        if (idx === 2) setImage3(e.target.files[0]);
                        if (idx === 3) setImage4(e.target.files[0]);
                      }}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-xl font-semibold text-gray-700 border-b pb-2 mt-4">
                Product Details
              </p>
              <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4} 
                className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none transition"
              />
              <input
                type="number"
                placeholder="Price (₹)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
                <select
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                >
                  <option value="TopWear">Topwear</option>
                  <option value="BottomWear">Bottomwear</option>
                  <option value="WinterWear">Winterwear</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="w-full text-xl font-semibold text-gray-700 border-b pb-2">Available Sizes:</p>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <div
                    key={size}
                    onClick={() =>
                      setSizes((prev) =>
                        prev.includes(size)
                          ? prev.filter((s) => s !== size)
                          : [...prev, size]
                      )
                    }
                    className={`px-4 py-2 rounded-full border-2 cursor-pointer font-medium transition duration-200 text-sm sm:text-base ${
                      sizes.includes(size)
                        ? "bg-blue-600 border-blue-700 text-white shadow-md"
                        : "border-gray-400 hover:border-blue-400 text-gray-700"
                    }`}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                checked={bestseller}
                onChange={() => setBestSeller(!bestseller)}
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-gray-700 font-semibold text-base">
                Mark as Bestseller
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-2/3 md:w-1/3 mx-auto py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg transition duration-300 hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              {loading ? <Loading /> : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Add;
