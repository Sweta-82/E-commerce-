import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { toast } from "react-toastify";
import {
  addItemsToCart,
  removeErrors,
  removeItemFromCart,
  removeMessage,
} from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

function CartItem({ item }) {
  const { success, loading, error, message } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity);

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      toast.error("Quantity cannot be less than 1", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
      return;
    }
    setQuantity((qty) => qty - 1);
  };

  const increaseQuantity = () => {
    if (item.stock <= quantity) {
      toast.error("Cannot exceed available Stock!", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
      return;
    }
    setQuantity((qty) => qty + 1);
  };

  const handleUpdate = () => {
    if (loading) return;
    if (quantity !== item.quantity) {
      dispatch(addItemsToCart({ id: item.product, quantity }));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success(message, {
        position: "top-center",
        autoClose: 3000,
        toastId: "cart-update",
      });
      dispatch(removeMessage());
    }
  }, [dispatch, success, message]);

  const handleRemove = () => {
    if (loading) return;
    dispatch(removeItemFromCart(item.product));
    toast.success("Item removed from cart successfully", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-4 items-center gap-4 py-4 border-b border-gray-200">
      {/* Product Info */}
      <div className="flex items-center gap-4 w-full lg:w-auto">
        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
        <div>
          <h3 className="font-semibold text-gray-800">{item.name}</h3>
          <p className="text-sm text-gray-600">Price: ₹{item.price.toFixed(2)}</p>
          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={decreaseQuantity}
          disabled={loading}
          className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded disabled:opacity-50"
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          readOnly
          min="1"
          className="w-12 text-center border border-gray-300 rounded"
        />
        <button
          onClick={increaseQuantity}
          disabled={loading}
          className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded disabled:opacity-50"
        >
          +
        </button>
      </div>

      {/* Item Total */}
      <div className="text-gray-800 font-semibold">
        ₹{(item.price * item.quantity).toFixed(2)}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          text={loading ? "Updating" : "Update"}
          onClick={handleUpdate}
          disabled={loading || quantity === item.quantity}
          className="bg-black hover:bg-gray-800 text-white !px-4 !py-1 rounded disabled:opacity-50 !mt-0 border-none"
        />
        <Button
          text="Remove"
          onClick={handleRemove}
          disabled={loading}
          className="bg-gray-600 hover:bg-gray-700 text-white !px-4 !py-1 rounded disabled:opacity-50 !mt-0 border-none"
        />
      </div>
    </div>
  );
}

export default CartItem;
