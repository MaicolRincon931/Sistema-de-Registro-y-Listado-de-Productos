import { useState } from 'react';
import { deleteProduct } from '../services/productService';
import { ConfirmationModal } from './ConfirmationModal';
import { ProductEditModal } from './ProductEditModal';
import type { Product } from '../types';

interface ProductTableProps {
  products: Product[];
  onProductDeleted: () => void;
  onProductUpdated: () => void;
}

export function ProductTable({ products, onProductDeleted, onProductUpdated }: ProductTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleDeleteClick = (id: number) => {
    setSelectedProductId(id);
    setIsModalOpen(true);
  };

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedProductId !== null) {
      try {
        await deleteProduct(selectedProductId);
        onProductDeleted();
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
        alert('No se pudo eliminar el producto.');
      } finally {
        setIsModalOpen(false);
        setSelectedProductId(null);
      }
    }
  };

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
          <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 className="text-gray-900 font-medium">No hay productos registrados</h3>
        <p className="text-gray-500 text-sm mt-1">Usa el formulario para añadir tu primer producto.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 border-b border-gray-200 text-left font-bold">Nombre</th>
            <th className="p-3 border-b border-gray-200 text-left font-bold">Precio</th>
            <th className="p-3 border-b border-gray-200 text-left font-bold text-center">Stock</th>
            <th className="p-3 border-b border-gray-200 text-center font-bold">Acción</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
              <td className="p-3 text-gray-800">{product.name}</td>
              <td className="p-3 text-gray-600 font-medium">
                ${product.price ? product.price.toFixed(2) : '0.00'}
              </td>
              <td className="p-3 text-center">
                <span className={`px-2 py-1 rounded text-xs font-bold ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                  {product.stock}
                </span>
              </td>
              <td className="p-3 text-center flex justify-center space-x-2">
                <button
                  onClick={() => handleEditClick(product)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded text-xs px-4"
                >
                  Editar
                </button>
                <button
                  onClick={() => product.id && handleDeleteClick(product.id)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded text-xs px-4"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Eliminar producto?"
        message="Esta seguro de que deseas eliminar este producto?"
      />

      <ProductEditModal
        isOpen={isEditModalOpen}
        product={selectedProduct}
        onClose={() => setIsEditModalOpen(false)}
        onProductUpdated={onProductUpdated}
      />
    </div>
  );
}
