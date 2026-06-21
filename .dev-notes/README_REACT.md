# BONZERO - React Redesign - Getting Started

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
The app will open at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx              # Navigation & cart icon
│   ├── Hero.jsx                # Hero section with animations
│   ├── ProductCard.jsx         # Individual product display
│   ├── ProductGrid.jsx         # Product grid container
│   ├── Cart.jsx                # Cart drawer/modal
│   ├── LearnCard.jsx           # Article card component
│   └── LearnSection.jsx        # Learn section preview
│
├── context/
│   └── CartContext.jsx         # Cart state management
│
├── data/
│   ├── products.js             # Product data
│   └── articles.js             # Learning articles
│
├── hooks/
│   └── useWhatsAppCheckout.js  # WhatsApp integration hook
│
├── pages/
│   ├── Home.jsx                # Home page (Hero + Products + Learn)
│   └── LearnPage.jsx           # Full learn/articles page
│
├── App.jsx                     # Main app with routing
├── App.css                     # Global styles
├── main.jsx                    # React entry point
└── index.css                   # Tailwind & utilities

```

---

## 🎨 Design System

### Color Palette
```
Primary:
- White: #FFFFFF
- Off-white: #FAFAF8
- Warm beige: #F5F3F0

Text:
- Dark: #2C2C2C
- Medium: #5A5A5A
- Light: #8A8A8A

Accents:
- Brown: #8B7355 (Primary CTA, buttons)
- Green: #7A9B7E (Secondary highlights, badges)

Shadows:
- Soft: 0 4px 12px rgba(0,0,0,0.08)
- Hover: 0 8px 24px rgba(0,0,0,0.12)
```

### Typography
- Font Family: Poppins, Inter
- Hero Headline: 48-64px, Bold
- Section Headings: 32-40px, Semi-bold
- Body: 14-16px, Regular

---

## ✨ Key Features

### 1. **Hero Section**
- Full-width with gradient background
- Animated text entrance with Framer Motion
- Soft decorative elements
- "Shop Now" CTA button

### 2. **Product Listing**
- Responsive grid (2-4 columns)
- Product cards with:
  - Image/emoji display
  - Product name & description
  - Price & badge ("New", "Curated")
  - Hover effects (scale, shadow, button reveal)
  - Add to cart functionality

### 3. **Shopping Cart**
- React Context API state management
- Slide-in drawer from right
- Features:
  - Add/remove items
  - Quantity controls
  - Real-time total calculation
  - localStorage persistence
  - Clear cart option

### 4. **WhatsApp Checkout**
- Dynamic message generation
- Format:
  ```
  Hello, I'm interested in buying:

  - Product Name (₹XXX) x quantity

  Total: ₹XXXX
  ```
- Proper URL encoding
- Redirect to WhatsApp with prefilled message

### 5. **Learn Section**
- Featured articles on home page
- Full learn page with filtering
- Categories: Sustainability, Care Tips, Styling, etc.
- Card-based layout with hover effects

### 6. **Animations**
- Framer Motion for smooth transitions
- Page entrance animations
- Hover state animations
- Staggered grid animations
- 0.3-0.6s animation duration
- Accessibility: respects prefers-reduced-motion

### 7. **Responsive Design**
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly cart icon
- Floating action button on mobile

---

## 🛠️ Component API

### CartContext
```javascript
// Hook usage
const {
  cartItems,           // Array of cart items
  addToCart,           // (product) => void
  removeFromCart,      // (productId) => void
  updateQuantity,      // (productId, quantity) => void
  clearCart,           // () => void
  getTotalPrice,       // () => number
  getTotalItems        // () => number
} = useCart();
```

### useWhatsAppCheckout
```javascript
const {
  generateWhatsAppMessage,  // (items, total) => string
  sendWhatsAppMessage       // (items, total) => void (opens WhatsApp)
} = useWhatsAppCheckout();
```

---

## 📊 Data Structure

### Product
```javascript
{
  id: number,
  title: string,
  price: number,
  category: string,
  description: string,
  image: string (emoji or URL),
  badge: "New" | "Curated" | null
}
```

### Article
```javascript
{
  id: number,
  title: string,
  category: string,
  excerpt: string,
  emoji: string,
  content: string
}
```

---

## 🚀 Deployment

### Vite Build Output
```bash
npm run build
# Output: dist/ folder ready for deployment
```

### Deploy to:
- **Vercel**: Connect GitHub repo, auto-deploys from main
- **Netlify**: Drag & drop dist folder or connect GitHub
- **GitHub Pages**: Copy dist to gh-pages branch

---

## 📝 Configuration

### .env Variables
```
VITE_WHATSAPP_NUMBER=+919510381376
VITE_BUSINESS_NAME=BONZERO
```

### Tailwind Configuration
- Colors, spacing, shadows defined in `tailwind.config.js`
- Custom accent colors & spacing scale
- Rounded minimal corners (8px)

---

## 🔄 Adding New Products

Edit `src/data/products.js`:
```javascript
{
  id: 7,
  title: 'New Item',
  price: 599,
  category: 'Category',
  description: 'Description',
  image: '👕',
  badge: 'New'
}
```

---

## 🔄 Adding New Articles

Edit `src/data/articles.js`:
```javascript
{
  id: 7,
  title: 'Article Title',
  category: 'Category',
  excerpt: 'Short preview...',
  emoji: '📚',
  content: 'Full article content...'
}
```

---

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
# Kill process using port 3000 or specify different port
npm run dev -- --port 3001
```

### node_modules issues
```bash
rm node_modules package-lock.json
npm install
```

### Build errors
```bash
# Clear cache
rm -rf dist .vite
npm run build
```

---

## 📱 Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🔐 Environment & Security
- WhatsApp number stored in `.env`
- `.env` added to `.gitignore`
- No sensitive data in components
- localStorage for cart only (client-side)

---

## 📦 Dependencies

### Core
- react: ^18.2.0
- react-dom: ^18.2.0
- react-router-dom: ^6.20.0

### Animation
- framer-motion: ^10.16.4

### Styling
- tailwindcss: ^3.3.6
- postcss: ^8.4.32
- autoprefixer: ^10.4.16

### Build
- vite: ^5.0.8
- @vitejs/plugin-react: ^4.2.0

---

## 🎯 Performance Optimizations
- Code splitting via Vite
- Image emoji placeholders (no external images to load)
- Lazy loading with whileInView Framer Motion
- Minimal bundle size (~100KB gzipped)
- CSS-in-JS via Tailwind (no runtime overhead)

---

## 📞 Support & Updates

- WhatsApp: +919510381376
- Update products/articles in respective data files
- Customize colors in `tailwind.config.js`
- Modify animations in component files (Framer Motion syntax)

---

## ✅ Checklist

- ✅ Light minimal aesthetic implemented
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Cart functionality with localStorage persistence
- ✅ WhatsApp checkout integration
- ✅ Smooth Framer Motion animations
- ✅ Dual accent colors (brown + sage green)
- ✅ Learn section with filtering
- ✅ Production build ready

---

## Next Steps

1. Run `npm install` to ensure dependencies
2. Run `npm run dev` to start development
3. Customize products in `src/data/products.js`
4. Customize articles in `src/data/articles.js`
5. Update colors/branding in `tailwind.config.js`
6. Deploy to Vercel, Netlify, or GitHub Pages

Enjoy your minimal thrift aesthetic ecommerce site! 🎉
