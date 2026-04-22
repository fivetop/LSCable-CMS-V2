package com.i52soft.lscable.cms.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@JsonAutoDetect
public class ProductVO {
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getType_id() {
		return type_id;
	}
	public void setType_id(int type_id) {
		this.type_id = type_id;
	}
	public String getType_name() {
		return type_name;
	}
	public void setType_name(String type_name) {
		this.type_name = type_name;
	}	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getImage_tree() {
		return image_tree;
	}
	public void setImage_tree(String image_tree) {
		this.image_tree = image_tree;
	}
	public String getImage_default() {
		return image_default;
	}
	public void setImage_default(String image_default) {
		this.image_default = image_default;
	}
	public int getManufacturer_id() {
		return manufacturer_id;
	}
	public void setManufacturer_id(int manufacturer_id) {
		this.manufacturer_id = manufacturer_id;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public String getImage_map() {
		return image_map;
	}
	public void setImage_map(String image_map) {
		this.image_map = image_map;
	}
	public int getTotal_port() {
		return total_port;
	}
	public void setTotal_port(int total_port) {
		this.total_port = total_port;
	}
	public int getU_height() {
		return u_height;
	}
	public void setU_height(int u_height) {
		this.u_height = u_height;
	}
	public int getU_size() {
		return u_size;
	}
	public void setU_size(int u_size) {
		this.u_size = u_size;
	}
	public Boolean getFull_depth() {
		return full_depth;
	}
	public void setFull_depth(Boolean full_depth) {
		this.full_depth = full_depth;
	}
	public String getImage_rack_front() {
		return image_rack_front;
	}
	public void setImage_rack_front(String image_rack_front) {
		this.image_rack_front = image_rack_front;
	}
	public String getImage_rack_rear() {
		return image_rack_rear;
	}
	public void setImage_rack_rear(String image_rack_rear) {
		this.image_rack_rear = image_rack_rear;
	}
	public String getImage_rack_front3d() {
		return image_rack_front3d;
	}
	public void setImage_rack_front3d(String image_rack_front3d) {
		this.image_rack_front3d = image_rack_front3d;
	}
	public String getImage_rack_rear3d() {
		return image_rack_rear3d;
	}
	public void setImage_rack_rear3d(String image_rack_rear3d) {
		this.image_rack_rear3d = image_rack_rear3d;
	}	
	public String getDimensions() {
		return dimensions;
	}
	public void setDimensions(String dimensions) {
		this.dimensions = dimensions;
	}
	public String getImage_linkage_connection() {
		return image_linkage_connection;
	}
	public void setImage_linkage_connection(String image_linkage_connection) {
		this.image_linkage_connection = image_linkage_connection;
	}
	public Boolean getIs_product() {
		return is_product;
	}
	public void setIs_product(Boolean is_product) {
		this.is_product = is_product;
	}
	public Boolean getIs_nms() {
		return is_nms;
	}
	public void setIs_nms(Boolean is_nms) {
		this.is_nms = is_nms;
	}
	public Integer getRack_type_id() {
		return rack_type_id;
	}
	public void setRack_type_id(Integer rack_type_id) {
		this.rack_type_id = rack_type_id;
	}
	
	@JsonProperty
	private int id;
	@JsonProperty
	private int type_id;
	@JsonProperty
	private String name;
	@JsonProperty
	private String description;
	@JsonProperty
	private String image_tree;
	@JsonProperty
	private String image_default;
	@JsonProperty
	private int manufacturer_id;
	@JsonProperty
	private String model;
	@JsonProperty
	private String image_map;
	@JsonProperty
	private int total_port;
	@JsonProperty
	private int u_height;
	@JsonProperty
	private int u_size;
	@JsonProperty
	private Boolean full_depth;
	@JsonProperty
	private String image_rack_front;
	@JsonProperty
	private String image_rack_rear;
	@JsonProperty
	private String image_rack_front3d;
	@JsonProperty
	private String image_rack_rear3d;	
	@JsonProperty
	private String dimensions;
	@JsonProperty
	private String image_linkage_connection;
	@JsonProperty
	private Boolean is_product;
	@JsonProperty
	private Boolean is_nms;
	@JsonProperty
	private String type_name;
	@JsonProperty
	private Integer rack_type_id;
	
}	

