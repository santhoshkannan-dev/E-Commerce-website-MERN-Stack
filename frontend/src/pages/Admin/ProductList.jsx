import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";
import { FaCloudUploadAlt, FaPlusCircle, FaImage } from "react-icons/fa";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage, { isLoading: isUploading }] = useUploadProductImageMutation();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload an image for the product");
      return;
    }
    if (!category) {
      toast.error("Please select a category");
      return;
    }

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const res = await createProduct(productData).unwrap();

      if (res.error) {
        toast.error("Product creation failed. Try Again.");
      } else {
        toast.success(`"${name}" published to catalog successfully!`);
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Product creation failed.");
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message || "Image uploaded successfully");
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error || "Image upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-forest-950 text-stone-200">
      <AdminMenu />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
            <FaPlusCircle className="text-emerald-400" />
            <span>Product Catalog</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-100 font-bold">
            Create New Product
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Add eco-friendly kitchenware, sustainable cookware, or artisan home essentials.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-10 rounded-3xl border border-emerald-900/30 shadow-2xl space-y-6">
          {/* Image Uploader */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
              Product Image
            </label>
            <div className="border-2 border-dashed border-emerald-900/60 hover:border-emerald-500/60 rounded-3xl p-6 transition-colors bg-forest-900/40 text-center">
              {imageUrl ? (
                <div className="space-y-4">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="max-h-56 mx-auto rounded-2xl object-cover border border-emerald-900/40 shadow-lg"
                  />
                  <label className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-900/50 hover:bg-emerald-800/80 text-emerald-300 text-xs font-semibold cursor-pointer transition-all">
                    <FaCloudUploadAlt />
                    <span>Replace Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={uploadFileHandler}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center cursor-pointer py-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-900/30 border border-emerald-700/30 flex items-center justify-center text-emerald-400 text-2xl mb-3">
                    <FaCloudUploadAlt />
                  </div>
                  <span className="text-sm font-semibold text-stone-200">
                    {isUploading ? "Uploading..." : "Click or drag to upload product photography"}
                  </span>
                  <span className="text-xs text-stone-500 mt-1">
                    PNG, JPG, WEBP up to 10MB (clean kitchen or product shot recommended)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={uploadFileHandler}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Title & Brand */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                Product Title
              </label>
              <input
                type="text"
                className="w-full bg-forest-900/70 border border-emerald-900/40 rounded-xl px-4 py-3 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm"
                placeholder="e.g. Ceramic Non-Stick Saucepan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                Brand / Artisan
              </label>
              <input
                type="text"
                className="w-full bg-forest-900/70 border border-emerald-900/40 rounded-xl px-4 py-3 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm"
                placeholder="e.g. Homedine Organic"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Price, Stock, Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                Price ($ USD)
              </label>
              <input
                type="number"
                step="0.01"
                className="w-full bg-forest-900/70 border border-emerald-900/40 rounded-xl px-4 py-3 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm"
                placeholder="79.99"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                className="w-full bg-forest-900/70 border border-emerald-900/40 rounded-xl px-4 py-3 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm"
                placeholder="50"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                Category
              </label>
              <select
                className="w-full bg-forest-900/70 border border-emerald-900/40 rounded-xl px-4 py-3 text-stone-100 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Choose category</option>
                {categories?.map((c) => (
                  <option key={c._id} value={c._id} className="bg-forest-950 text-stone-200">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
              Story & Description
            </label>
            <textarea
              rows="4"
              className="w-full bg-forest-900/70 border border-emerald-900/40 rounded-xl p-4 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm resize-none"
              placeholder="Describe the materials (PTFE-free ceramic, organic bamboo, recycled aluminum), ethical craftsmanship, and key highlights..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isCreating}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-emerald-900/50 hover:shadow-emerald-900/70 disabled:opacity-50"
            >
              {isCreating ? "Publishing Product..." : "Publish Product to Catalog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductList;
