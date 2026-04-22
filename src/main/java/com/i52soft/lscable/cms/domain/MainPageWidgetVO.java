package com.i52soft.lscable.cms.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@JsonAutoDetect
public class MainPageWidgetVO {
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getWidgettype_id() {
		return widgettype_id;
	}
	public void setWidgettype_id(int widgettype_id) {
		this.widgettype_id = widgettype_id;
	}
	public String getContent_data() {
		return content_data;
	}
	public void setContent_data(String content_data) {
		this.content_data = content_data;
	}
	public String getOption_data() {
		return option_data;
	}
	public void setOption_data(String option_data) {
		this.option_data = option_data;
	}
	public String getDisplay_name() {
		return display_name;
	}
	public void setDisplay_name(String display_name) {
		this.display_name = display_name;
	}
	@JsonProperty
	private int id;
	@JsonProperty
	private int widgettype_id;
	@JsonProperty
	private String content_data;
	@JsonProperty
	private String option_data;

	@JsonProperty
	private String display_name;
}
