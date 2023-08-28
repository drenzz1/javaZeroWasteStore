package com.zerowaste.ecommerce.config;

import com.zerowaste.ecommerce.entity.Country;
import com.zerowaste.ecommerce.entity.Product;
import com.zerowaste.ecommerce.entity.ProductCategory;
import com.zerowaste.ecommerce.entity.State;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.mapping.ExposureConfigurer;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    @Autowired
    public MyDataRestConfig(EntityManager theEntityManagaer){
        entityManager=theEntityManagaer;
    }
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[]theUnsupoortedActions={HttpMethod.PUT,HttpMethod.POST,HttpMethod.DELETE};
        //mos me mujt me i perdor PUT POST DELETE PER PRODUKTE

        disableHttpMethods(config.getExposureConfiguration()
                .forDomainType(Product.class), theUnsupoortedActions);

        //mos me mujt me i perdor PUT POST DELETE PER PRODUKT_category
        disableHttpMethods(config.getExposureConfiguration()
                .forDomainType(ProductCategory.class), theUnsupoortedActions);


        disableHttpMethods(config.getExposureConfiguration()
                .forDomainType(ProductCategory.class), theUnsupoortedActions);


        disableHttpMethods(config.getExposureConfiguration()
                .forDomainType(Country.class), theUnsupoortedActions);

        disableHttpMethods(config.getExposureConfiguration()
                .forDomainType(State.class), theUnsupoortedActions);
        // qe me i shfaq id e merr prej qesaj metodes posht
        exposeIds(config);
    }

    private static void disableHttpMethods(ExposureConfigurer config, HttpMethod[] theUnsupoortedActions) {
        config
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupoortedActions)))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupoortedActions));
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        Set<jakarta.persistence.metamodel.EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        List<Class> entityClasses = new ArrayList<>();

        for (EntityType tempEntityType: entities){
            entityClasses.add(tempEntityType.getJavaType());
        }
        Class [] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);

    }
}
