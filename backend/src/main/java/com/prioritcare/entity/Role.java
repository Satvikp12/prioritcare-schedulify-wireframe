
package com.prioritcare.entity;

public enum Role {
    ADMIN("admin"),
    DOCTOR("doctor"),
    PATIENT("patient");

    private final String value;

    Role(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
