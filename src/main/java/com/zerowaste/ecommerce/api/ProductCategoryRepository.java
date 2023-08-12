package com.zerowaste.ecommerce.api;

import com.zerowaste.ecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "productCategory",//Emri i json entry
        path = "product-category")// path per /product-category
public interface ProductCategoryRepository extends JpaRepository<ProductCategory,Long> {
}
