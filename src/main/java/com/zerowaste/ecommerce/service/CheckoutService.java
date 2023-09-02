package com.zerowaste.ecommerce.service;

import com.zerowaste.ecommerce.dto.Purchase;
import com.zerowaste.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
