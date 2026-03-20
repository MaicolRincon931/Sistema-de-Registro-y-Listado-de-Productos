package maicol.product_api.service;

import maicol.product_api.model.Product;
import maicol.product_api.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("El producto con ID " + id + " no fue encontrado"));
    }

    public Product saveProduct(Product product) {

        if (product.getPrice() == null || product.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("El precio del producto debe ser mayor que 0");
        }

        if (product.getStock() == null || product.getStock() < 0) {
            throw new IllegalArgumentException("El stock del producto no puede ser negativo");
        }

        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("No se puede eliminar: El producto con ID " + id + " no existe");
        }

        productRepository.deleteById(id);
    }
}
