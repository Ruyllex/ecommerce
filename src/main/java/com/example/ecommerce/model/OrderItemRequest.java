package com.example.ecommerce.model;
import lombok.*;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemRequest {
    private Long dish;
    private int quantity;
}
