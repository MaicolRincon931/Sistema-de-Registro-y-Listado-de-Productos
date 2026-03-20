import { useEffect, useState, useCallback } from 'react';
import { getProducts } from '../services/productService';
import { ProductForm } from '../components/ProductForm';
import { ProductTable } from '../components/ProductTable';
import type { Product } from '../types';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError('No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="container mx-auto p-8 max-w-5xl">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-black text-blue-900">Listado de Productos</h1>
        <p className="text-gray-500 mt-2 font-medium italic">Prueba Técnica Fullstack</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <ProductForm onProductSaved={fetchProducts} />
        </div>

        <div className="md:col-span-2">
          {loading && products.length === 0 ? (
            <div className="text-center py-10 font-bold text-gray-400">Cargando...</div>
          ) : error ? (
            <div className="p-4 bg-red-100 text-red-700 rounded border border-red-200">{error}</div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-700 uppercase tracking-widest">Existencias</h2>
                <button
                  onClick={fetchProducts}
                  className="text-blue-600 hover:underline text-xs font-bold"
                >
                  Actualizar
                </button>
              </div>
              <ProductTable products={products} onProductDeleted={fetchProducts} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
