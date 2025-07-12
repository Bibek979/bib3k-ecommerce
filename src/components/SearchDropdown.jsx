import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, TrendingUp } from 'lucide-react';
import { mockProducts } from '../data/mockData';

const SearchDropdown = ({ searchQuery, onClose }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [popularSearches] = useState([
    'headphones', 'smartphone', 'laptop', 'watch', 'camera'
  ]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filteredSuggestions = mockProducts
        .filter(product => 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (searchQuery.length === 0) {
    return (
      <div ref={dropdownRef} className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 mt-2">
        <div className="p-4">
          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
            <TrendingUp className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Popular Searches</span>
          </div>
          <div className="space-y-2">
            {popularSearches.map((search, index) => (
              <Link
                key={index}
                to={`/products?search=${search}`}
                className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                onClick={onClose}
              >
                {search}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 mt-2">
      <div className="p-4">
        {suggestions.length > 0 ? (
          <>
            <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
              <Search className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Products</span>
            </div>
            <div className="space-y-2">
              {suggestions.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                  onClick={onClose}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded-md mr-3"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      ${product.price} • {product.category}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
              <Link
                to={`/products?search=${searchQuery}`}
                className="block px-3 py-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                onClick={onClose}
              >
                View all results for "{searchQuery}"
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <Search className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No products found for "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDropdown;
