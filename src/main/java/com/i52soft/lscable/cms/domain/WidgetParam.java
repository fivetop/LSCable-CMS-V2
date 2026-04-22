package com.i52soft.lscable.cms.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@JsonAutoDetect
public class WidgetParam {
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public int getRowspan() {
		return rowspan;
	}
	public void setRowspan(int rowspan) {
		this.rowspan = rowspan;
	}
	public int getColspan() {
		return colspan;
	}
	public void setColspan(int colspan) {
		this.colspan = colspan;
	}
	public int getRowindex() {
		return rowindex;
	}
	public void setRowindex(int rowindex) {
		this.rowindex = rowindex;
	}
	public int getColindex() {
		return colindex;
	}
	public void setColindex(int colindex) {
		this.colindex = colindex;
	}
	@JsonProperty
	private int id; 
	@JsonProperty
	private String description; 
	@JsonProperty
	private String title; 
	@JsonProperty
	private int rowspan; 
	@JsonProperty
	private int colspan; 
	@JsonProperty
	private int rowindex; 
	@JsonProperty
	private int colindex; 
	
}
