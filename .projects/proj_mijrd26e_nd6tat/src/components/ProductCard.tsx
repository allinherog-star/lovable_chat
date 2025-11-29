import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white hover:shadow-xl transition-shadow duration-200 border border-transparent hover:border-[#eee] p-3 flex flex-col">
      <div className="relative aspect-square overflow-hidden mb-3">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover cursor-pointer"
        />
      </div>
      
      {/* Price */}
      <div className="text-jd-red font-bold text-lg mb-1">
        <span className="text-sm">¥</span>
        {Math.floor(product.price)}
        <span className="text-sm">.{product.price.toFixed(2).split('.')[1]}</span>
      </div>

      {/* Name */}
      <div className="text-sm text-[#666] leading-5 h-10 overflow-hidden mb-2 cursor-pointer hover:text-jd-red">
        {product.isSelfOperated && (
          <span className="bg-jd-red text-white text-xs px-1 rounded-sm mr-1 align-text-bottom">自营</span>
        )}
        {product.name} {product.description}
      </div>

      {/* Comments */}
      <div className="flex items-center text-xs text-[#a7a7a7] mb-2">
        <span className="text-[#646fb0] font-bold mr-1">{product.comments}</span>
        <span>条评价</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3 h-5 overflow-hidden">
        {product.tags?.map((tag, idx) => (
          <span key={idx} className="border border-jd-red text-jd-red text-xs px-1 rounded-sm">
            {tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-auto flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => onAddToCart(product)}
          className="flex-1 flex items-center justify-center border border-[#ddd] bg-white text-jd-red text-sm py-1.5 hover:bg-[#f7f7f7] hover:border-jd-red transition-colors"
        >
          <ShoppingCart className="w-4 h-4 mr-1" />
          加入购物车
        </button>
      </div>
    </div>
  );
};
