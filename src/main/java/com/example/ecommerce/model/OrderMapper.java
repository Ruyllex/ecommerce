package com.example.ecommerce.model;
import java.util.List;
import java.util.stream.Collectors;

public class OrderMapper {

    public static OrderDTO toDTO(Order order) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setOrderId(order.getId());

        List<OrderItemDTO> itemDTOs = order.getItems().stream()
                .map(OrderMapper::toDTO)
                .collect(Collectors.toList());

        orderDTO.setItems(itemDTOs);
        return orderDTO;
    }

    public static OrderItemDTO toDTO(OrderItem orderItem) {
        OrderItemDTO itemDTO = new OrderItemDTO();
        itemDTO.setProductId(orderItem.getOrder().getId());
        itemDTO.setQuantity(orderItem.getQuantity());
        return itemDTO;
    }

    public static Order toEntity(OrderDTO orderDTO) {
        Order order = new Order();

        return order;
    }
}