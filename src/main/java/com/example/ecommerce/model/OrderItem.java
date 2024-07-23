package com.example.ecommerce.model;
import jakarta.persistence.*;
import lombok.*;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "dish_id")
    private Dish dish;

    private int quantity;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

}