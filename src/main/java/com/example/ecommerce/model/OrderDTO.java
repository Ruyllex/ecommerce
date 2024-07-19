package com.example.ecommerce.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter

public class OrderDTO {
    private Long userId;
    private List<OrderItemDTO> items;
    private double total;

}
