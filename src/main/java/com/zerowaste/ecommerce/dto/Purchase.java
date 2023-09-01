package com.zerowaste.ecommerce.dto;

import com.zerowaste.ecommerce.entity.Address;
import com.zerowaste.ecommerce.entity.Customer;
import com.zerowaste.ecommerce.entity.Order;
import com.zerowaste.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;

    private Address shippingAddress;

    private Address billingAddress;

    private Order order;

    private Set<OrderItem> orderItems;

}
