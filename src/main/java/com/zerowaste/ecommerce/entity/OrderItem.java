package com.zerowaste.ecommerce.entity;


import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;


@Entity
@Table(name = "order_item")
@Getter
@Setter
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="imageUrl")
    private String imageUrl;

    @Column(name="quantity")
    private int quantity;

    @Column(name="unit_price")
    private BigDecimal state;

    @Column(name = "product_id")
    private Long productId;

    @ManyToOne
    @JoinColumn(name="order_id")
    private Order order;

}
