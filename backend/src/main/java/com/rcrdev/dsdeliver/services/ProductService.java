package com.rcrdev.dsdeliver.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rcrdev.dsdeliver.dto.ProductDTO;
import com.rcrdev.dsdeliver.entities.Product;
import com.rcrdev.dsdeliver.repositories.ProductRepository;

@Service
public class ProductService {
	
	@Autowired
	ProductRepository repository;

	@Transactional(readOnly = true)
	public List<ProductDTO> findAll() {
		List<Product> list = repository.findAllByOrderByNameAsc();
		return list.stream().map(x -> new ProductDTO(x)).collect(Collectors.toList());
	}
}
