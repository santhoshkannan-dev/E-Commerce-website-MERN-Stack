import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import { FaCloudUploadAlt, FaTrash, FaCheck, FaEdit } from "react-icons/fa";

const AdminProductUpdate = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data: productData, isLoading: loadingProduct } = useGetProductByIdQuery(params._id);
  const { data: categories = [] } = useFetchCategoriesQuery();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);

  const [uploadProductImage, { isLoading: isUploading }] = useUploadProductImageMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name || "");
      setDescription(productData.description || "");
      setPrice(productData.price || "");
      setCategory(productData.category?._id || productData.category || "");
      setQuantity(productData.quantity || "");
      setBrand(productData.brand || "");
      setImage(productData.image || "");
      setStock(productData.countInStock ?? 0);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image uploaded successfully");
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.message || "Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      const data = await updateProduct({ productId: params._id, formData }).unwrap();

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`"${name}" updated successfully`);
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.message || "Product update failed");
    }
  };

  const handleDelete = async () => {
    try {
      const answer = window.confirm("Are you sure you want to delete this product?");
      if (!answer) return;

      const data = await deleteProduct(params._id).unwrap();
      toast.success(`"${data.name || name}" deleted from catalog`);
      navigate("/admin/allproductslist");
    } catch (err) {
      toast.error(err?.data?.message || err.message || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-forest-950 text-stone-200">
      <AdminMenu />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
            <FaEdit className="text-emerald-400" />
            <span>Product Catalog</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-100 font-bold">
            Update Product Details
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Modify pricing, sustainable materials description, inventory count, and photography.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-10 rounded-3xl border border-emerald-900/30 shadow-2xl space-y-6">
          {/* Image Uploader */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
              Product Photography
            </label>
            <div className="border-2 border-dashed border-emerald-900/60 rounded-3xl p-6 bg-forest-900/40 text-center">
              {image && (
                <div className="space-y-4 mb-4">
                  <img
                    src={image}
                    alt="Current"
                    className="max-h-56 mx-auto rounded-2xl object-cover border border-emerald-900/40 shadow-lg"
                  />
                </div>
              )}
              <label className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-emerald-900/50 hover:bg-emerald-800/80 text-emerald-300 text-xs font-semibold cursor-pointer transition-all">
                <FaCloudUploadAlt className="text-sm" />
                <span>{isUploading ? "Uploading..." : "Upload New Image"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={uploadFileHandler}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Title & Brand */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                Product Name
              </label>
              <input
                type="text"
                className="w-full bg-forest-900/70 border border-emerald-900/40 rounded-xl px-4 py-3 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm"
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
                Price (₹ INR)
              </label>
              <input
                type="number"
                step="1"
                className="w-full bg-forest-900/70 border border-emerald-900/40 rounded-xl px-4 py-3 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm"
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
                <option value="">Select category</option>
                {categories.map((c) => (
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
              Product Story & Materials
            </label>
            <textarea
              rows="4"
              className="w-full bg-forest-900/70 border border-emerald-900/40 rounded-xl p-4 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Action buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <button
              type="submit"
              disabled={isUpdating}
              className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-emerald-900/50 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <FaCheck className="text-xs" />
              <span>{isUpdating ? "Saving Changes..." : "Update Product"}</span>
            </button>

            <button
              type="button"
              disabled={isDeleting}
              onClick={handleDelete}
              className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-red-950/40 hover:bg-red-900/60 border border-red-800/60 text-red-300 font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <FaTrash className="text-xs" />
              <span>{isDeleting ? "Deleting..." : "Delete Item"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductUpdate;
