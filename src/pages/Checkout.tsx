import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/contexts/CartContext";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { sendConfirmationEmail } from "@/lib/sendConfirmationEmail";

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("emoney");

  const subtotal = getCartTotal();
  const shipping = 50;
  const vat = Math.round(subtotal * 0.2);
  const grandTotal = subtotal + shipping + vat;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmOrder = async () => {
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;

    try {
      await sendConfirmationEmail(name, email, grandTotal);
      toast({
        title: "Order confirmed!",
        description: "A confirmation email has been sent to your inbox.",
      });
    } catch (error) {
      console.error("Email sending failed:", error);
      toast({
        title: "Order confirmed (email failed)",
        description: "Your order was placed, but the email could not be sent.",
      });
    }

    clearCart();
    setShowConfirmation(false);
    navigate("/");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto px-6 lg:px-24 py-20 flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <Button variant="accent" asChild>
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <Header />

      <div className="container mx-auto px-6 lg:px-24 py-12">
        <Link to="/" className="text-muted-foreground hover:text-accent">
          Go Back
        </Link>
      </div>

      <div className="container mx-auto px-6 lg:px-24 pb-32">
        <div className="grid lg:grid-cols-3 gap-8">
          <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white rounded-lg p-8 lg:p-12">
            <h1 className="text-3xl font-bold tracking-wider uppercase mb-12">CHECKOUT</h1>

            <div className="mb-12">
              <h2 className="text-sm font-bold tracking-wider text-accent uppercase mb-6">
                BILLING DETAILS
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Alexei Ward" required />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="alexei@mail.com" required />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+1 202-555-0136" required />
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-sm font-bold tracking-wider text-accent uppercase mb-6">
                SHIPPING INFO
              </h2>
              <div className="grid gap-6">
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="1137 Williams Avenue" required />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="10001" required />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="New York" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" placeholder="United States" required />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold tracking-wider text-accent uppercase mb-6">
                PAYMENT DETAILS
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Label>Payment Method</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 border rounded p-4 mb-4">
                    <RadioGroupItem value="emoney" id="emoney" />
                    <Label htmlFor="emoney" className="flex-1 cursor-pointer">e-Money</Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded p-4">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex-1 cursor-pointer">Cash on Delivery</Label>
                  </div>
                </RadioGroup>
              </div>

              {paymentMethod === "emoney" && (
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <Label htmlFor="emoney-number">e-Money Number</Label>
                    <Input id="emoney-number" placeholder="238521993" required />
                  </div>
                  <div>
                    <Label htmlFor="emoney-pin">e-Money PIN</Label>
                    <Input id="emoney-pin" placeholder="6891" required />
                  </div>
                </div>
              )}
            </div>

            <Button type="submit" variant="accent" className="w-full mt-8 hidden lg:flex">
              CONTINUE & PAY
            </Button>
          </form>

          <div className="bg-white rounded-lg p-8 h-fit sticky top-8">
            <h2 className="text-lg font-bold tracking-wider uppercase mb-8">SUMMARY</h2>
            <div className="space-y-6 mb-8">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-secondary rounded flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-bold text-sm">{item.product.shortName}</p>
                    <p className="text-sm text-muted-foreground">
                      $ {item.product.price.toLocaleString()}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-muted-foreground">x{item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground uppercase text-sm">Total</span>
                <span className="font-bold">$ {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground uppercase text-sm">Shipping</span>
                <span className="font-bold">$ {shipping}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground uppercase text-sm">VAT (Included)</span>
                <span className="font-bold">$ {vat.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-4">
                <span className="text-muted-foreground uppercase text-sm">Grand Total</span>
                <span className="font-bold text-accent text-lg">$ {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <Button type="submit" variant="accent" className="w-full mt-8 lg:hidden" onClick={handleSubmit}>
              CONTINUE & PAY
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-lg">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-white" />
            </div>
            <DialogHeader>
              <h2 className="text-3xl font-bold tracking-wider uppercase">
                THANK YOU<br />FOR YOUR ORDER
              </h2>
            </DialogHeader>
            <p className="text-muted-foreground">
              You will receive an email confirmation shortly.
            </p>

            <div className="bg-secondary rounded-t-lg p-6">
              {cart.length > 0 && (
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white rounded flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-bold text-sm">{cart[0].product.shortName}</p>
                    <p className="text-sm text-muted-foreground">
                      $ {cart[0].product.price.toLocaleString()}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-muted-foreground">x{cart[0].quantity}</span>
                </div>
              )}
              {cart.length > 1 && (
                <p className="text-xs text-muted-foreground border-t pt-4">
                  and {cart.length - 1} other item(s)
                </p>
              )}
            </div>

            <div className="bg-primary text-white rounded-b-lg p-6">
              <p className="text-sm text-white/60 uppercase mb-2">GRAND TOTAL</p>
              <p className="text-lg font-bold">$ {grandTotal.toLocaleString()}</p>
            </div>

            <Button variant="accent" className="w-full" onClick={handleConfirmOrder}>
              BACK TO HOME
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Checkout;
