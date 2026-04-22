package com.i52soft.lscable.cms.domain;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@JsonAutoDetect
public class MainPageLayoutVO {
	public int getId() {
		return id;
	}
	public void setId(int id) {
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
	public int getLayout() {
		return layout;
	}
	public void setLayout(int layout) {
		this.layout = layout;
	}
	public int getTheme() {
		return theme;
	}
	public void setTheme(int theme) {
		this.theme = theme;
	}
	public int getCreator_id() {
		return creator_id;
	}
	public void setCreator_id(int creator_id) {
		this.creator_id = creator_id;
	}
	public String getJson_data() {
		return json_data;
	}
	public void setJson_data(String json_data) {
		this.json_data = json_data;
	}
	public Boolean getIs_deleted() {
		return is_deleted;
	}
	public void setIs_deleted(Boolean is_deleted) {
		this.is_deleted = is_deleted;
	}	
	public List<WidgetParam> getWidgets() {
		return widgets;
	}
	public void setWidgets(List<WidgetParam> widgets) {
		this.widgets = widgets;
	}
	public String getCreator_name() {
		return creator_name;
	}
	public void setCreator_name(String creator_name) {
		this.creator_name = creator_name;
	}
	@JsonProperty
	private int id;
	@JsonProperty
	private String name;
	@JsonProperty
	private String description;
	@JsonProperty
	private int layout;
	@JsonProperty
	private int theme;
	@JsonProperty
	private int creator_id;
	@JsonProperty
	private String creator_name;
	@JsonProperty
	private String json_data;
	@JsonProperty
	private Boolean is_deleted;
	@JsonProperty
	private List<WidgetParam> widgets;
}
