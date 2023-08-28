package com.zerowaste.ecommerce.controller;

import com.zerowaste.ecommerce.dto.Purchase;
import com.zerowaste.ecommerce.dto.PurchaseResponse;
import com.zerowaste.ecommerce.service.CheckoutSerivce;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {
    private CheckoutSerivce checkoutSerivce;

    public CheckoutController(CheckoutSerivce checkoutSerivce){
        this.checkoutSerivce=checkoutSerivce;
    }
    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){
        PurchaseResponse purchaseResponse = checkoutSerivce.placeOrder(purchase);

        return purchaseResponse;
    }
}
