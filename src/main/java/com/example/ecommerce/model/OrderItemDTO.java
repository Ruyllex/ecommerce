package com.example.ecommerce.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class OrderItemDTO {
    private Long dishId;
    private int quantity;

    public Long getId() {return dishId;
    }
}
