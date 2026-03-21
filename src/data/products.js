export const products = [
  {
    id: 1,
    title: 'Vintage Leather Jacket',
    price: 900,
    category: 'Outerwear',
    description: 'Classic vintage leather jacket in rich cognac. Timeless piece perfect for any wardrobe. Premium quality with authentic vintage character.',
    images: ['https://images.pexels.com/photos/3622606/pexels-photo-3622606.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/3622606/pexels-photo-3622606.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/3622606/pexels-photo-3622606.jpeg?auto=compress&cs=tinysrgb&w=600'],
    image: 'https://images.pexels.com/photos/3622606/pexels-photo-3622606.jpeg?auto=compress&cs=tinysrgb&w=600',
    badge: 'Curated',
    longDescription: 'This stunning vintage leather jacket is the ultimate wardrobe staple. Crafted from genuine leather, it features a rich cognac color that adds sophistication to any outfit. With its classic tailoring and quality construction, this piece has been carefully restored and is ready for you to make it your own.',
    tags: ['featured', 'rare']
  },
  {
    id: 2,
    title: '80s Denim Edit',
    price: 450,
    category: 'Denim',
    description: 'Authentic 80s high-waisted denim. Perfect vintage condition with authentic character.',
    images: ['https://images.pexels.com/photos/2769274/pexels-photo-2769274.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/2769274/pexels-photo-2769274.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/2769274/pexels-photo-2769274.jpeg?auto=compress&cs=tinysrgb&w=600'],
    image: 'https://images.pexels.com/photos/2769274/pexels-photo-2769274.jpeg?auto=compress&cs=tinysrgb&w=600',
    badge: 'New',
    longDescription: 'Straight from the 80s, these high-waisted denim jeans are a true vintage gem. Featuring that authentic 80s wash and silhouette, they\'re in excellent condition. Perfect for anyone looking to add some retro vibes to their collection.',
    tags: ['trending', 'featured']
  },
  {
    id: 3,
    title: 'Minimalist Sweater',
    price: 350,
    category: 'Knitwear',
    description: 'Soft neutral knit sweater. Minimal, timeless, perfect for layering.',
    images: ['https://images.pexels.com/photos/3622613/pexels-photo-3622613.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/3622613/pexels-photo-3622613.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/3622613/pexels-photo-3622613.jpeg?auto=compress&cs=tinysrgb&w=600'],
    image: 'https://images.pexels.com/photos/3622613/pexels-photo-3622613.jpeg?auto=compress&cs=tinysrgb&w=600',
    badge: null,
    longDescription: 'A timeless neutral sweater that works with everything in your wardrobe. Crafted from soft, quality knitwear, this minimalist piece is perfect for layering or wearing solo. Whether you\'re dressing up or down, this sweater is the perfect addition to your closet.',
    tags: ['featured']
  },
  {
    id: 4,
    title: 'Designer Handbag',
    price: 199,
    category: 'Accessories',
    description: 'Luxury pre-loved handbag. Structured design with elegant details.',
    images: ['https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600'],
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600',
    badge: 'Curated',
    longDescription: 'An elegant designer handbag with structured silhouette and refined details. Though pre-loved, it\'s in excellent condition and ready to add a touch of luxury to your everyday style. A versatile piece that works for any occasion.',
    tags: ['rare']
  },
  {
    id: 5,
    title: 'Classic White Tee',
    price: 150,
    category: 'Basics',
    description: 'Essential white tee. Quality basics that work with everything.',
    images: ['https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=600'],
    image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=600',
    badge: null,
    longDescription: 'The wardrobe essential everyone needs - a perfectly crafted white t-shirt. Made from quality fabric, this classic tee is versatile enough to dress up or down. Layer it, wear it solo, or style it however you like.',
    tags: ['trending']
  },
  {
    id: 6,
    title: 'Vintage Floral Dress',
    price: 520,
    category: 'Dresses',
    description: 'Beautiful vintage floral midi dress. Romantic and timeless.',
    images: ['https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=600'],
    image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=600',
    badge: 'New',
    longDescription: 'This romantic floral midi dress is a vintage treasure. With its beautiful print and elegant silhouette, it\'s perfect for special occasions or elevating your everyday style. A truly timeless piece that never goes out of fashion.',
    tags: ['featured', 'trending']
  }
];

export const CATEGORIES = [
  {
    name: 'Outerwear',
    slug: 'outerwear',
    description: 'Jackets, coats, and layering pieces',
    imageUrl: 'https://images.pexels.com/photos/3622606/pexels-photo-3622606.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    name: 'Denim',
    slug: 'denim',
    description: 'Classic and vintage denim',
    imageUrl: 'https://images.pexels.com/photos/2769274/pexels-photo-2769274.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    name: 'Dresses',
    slug: 'dresses',
    description: 'Dresses for every occasion',
    imageUrl: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'Bags, belts, and more',
    imageUrl: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    name: 'Knitwear',
    slug: 'knitwear',
    description: 'Sweaters and knit pieces',
    imageUrl: 'https://images.pexels.com/photos/3622613/pexels-photo-3622613.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    name: 'Basics',
    slug: 'basics',
    description: 'Timeless essentials',
    imageUrl: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

export const CONFIG = {
  businessName: 'Thriftonyte',
  whatsappNumber: '+919510381376',
  copyrightYear: 2024,
  siteName: 'Thriftonyte - Sustainable Fashion Marketplace'
};
