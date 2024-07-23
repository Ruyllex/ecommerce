package com.example.ecommerce.model;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {
    private Long userId;
    private double total;
    private List<OrderItemRequest> items;
}
