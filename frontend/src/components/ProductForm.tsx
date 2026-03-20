import { useState } from 'react';
import { saveProduct } from '../services/productService';
import type { Product } from '../types';

interface ProductFormProps {
  onProductSaved: () => void;
}

export function ProductForm({ onProductSaved }: ProductFormProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price || !stock) return;

    try {
      setLoading(true);
      setError(null);

      const newProduct: Product = {
        name: name.trim(),
        price: parseFloat(price),
        stock: parseInt(stock, 10),
      };

      await saveProduct(newProduct);


      setName('');
      setPrice('');
      setStock('');

      onProductSaved();

    } catch (err) {
      console.error('Error al guardar el producto:', err);
      setError('Ocurrió un error al guardar el producto. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Nuevo Producto</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-100 text-red-700 text-sm rounded border border-red-200">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Ingrese el nombre"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Precio</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="0"
              step="0.01"
              className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
              min="0"
              className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="0"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition-colors disabled:bg-blue-300 mt-4"
        >
          {loading ? 'Guardando...' : 'Registrar'}
        </button>
      </form>
    </div>
  );
}
