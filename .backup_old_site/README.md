# BONZERO - Sustainable Fashion Marketplace

A modern, interactive e-commerce website for sustainable and pre-loved fashion. Browse curated collections, learn about sustainable fashion, and connect via WhatsApp to make purchases.

## 📁 Project Structure

```
FinalDemo/
├── index.html                 # Home page
├── about.html                 # About BONZERO
├── curations.html            # Featured collections
├── learn.html                # Blog/learning resources
├── consign.html              # Consignment program
├── contact.html              # Contact form
├── README.md                 # This file
├── robots.txt                # SEO - Search engine directives
├── .gitignore                # Git ignore rules
│
├── css/
│   └── styles.css            # Shared styles and animations
│
├── js/
│   ├── main.js               # Core JavaScript functionality
│   ├── data.js               # Shared data (products, testimonials, etc.)
│   └── index.js              # Page-specific logic (optional)
│
└── assets/
    ├── images/               # Product and page images
    └── icons/                # SVG icons and favicons
```

## 🎨 Features

- **Interactive Animations**: Smooth transitions, particle effects, and 3D card hover effects
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **WhatsApp Integration**: Customers can message directly to inquire or purchase
- **Dynamic Content**: All content is rendered from JavaScript data
- **Form Validation**: Real-time email and form validation
- **Scroll Effects**: Animations triggered on scroll using Intersection Observer

## 🚀 Getting Started

### Installation

1. Clone or download this repository
2. No build process required - this is a static site
3. Open `index.html` in a web browser

### Local Server (Recommended)

For best results, serve the files using a local server:

```bash
# Using Python 3
python -m http.server 8000

# Or using Python 2
python -m SimpleHTTPServer 8000

# Or using Node.js with http-server
npx http-server
```

Then visit `http://localhost:8000`

## 📝 Configuration

### Update WhatsApp Number

Edit `js/data.js` and update the `CONFIG.whatsappNumber` with your business WhatsApp number:

```javascript
const CONFIG = {
    businessName: 'BONZERO',
    whatsappNumber: '+YOUR_PHONE_NUMBER',
    copyrightYear: 2024,
    siteName: 'BONZERO - Sustainable Fashion Marketplace'
};
```

## 📦 Dependencies

- **Tailwind CSS** - Utility-first CSS framework (loaded via CDN)
- **No other external libraries required** - Pure vanilla JavaScript

## 🎯 Key Files

### CSS (`css/styles.css`)
Contains all keyframe animations and shared styling for:
- Navigation
- Cards and 3D effects
- Buttons and interactive elements
- Forms and inputs
- Particles and effects

### JavaScript (`js/main.js`)
Provides core functionality:
- Navbar scroll effects
- Smooth scrolling
- Particle burst animations
- Newsletter subscription
- Form validation
- WhatsApp redirect

### Data (`js/data.js`)
Central repository for:
- Products catalog
- Features list
- Testimonials
- Curations
- Learn articles
- Navigation links

## 💡 Page Guide

### index.html (Home)
- Hero section with gradient animation
- Featured products grid
- Features section (Why Choose BONZERO)
- Testimonials
- Newsletter subscription

### about.html
- Company mission and values
- Team information
- Sustainability commitment

### curations.html
- Filterable collection grid
- Category-based browsing
- Price ranges

### learn.html
- Blog posts and articles
- Educational content
- Styling tips and guides

### consign.html
- How to consign your items
- Seller program information
- Submission process

### contact.html
- Contact form with validation
- Business information
- Social media links

## 🔧 Development Tips

### Adding New Products
Edit `js/data.js` and add to the `products` array:

```javascript
{
    id: 7,
    title: 'Product Name',
    price: '$XX',
    category: 'Category',
    emoji: '👗'
}
```

### Customizing Colors
The main color scheme is defined in the CSS animations:
- Green: `#3d5a42` (Primary)
- Amber: Used for accents
- White: `#ffffff` (Background)

Update in `css/styles.css` to change globally.

### Adding New Animations
Add keyframes in `css/styles.css` and apply to elements using `animation` property.

## 📱 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive
- Requires JavaScript enabled

## 🔒 Security Notes

- WhatsApp links are safe - they open the app or web.whatsapp.com
- No sensitive data is stored locally
- Consider using HTTPS when deploying

## 📈 Performance

- Lightweight - no heavy dependencies
- Fast page load times
- Optimized animations with CSS
- Lazy loading ready for images

## 🎁 Customization Ideas

1. **Add product images** - Replace emoji with actual product images
2. **Integrate backend** - Connect to a database for real-time inventory
3. **Add payment gateway** - If moving away from WhatsApp orders
4. **Multi-language support** - Add internationalization
5. **Dark mode** - Add theme toggle
6. **Analytics** - Integrate Google Analytics or similar

## 📄 License

© 2024 BONZERO. All rights reserved.

## 📧 Support

For questions or issues, please contact through the contact form on the website.

---

**Built for sustainability. Designed for style. Coded with care.** 💚
