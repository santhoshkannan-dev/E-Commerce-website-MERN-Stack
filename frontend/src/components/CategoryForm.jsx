const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="py-2">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
            Category Name
          </label>
          <input
            type="text"
            className="w-full bg-forest-900/80 border border-emerald-900/40 rounded-xl px-4 py-3 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm transition-all"
            placeholder="e.g. Cookware, Utensils, Glassware..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-3 pt-1">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md shadow-emerald-900/40"
          >
            {buttonText}
          </button>

          {handleDelete && (
            <button
              type="button"
              onClick={handleDelete}
              className="px-6 py-2.5 rounded-full bg-red-950/40 hover:bg-red-900/60 border border-red-800/60 text-red-300 font-semibold text-xs tracking-wider uppercase transition-all"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
