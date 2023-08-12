package com.zerowaste.ecommerce.config;

import com.zerowaste.ecommerce.entity.Product;
import com.zerowaste.ecommerce.entity.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[]theUnsupoortedActions={HttpMethod.PUT,HttpMethod.POST,HttpMethod.DELETE};
        //mos me mujt me i perdor PUT POST DELETE PER PRODUKTE

        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupoortedActions)))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupoortedActions));

        //mos me mujt me i perdor PUT POST DELETE PER PRODUKT_category
        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupoortedActions)))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupoortedActions));
    }
}
