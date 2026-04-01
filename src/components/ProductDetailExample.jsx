import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductBySlug, urlFor } from '../lib/sanity';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function ProductDetailExample({ product: initialProduct }) {
  const { id } = useParams();
  const [product, setProduct] = useState(initialProduct || null);
  const [loading, setLoading] = useState(!initialProduct);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!initialProduct && id) {
      const fetchProduct = async () => {
        try {
          // id could be slug or _id, try slug first
          const data = await fetchProductBySlug(id);
          setProduct(data);
        } catch (error) {
          console.error('Error fetching product:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id, initialProduct]);

  if (loading) {
    return <div className="text-center py-16">loading...</div>;
  }

  if (!product) {
    return <div className="text-center py-16">product not found</div>;
  }

  const images = product.images || [];
  const selectedImage = images[selectedImageIndex] ? urlFor(images[selectedImageIndex]).url() : '';

  const handleAddToCart = () => {
    addToCart({
      ...product,
      id: product._id,
      image: images[0] ? urlFor(images[0]).url() : ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          {selectedImage && (
            <motion.img
              key={selectedImage}
              src={selectedImage}
              alt={product.title}
              className="w-full h-auto rounded-lg mb-4 object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}

          {/* Thumbnail Gallery */}
          <div className="flex gap-2 overflow-x-auto">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${
                  selectedImageIndex === idx ? 'ring-2 ring-accent-brown' : ''
                }`}
              >
                <img
                  src={urlFor(img).url()}
                  alt={`${product.title} ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <p className="text-xs text-text-light uppercase tracking-wider mb-2">
            {product.category?.name || product.category}
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
            {product.title}
          </h1>

          {product.badge && (
            <span className="inline-block bg-accent-brown text-white px-4 py-2 rounded-lg mb-4 text-sm">
              {product.badge}
            </span>
          )}

          <p className="text-3xl font-bold text-accent-brown mb-6">
            ₹{product.price}
          </p>

          {product.status === 'sold_out' && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              this piece is sold out
            </div>
          )}

          <div className="prose prose-sm max-w-none mb-8">
            <p className="text-text-medium mb-4">{product.description}</p>
            {product.longDescription && (
              <p className="text-text-medium text-sm">{product.longDescription}</p>
            )}
          </div>

          {product.tags && product.tags.length > 0 && (
            <div className="mb-8">
              <p className="text-xs text-text-light uppercase tracking-wider mb-2">tags</p>
              <div className="flex flex-wrap gap-2">
                {product.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-neutral-off-white px-3 py-1 text-xs rounded-full text-text-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={product.status === 'sold_out'}
              className="flex-1 bg-accent-brown text-white font-semibold py-4 rounded-lg hover:bg-accent-green transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              claim this piece
            </button>
            <button
              className="px-6 py-4 border border-text-dark rounded-lg hover:bg-neutral-off-white transition-colors"
            >
              save for later
            </button>
          </div>

          <p className="text-xs text-text-light mt-6">
            only 1 piece. ever.
          </p>
        </div>
      </div>
    </div>
  );
}
