package com.zerowaste.ecommerce.service;

import com.zerowaste.ecommerce.api.CustomerRepository;
import com.zerowaste.ecommerce.dto.Purchase;
import com.zerowaste.ecommerce.dto.PurchaseResponse;
import com.zerowaste.ecommerce.entity.Customer;
import com.zerowaste.ecommerce.entity.OrderItem;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutSerivceImpl implements CheckoutSerivce{

    private CustomerRepository customerRepository;

    public CheckoutSerivceImpl(CustomerRepository customerRepository){
        this.customerRepository=customerRepository;
    }
    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        // i kthen te dhanat e porosis prej dto
        var order=purchase.getOrder();
        // e gjeneron ni tracking number
        var orderTrackingNumber=generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);
        // shtin orderitems ne order
        Set<OrderItem> orderItems=purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));
        //e shkrun shipping edhe billingadreess
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());
        //e bon bashk customerin me porosin
        Customer customer=purchase.getCustomer();

         String theEmail = customer.getEmail();
         Customer customerFromDb = customerRepository.findByEmail(theEmail);
         if (customerFromDb != null){
             customer=customerFromDb;
         }
        customer.add(order);
        //e run ndatabaz
        customerRepository.save(customer);

        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {
        //e gjeneron ni random number te versionit(UUID)
        return UUID.randomUUID().toString();
    }
}
