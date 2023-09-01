package com.zerowaste.ecommerce.service;

import com.zerowaste.ecommerce.dto.Purchase;
import com.zerowaste.ecommerce.dto.PurchaseResponse;

public interface CheckoutSerivce {
    PurchaseResponse placeOrder(Purchase purchase);

}
