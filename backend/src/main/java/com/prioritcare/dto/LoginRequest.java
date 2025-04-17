package com.prioritcare.dto;

public class LoginRequest {
    public String username;
    public String password;

    // Getters and Setters (Optional if you're using Lombok)
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
