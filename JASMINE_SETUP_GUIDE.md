# Audiophile E-Commerce - Complete Setup Guide

## Project Overview

This is a pixel-perfect recreation of the Audiophile e-commerce website built with:
- **Next.js** (via Vite for faster builds)
- **TypeScript**
- **Tailwind CSS**
- **React Router** for navigation
- **shadcn/ui** components
- **Context API** for cart management

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # shadcn components
│   ├── Header.tsx             # Navigation header with cart
│   ├── Footer.tsx             # Footer with links
│   ├── CartPanel.tsx          # Shopping cart sidebar
│   └── CategoryCard.tsx       # Product category cards
├── contexts/
│   └── CartContext.tsx        # Cart state management
├── lib/
│   ├── products.ts            # Product data and utilities
│   └── utils.ts               # Helper functions
├── pages/
│   ├── Index.tsx              # Homepage
│   ├── Category.tsx           # Category listing pages
│   ├── ProductDetail.tsx      # Individual product pages
│   ├── Checkout.tsx           # Checkout form
│   └── NotFound.tsx           # 404 page
├── types/
│   └── product.ts             # TypeScript interfaces
├── index.css                  # Global styles & design system
└── App.tsx                    # App router with cart provider
```

## 🎨 Design System

The design system is defined in `src/index.css` with HSL color tokens:

### Colors
- **Primary (Black)**: `--primary: 0 0% 0%`
- **Accent (Orange)**: `--accent: 22 65% 57%` (#D87D4A)
- **Background**: `--background: 0 0% 100%` (White)
- **Secondary**: `--secondary: 0 0% 96%` (Light gray)
- **Hero Background**: `--hero-bg: 0 0% 7%` (Dark gray/black)

### Typography
- **Font**: Manrope (imported from Google Fonts)
- **Font Weights**: 400 (Regular), 500 (Medium), 700 (Bold), 800 (Extra Bold)

### Button Variants
- `default`: Black background, white text
- `accent`: Orange background, white text
- `outline`: Transparent with black border
- `ghost`: Transparent, shows muted background on hover

## 🛒 Features Implemented

### 1. Homepage
- Hero section with featured product (XX99 Mark II Headphones)
- Three category cards (Headphones, Speakers, Earphones)
- Featured products section (ZX9, ZX7, YX1)
- About section
- Fully responsive layout

### 2. Category Pages
- Dynamic routing for each category (`/headphones`, `/speakers`, `/earphones`)
- Product listings with alternating layouts
- "NEW PRODUCT" badges
- Links to product detail pages

### 3. Product Detail Pages
- Large product image
- Product description and pricing
- Quantity selector
- "Add to Cart" functionality
- Features section with detailed specifications
- "In the Box" list showing included items
- Image gallery (3 images)
- "You May Also Like" recommendations section

### 4. Shopping Cart
- Slide-in cart panel (Sheet component)
- Display cart items with thumbnails
- Quantity adjustment (+/- buttons)
- "Remove all" functionality
- Real-time total calculation
- "Checkout" button

### 5. Checkout Page
- Multi-section form:
  - Billing Details (Name, Email, Phone)
  - Shipping Info (Address, ZIP, City, Country)
  - Payment Details (e-Money or Cash on Delivery)
- Order summary sidebar with:
  - Cart items
  - Subtotal
  - Shipping cost ($50)
  - VAT (20% of subtotal)
  - Grand total
- Form validation
- Order confirmation modal

### 6. Order Confirmation
- Success modal with checkmark icon
- Order summary showing first item + count of others
- Grand total display
- "Back to Home" button
- Clears cart after confirmation

## 🚀 Running the Project Locally

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository** (if using GitHub)
   ```bash
   git clone <YOUR_GIT_URL>
   cd audiophile-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:8080
   ```

## 📧 Setting Up Email Confirmation with Lovable Cloud

To enable order confirmation emails, you'll need to set up Lovable Cloud (powered by Supabase) with an edge function.

### Step 1: Enable Lovable Cloud

1. Click the "Connect Lovable Cloud" button in the Lovable interface
2. This will automatically provision a backend with:
   - PostgreSQL database
   - Authentication system
   - Edge functions capability
   - Secrets management

### Step 2: Add Email Service API Key

We'll use **Resend** for sending transactional emails:

1. Go to [resend.com](https://resend.com) and create an account
2. Verify your sending domain at: https://resend.com/domains
3. Create an API key at: https://resend.com/api-keys
4. In Lovable, add a secret called `RESEND_API_KEY` with your API key

### Step 3: Create Email Edge Function

Create a new edge function `send-confirmation-email`:

**File: `supabase/functions/send-confirmation-email/index.ts`**

```typescript
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderConfirmationRequest {
  email: string;
  name: string;
  orderId: string;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, orderId, items, total }: OrderConfirmationRequest = await req.json();

    const itemsHTML = items
      .map(
        (item) => `
        <tr>
          <td>${item.name}</td>
          <td>x${item.quantity}</td>
          <td>$${item.price.toLocaleString()}</td>
        </tr>
      `
      )
      .join("");

    const emailResponse = await resend.emails.send({
      from: "Audiophile <orders@yourdomain.com>", // Change to your verified domain
      to: [email],
      subject: `Order Confirmation - ${orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #D87D4A;">Thank you for your order, ${name}!</h1>
          <p>Your order <strong>${orderId}</strong> has been confirmed and will be shipped shortly.</p>
          
          <h2>Order Summary:</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f5f5f5;">
                <th style="padding: 10px; text-align: left;">Product</th>
                <th style="padding: 10px; text-align: left;">Quantity</th>
                <th style="padding: 10px; text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHTML}
            </tbody>
          </table>
          
          <h3 style="text-align: right;">Total: $${total.toLocaleString()}</h3>
          
          <p style="margin-top: 30px;">If you have any questions, please contact us at support@audiophile.com</p>
          <p style="color: #666;">- The Audiophile Team</p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
```

### Step 4: Call Edge Function from Checkout

Update `src/pages/Checkout.tsx` to call the edge function after successful checkout:

```typescript
// Add this import at the top
import { createClient } from '@supabase/supabase-js';

// Add Supabase client initialization
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

// Update handleSubmit function
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Generate order ID
  const orderId = `ORD-${Date.now()}`;
  
  // Prepare order data
  const orderData = {
    email: (e.target as any).email.value,
    name: (e.target as any).name.value,
    orderId,
    items: cart.map(item => ({
      name: item.product.shortName,
      price: item.product.price,
      quantity: item.quantity
    })),
    total: grandTotal
  };
  
  try {
    // Call edge function
    const { data, error } = await supabase.functions.invoke('send-confirmation-email', {
      body: orderData
    });
    
    if (error) throw error;
    
    setShowConfirmation(true);
  } catch (error) {
    console.error('Error:', error);
    toast({
      title: "Error",
      description: "Failed to process order. Please try again.",
      variant: "destructive"
    });
  }
};
```

### Step 5: Install Supabase Client

```bash
npm install @supabase/supabase-js
```

## 🗄️ Adding Database (Optional)

If you want to store orders in a database:

### Create Orders Table

In Lovable Cloud SQL editor:

```sql
-- Create orders table
create table public.orders (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  order_id text unique not null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  shipping_address jsonb not null,
  items jsonb not null,
  subtotal numeric not null,
  shipping numeric not null,
  vat numeric not null,
  total numeric not null,
  status text default 'pending'
);

-- Enable RLS
alter table public.orders enable row level security;

-- Create policy (adjust based on your needs)
create policy "Anyone can insert orders"
  on public.orders for insert
  with check (true);
```

### Save Order to Database

Update the edge function to also save to database:

```typescript
// Add this before sending email
const { error: dbError } = await supabase
  .from('orders')
  .insert({
    order_id: orderId,
    customer_name: name,
    customer_email: email,
    shipping_address: { /* shipping details */ },
    items: items,
    subtotal: total - 50 - (total * 0.2),
    shipping: 50,
    vat: total * 0.2,
    total: total,
  });

if (dbError) throw dbError;
```

## 📱 Responsive Breakpoints

The design is responsive at three breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: ≥ 1024px

## 🎯 Testing Checklist

- [ ] Homepage loads with all sections
- [ ] Navigation works between pages
- [ ] Category pages show correct products
- [ ] Product detail pages display correctly
- [ ] Add to cart functionality works
- [ ] Cart updates quantities correctly
- [ ] Cart persists during navigation
- [ ] Checkout form validates inputs
- [ ] Order confirmation modal appears
- [ ] Cart clears after order
- [ ] All pages are responsive
- [ ] Email confirmation is sent (if backend enabled)

## 🐛 Troubleshooting

### Cart not updating
- Check browser console for errors
- Verify CartContext is wrapping the app in `App.tsx`

### Email not sending
- Verify Resend API key is correct
- Check that your domain is verified in Resend
- Check edge function logs in Lovable Cloud
- Make sure CORS headers are present

### Styles not applying
- Verify Tailwind CSS is installed
- Check that `index.css` is imported in `main.tsx`
- Clear browser cache

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Delete `node_modules` and run `npm install` again
- Check TypeScript errors in terminal

## 🚀 Deployment

The project is automatically deployed when you push changes via Lovable. To deploy manually:

1. Build the project:
   ```bash
   npm run build
   ```

2. The built files will be in the `dist` folder

3. Deploy to any static hosting service:
   - Vercel
   - Netlify
   - GitHub Pages
   - Cloudflare Pages

## 📝 Environment Variables

If deploying elsewhere, you'll need:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

These are automatically provided by Lovable Cloud.

## 🎨 Customization Guide

### Changing Colors

Edit `src/index.css`:

```css
:root {
  --accent: 22 65% 57%; /* Change to your brand color */
  --primary: 0 0% 0%;    /* Change primary color */
}
```

### Adding Products

Edit `src/lib/products.ts`:

```typescript
{
  id: "7",
  slug: "new-product",
  name: "NEW PRODUCT NAME",
  shortName: "SHORT NAME",
  category: "headphones",
  new: true,
  price: 1999,
  // ... rest of product data
}
```

### Modifying Shipping/VAT

Edit `src/pages/Checkout.tsx`:

```typescript
const shipping = 50;  // Change shipping cost
const vat = Math.round(subtotal * 0.2); // Change VAT rate (0.2 = 20%)
```

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Lovable Cloud Docs](https://docs.lovable.dev/features/cloud)
- [Resend Email API](https://resend.com/docs)

## 👨‍💻 Development Tips

1. **Use React DevTools** to debug component state
2. **Check Network tab** to see API calls
3. **Use TypeScript** for better type safety
4. **Keep components small** and focused
5. **Follow the design system** - don't add custom colors
6. **Test on real devices** for responsive design

## 🎉 You're All Set!

Your Audiophile e-commerce site is now ready. The design is pixel-perfect, fully responsive, and includes all the features from the original design. When you're ready to add email functionality, just follow the backend setup steps above.

Happy coding! 🚀
