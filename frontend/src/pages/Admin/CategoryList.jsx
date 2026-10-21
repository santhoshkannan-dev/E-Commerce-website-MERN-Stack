import { useState } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";

import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import AdminMenu from "./AdminMenu";
import { FaTags, FaEdit } from "react-icons/fa";

const CategoryList = () => {
  const { data: categories } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`Category "${result.name}" created successfully`);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to create category");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`Category updated to "${result.name}"`);
        setSelectedCategory(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to update category");
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`Category "${result.name || selectedCategory.name}" deleted`);
        setSelectedCategory(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Category deletion failed");
    }
  };

  return (
    <div className="min-h-screen bg-forest-950 text-stone-200">
      <AdminMenu />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
            <FaTags className="text-emerald-400" />
            <span>Taxonomy</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-100 font-bold">
            Manage Product Categories
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Organize products by room, material, or use case.
          </p>
        </div>

        {/* Create Form */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-900/30 shadow-xl mb-10">
          <h2 className="font-serif text-lg font-bold text-stone-100 mb-4">Add New Category</h2>
          <CategoryForm
            value={name}
            setValue={setName}
            handleSubmit={handleCreateCategory}
            buttonText="Create Category"
          />
        </div>

        {/* Category Pills */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-900/30 shadow-xl">
          <h2 className="font-serif text-lg font-bold text-stone-100 mb-2">
            Existing Categories ({categories?.length || 0})
          </h2>
          <p className="text-xs text-stone-400 mb-6">Click on any category pill to edit or remove it.</p>

          <div className="flex flex-wrap gap-3">
            {categories?.map((category) => (
              <button
                key={category._id}
                onClick={() => {
                  setModalVisible(true);
                  setSelectedCategory(category);
                  setUpdatingName(category.name);
                }}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full bg-forest-900/80 hover:bg-emerald-900/50 border border-emerald-900/40 hover:border-emerald-600/50 text-stone-200 hover:text-emerald-300 text-xs font-semibold transition-all shadow-sm"
              >
                <span>{category.name}</span>
                <FaEdit className="text-[10px] text-emerald-400/70" />
              </button>
            ))}
          </div>
        </div>

        {/* Update / Delete Modal */}
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <div className="pt-2">
            <h3 className="font-serif text-xl font-bold text-stone-100 mb-2">
              Edit Category
            </h3>
            <p className="text-xs text-stone-400 mb-4">
              Update the name or permanently remove this category.
            </p>
            <CategoryForm
              value={updatingName}
              setValue={setUpdatingName}
              handleSubmit={handleUpdateCategory}
              buttonText="Update Name"
              handleDelete={handleDeleteCategory}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
