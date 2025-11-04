import { useCart } from "@/contexts/CartContext";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CartPanel = () => {
  const { cart, updateQuantity, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <p className="text-muted-foreground">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={clearCart}
          className="text-sm text-muted-foreground hover:text-accent underline"
        >
          Remove all
        </button>
      </div>

      <div className="flex-1 overflow-auto space-y-6">
        {cart.map((item) => (
          <div key={item.product.id} className="flex items-center gap-4">
            <div className="w-16 h-16 bg-secondary rounded flex-shrink-0" />
            <div className="flex-1">
              <p className="font-bold text-sm">{item.product.shortName}</p>
              <p className="text-sm text-muted-foreground">
                $ {item.product.price.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-2 bg-secondary rounded px-3 py-2">
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                className="text-muted-foreground hover:text-accent"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-bold">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                className="text-muted-foreground hover:text-accent"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground uppercase">Total</span>
          <span className="text-xl font-bold">$ {getCartTotal().toLocaleString()}</span>
        </div>
        <Button
          variant="accent"
          className="w-full"
          onClick={() => navigate('/checkout')}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};
