package com.example.ecommerce.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class menuController {
    @GetMapping("/menu")
    public String menuController(){
        return "redirect:/menu.html";
    }
}
