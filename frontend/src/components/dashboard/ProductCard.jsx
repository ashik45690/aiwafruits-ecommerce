import { ShoppingBasket } from "lucide-react";

function ProductCard({ image, title, price }) {
  return (
    <div className="bg-[#fafaf8] rounded-2xl p-5">

      <div className="h-[220px] overflow-hidden rounded-2xl">

        <img
          src={image}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="text-2xl font-semibold mt-5">
        {title}
      </h3>

      <p className="text-gray-500 mt-2">
        {price}
      </p>

      <button className="w-full bg-lime-700 text-white py-3 rounded-xl mt-5 flex items-center justify-center gap-2">

        <ShoppingBasket size={18} />

        Add to Box
      </button>
    </div>
  );
}

export default ProductCard;