# BONZERO Configuration

## WhatsApp Business Integration

To enable WhatsApp messaging for "Buy Now" buttons:

1. Get your WhatsApp Business Number
   - Go to https://www.whatsapp.com/business
   - Sign up for WhatsApp Business or Business API

2. Format your number with country code (example: +1234567890)

3. Update in `js/data.js`:
   ```javascript
   const CONFIG = {
       businessName: 'BONZERO',
       whatsappNumber: '+YOUR_COUNTRY_CODE_AND_NUMBER',
       copyrightYear: 2024,
       siteName: 'BONZERO - Sustainable Fashion Marketplace'
   };
   ```

## Color Theme

Primary Colors:
- Dark Green: #3d5a42
- Light Green: #10b981
- Amber/Gold: Various shades for accents
- Background: #faf5ef

Edit colors in `css/styles.css`:
- Search for hex values and update them

## Content Updates

### Products
Edit `js/data.js` > `products` array

### Testimonials
Edit `js/data.js` > `testimonials` array

### Learn Articles
Edit `js/data.js` > `learnArticles` array

### Curations
Edit `js/data.js` > `curations` array

## Adding Images

Place images in `assets/images/`:
- Product images: `product-*.jpg`
- Hero images: `hero-*.jpg`
- Featured images: `featured-*.jpg`

Update HTML to reference:
```html
<img src="assets/images/product-name.jpg" alt="Product Name">
```

## Local Development

### Using Python
```bash
python -m http.server 8000
# Visit: http://localhost:8000
```

### Using Node.js
```bash
npx http-server
# Visit: http://localhost:8080
```

## Deployment

### Static Hosting (Recommended)
- Netlify: Drag and drop entire folder
- Vercel: Connect GitHub repository
- GitHub Pages: Push to gh-pages branch
- AWS S3 + CloudFront
- Firebase Hosting

### Domain Setup
Point your domain's DNS to your hosting provider.

## SEO Optimization

1. Update meta descriptions in each HTML file
2. Submit sitemap.xml to Google Search Console
3. Update robots.txt for your domain
4. Add canonical tags if needed
5. Ensure mobile responsiveness

## Performance Tips

1. Optimize images (use TinyPNG or similar)
2. Consider lazy loading for product images
3. Minify CSS/JS for production
4. Use CDN for static assets
5. Enable gzip compression on server

## Analytics

Add Google Analytics or similar to track:
- Page views
- User behavior
- WhatsApp click-through rates
- Newsletter signups

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_ID');
</script>
```

## Support & Customization

For custom features or support, consult:
- Tailwind CSS docs: https://tailwindcss.com
- Vanilla JavaScript patterns
- Web design best practices

---

Keep this site sustainable and user-friendly! 💚
