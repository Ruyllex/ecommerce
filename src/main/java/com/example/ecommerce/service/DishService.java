package com.example.ecommerce.service;
import com.example.ecommerce.model.Dish;
import com.example.ecommerce.repository.DishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DishService {
    @Autowired
    private DishRepository dishRepository;


    public List<Dish> getAllDishes() {
        return dishRepository.findAll();
    }


    public Dish getDishById(Long id) {
        return dishRepository.findById(id).orElse(null);
    }


    public Dish save(Dish dish) {
        return dishRepository.save(dish);
    }

    public void deleteDish(Long id) {
        dishRepository.deleteById(id);
    }
}
