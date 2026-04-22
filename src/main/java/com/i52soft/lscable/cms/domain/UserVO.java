package com.i52soft.lscable.cms.domain;

public class UserVO {
	private String userName;
	private String password;
	private String role;	
	private String fullName;

	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	@Override
	public String toString() {
		return "User [id=" + userName + ", role=" + role
				+ ", fullName=" + fullName  + "]";
	}
}
