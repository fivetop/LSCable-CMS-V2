package com.i52soft.lscable.cms.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@JsonAutoDetect
public class ChartWidgetVO extends MainPageWidgetVO {
	@JsonProperty
	private int mainpage_id; 
	@JsonProperty
	private int colindex;
	@JsonProperty
	private int rowindex;
	@JsonProperty
	private String title; 
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public int getMainpage_id() {
		return mainpage_id;
	}
	public void setMainpage_id(int mainpage_id) {
		this.mainpage_id = mainpage_id;
	}
	public int getColindex() {
		return colindex;
	}
	public void setColindex(int colindex) {
		this.colindex = colindex;
	}
	public int getRowindex() {
		return rowindex;
	}
	public void setRowindex(int rowindex) {
		this.rowindex = rowindex;
	}
}
