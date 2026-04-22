package com.i52soft.lscable.cms.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Data
@JsonAutoDetect
public class regions {
	@JsonProperty
	private Long id;
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public void setSite(String site) {
		this.site = site;
	}
	
	public void setDepth(String depth) {
		this.depth = depth;
	}
	@JsonProperty
	private String name;
	@JsonProperty
	private String description;
	@JsonProperty
	private String site;
	@JsonProperty
	private String depth;

	@Override
	public String toString() {
		return "regions [id=" + id + ", name=" + name
				+ ", description=" + description  + ", site=" + site + ", depth=" + depth + "]";
	}
	
}