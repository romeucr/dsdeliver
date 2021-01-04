package com.rcrdev.dsdeliver.services;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rcrdev.dsdeliver.dto.OrderDTO;
import com.rcrdev.dsdeliver.entities.Order;
import com.rcrdev.dsdeliver.repositories.OrderRepository;

@Service
public class OrderService implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Autowired
	OrderRepository repository;

	@Transactional(readOnly = true)
	public List<OrderDTO> findAll() {
		List<Order> list = repository.findOrdersWithProducts();
		return list.stream().map(x -> new OrderDTO(x)).collect(Collectors.toList());
	}
}
