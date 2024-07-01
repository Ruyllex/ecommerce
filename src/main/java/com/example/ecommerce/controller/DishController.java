package com.example.ecommerce.controller;

import com.example.ecommerce.model.Dish;
import com.example.ecommerce.service.DishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dishes")
public class DishController {
    @Autowired
    private DishService dishService;

    @GetMapping
    public List<Dish> getProducts() {
        return dishService.getAllDishes();
    }

    @PostMapping
    public Dish createProduct(@RequestBody Dish product) {
        return dishService.save(product);
    }
    @GetMapping("/{id}")
    public Dish getDish(@PathVariable Long id){
        return dishService.getDishById(id);
    }
}