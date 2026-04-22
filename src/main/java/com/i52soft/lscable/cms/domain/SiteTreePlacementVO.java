package com.i52soft.lscable.cms.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@JsonAutoDetect
public class SiteTreePlacementVO {
	@JsonProperty
	private int id;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getSitetree_id() {
		return sitetree_id;
	}
	public void setSitetree_id(int sitetree_id) {
		this.sitetree_id = sitetree_id;
	}
	public String getJson_data() {
		return json_data;
	}
	public void setJson_data(String json_data) {
		this.json_data = json_data;
	}
	@JsonProperty
	private int sitetree_id;
	@JsonProperty
	private String json_data;
}
