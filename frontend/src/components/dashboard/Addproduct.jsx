import { UploadCloud, PackagePlus, Save } from "lucide-react";
import { useState } from "react";
import { ProductAdd } from "../../services/productService";

function AddProduct() {
  const [NewproductData, setNewproductData] = useState({
    Productname: "",
    Category: "",
    Price: "",
    Stockquantity: "",
    Description: "",
    Image: "",
  });

  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setNewproductData((prev) => ({
        ...prev,
        Image: file,
      }));
    }
  };

  const handleForm = (e) => {
    const { name, value } = e.target;
    setNewproductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function fetchData() {
    const formData = new FormData();
    formData.append("Productname", NewproductData.Productname);
    formData.append("Category", NewproductData.Category);
    formData.append("Price", NewproductData.Price);
    formData.append("Stockquantity", NewproductData.Stockquantity);
    formData.append("Description", NewproductData.Description);
    formData.append("Image", NewproductData.Image);

    try {
      const resposne = await ProductAdd(formData);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center shrink-0">
            <PackagePlus size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Add New Product
            </h1>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              Inventory Management
            </p>
          </div>
        </div>

        <button
          className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition shadow-xs flex items-center gap-2 cursor-pointer"
          onClick={fetchData}
        >
          <Save size={16} />
          <span>Save Product</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">

        {/* Left — Specifications */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs">
          <h2 className="text-base font-bold text-slate-900 pb-4 border-b border-slate-100 mb-5">
            Product Specifications
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Product Name
              </label>
              <input
                type="text"
                name="Productname"
                onChange={handleForm}
                placeholder="e.g. Organic Dragon Fruit"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Category
              </label>
              <select
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition cursor-pointer"
                onChange={handleForm}
                name="Category"
              >
                <option value="Fresh Fruits">Fresh Fruits</option>
                <option value="Tropical">Tropical</option>
                <option value="Citrus">Citrus</option>
                <option value="Berry">Berry</option>
                <option value="Berry">Melone</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Price (₹ per kg)
              </label>
              <input
                type="number"
                name="Price"
                onChange={handleForm}
                placeholder="e.g. 120"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Stock Quantity (kg)
              </label>
              <input
                type="number"
                name="Stockquantity"
                onChange={handleForm}
                placeholder="e.g. 50"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Product Description
            </label>
            <textarea
              name="Description"
              onChange={handleForm}
              rows="6"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 resize-none focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
              placeholder="Describe the freshness, origin, taste, and quality..."
            />
          </div>
        </div>

        {/* Right — Image Upload */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs">
          <h2 className="text-base font-bold text-slate-900 pb-4 border-b border-slate-100 mb-5">
            Product Image
          </h2>

          <label className="border-2 border-dashed border-emerald-200 hover:border-emerald-400 bg-emerald-50/40 hover:bg-emerald-50/70 rounded-2xl h-72 flex flex-col items-center justify-center cursor-pointer transition-all">
            {image ? (
              <img
                src={image}
                alt="preview"
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              <>
                <UploadCloud size={40} className="text-emerald-400" />
                <p className="mt-3 text-sm font-bold text-emerald-700">
                  Click to upload
                </p>
                <p className="text-xs text-slate-400 font-medium mt-1">
                  PNG, JPG, WEBP up to 5MB
                </p>
              </>
            )}

            <input
              type="file"
              hidden
              onChange={handleImage}
              accept="image/*"
            />
          </label>
        </div>

      </div>
    </div>
  );
}

export default AddProduct;