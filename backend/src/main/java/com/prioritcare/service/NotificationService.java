package com.prioritcare.service;

import com.prioritcare.entity.Notification;
import com.prioritcare.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public String getNotifications() {
        List<Notification> notifications = notificationRepository.findAll();
        return "Total Notifications: " + notifications.size(); 
    }

    public void sendNotification(Long userId, String message) {
        Notification notification = new Notification();
        notification.setUserId(userId);
        notification.setMessage(message);
        notification.setRead(false);

        notificationRepository.save(notification);
    }
}
