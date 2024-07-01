package com.example.ecommerce.controller;
import com.example.ecommerce.model.Dish;
import com.example.ecommerce.model.Order;
import com.example.ecommerce.model.OrderItem;
import com.example.ecommerce.model.User;
import com.example.ecommerce.repository.DishRepository;
import com.example.ecommerce.repository.OrderRepository;
import com.example.ecommerce.repository.UserRepository;
import com.example.ecommerce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DishRepository dishRepository;
    @Autowired
    private OrderRepository orderRepository;

    @GetMapping
    public List<Order> getOrders() {
        return orderService.getOrder();
    }
    
    @GetMapping("/total-price/{id}")
    public int obtainTotalPriceOrder(@PathVariable Long id){
        return orderService.obtainOrderPrice(id);
    }
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {

        Optional<User> userOptional = userRepository.findById(order.getUser().getId());
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        for (OrderItem item : order.getItems()) {
            Optional<Dish> dishOptional = dishRepository.findById(item.getDish().getId());
            if (dishOptional.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            item.setDish(dishOptional.get());
            item.setOrder(order);
        }

        order.setUser(userOptional.get());
        Order savedOrder = orderRepository.save(order);
        return new ResponseEntity<>(savedOrder, HttpStatus.CREATED);
    }
}
