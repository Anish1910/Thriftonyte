# 🚀 BONZERO Quick Start Guide

Welcome to BONZERO! This guide will get you up and running in minutes.

## ⚡ 30-Second Setup

1. **Open the site locally:**
   ```bash
   # If you have Python installed:
   python -m http.server 8000
   
   # Then visit: http://localhost:8000
   ```

2. **That's it!** Your site is running.

## 📋 First Steps (5 minutes)

### Step 1: Check the structure
```
FinalDemo/
├── index.html          # Home page
├── about.html          # About page  
├── curations.html      # Product collections
├── learn.html          # Blog/learning
├── consign.html        # Seller program
├── contact.html        # Contact form
├── css/styles.css      # All styles
├── js/main.js          # Core functions
├── js/data.js          # Data & config
└── assets/             # Images & icons
```

### Step 2: Update your info
Edit `js/data.js` and find:
```javascript
const CONFIG = {
    businessName: 'BONZERO',
    whatsappNumber: '+919510381376',  // ← Change this!
    copyrightYear: 2024,
    siteName: 'BONZERO - Sustainable Fashion Marketplace'
};
```

Replace `+1234567890` with your WhatsApp number including country code.

### Step 3: Add your content
The site dynamically loads from `js/data.js`. Want to change products?

```javascript
const products = [
    {
        id: 1,
        title: 'Your Product Name',
        price: '$99',
        category: 'Your Category',
        emoji: '👗'
    },
    // Add more...
];
```

## 🎨 Common Customizations

### Change the site title
Edit each HTML file's `<title>` tag:
```html
<title>Your Store Name - Sustainable Fashion</title>
```

### Change colors
Edit `css/styles.css` and search for hex colors:
- `#3d5a42` - Primary green (changes throughout)
- `#10b981` - Accent green
- `#faf5ef` - Background

### Update navigation links
Edit `js/data.js`:
```javascript
const navLinks = [
    { name: 'Home', href: 'index.html' },
    { name: 'About', href: 'about.html' },
    // ... etc
];
```

### Change company info
In `contact.html`, look for:
```html
<p class="text-gray-600">1234 Fashion Street<br>New York, NY 10001</p>
```

## 📱 Testing on Mobile

1. Open DevTools (F12) → Toggle device toolbar
2. Or visit from phone: `http://192.168.x.x:8000` (replace with your IP)

The site is fully responsive!

## 🚀 Ready to Deploy?

### Option 1: Netlify (Easiest)
1. Go to netlify.com
2. Drag and drop your FinalDemo folder
3. Done! Your site is live

### Option 2: GitHub Pages
1. Push folder to GitHub
2. Enable Pages in repository settings
3. Your site is live at `username.github.io/bonzero`

### Option 3: Traditional Hosting
1. Upload all files via FTP
2. Point your domain
3. Done!

## 🔗 WhatsApp Setup

When users click "Buy Now", they'll message you on WhatsApp.

To customize the message:
Edit `js/main.js`:
```javascript
function buyNowWhatsApp(event, phoneNumber, productName) {
    event.preventDefault();
    const message = `Hi! I'm interested in: ${productName}`;
    redirectToWhatsApp(phoneNumber, message);
}
```

## ✨ Features Explained

| Feature | Where | How to Use |
|---------|-------|-----------|
| **Product List** | Homepage | Edit `products` array in `js/data.js` |
| **Animations** | All pages | Already built-in! Disable in `css/styles.css` if needed |
| **Forms** | Contact, Consign | Already set up. Validation included |
| **Newsletter** | Homepage | Automatically shows success message |
| **Collections** | Curations | Managed from `curations` array |
| **Blog** | Learn page | Edit `learnArticles` array |

## 🐛 Troubleshooting

### "Styles not loading"
- Check browser cache (Ctrl+Shift+Del)
- Ensure `css/styles.css` exists
- Check file paths in HTML

### "Images not showing"
- Add images to `assets/images/` folder
- Update image paths in HTML
- Use relative paths like `assets/images/photo.jpg`

### "WhatsApp link not working"
- Verify phone number format: `+1234567890`
- Include country code
- Test with a known working number

### "Animations too slow"
- Edit animation durations in `css/styles.css`
- Search for `0.6s` or `0.8s` and adjust
- Or disable in browser DevTools

## 📚 Learning Resources

- **Tailwind CSS**: https://tailwindcss.com/docs
- **JavaScript**: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- **HTML/CSS**: https://www.w3schools.com/
- **Responsive Design**: https://web.dev/responsive-web-design/

## 🎯 Next Steps

1. ✅ **Understand the structure** - You did this!
2. ⬜ **Update your info** - Change WhatsApp, colors, content
3. ⬜ **Add your images** - Place in `assets/images/`
4. ⬜ **Test locally** - Run local server
5. ⬜ **Deploy** - Push to Netlify or hosting

## 💡 Pro Tips

- Use Google Fonts for custom typography
- Add analytics via Google Analytics
- Enable HTTPS when deploying
- Test forms before launching
- Optimize images to reduce load time
- Use browser DevTools to debug

## 🆘 Need Help?

Check these files:
- `README.md` - Full documentation
- `CONFIG.md` - Configuration guide
- `js/data.js` - All content data
- `index.html` - See how pages are structured

---

**You're all set! Start customizing and launch your sustainable fashion marketplace! 🌱✨**

Happy coding! 💚
