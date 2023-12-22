import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import { useAlert } from "../../AlertContext";
import { getNotifications } from "../../apiHelper/backendHelper";
import Notification from "./Notification";
import notification_img from "../../assets/notification.png";

/**
 * CHECK IF THIS WORKS CORRECTLY
 */

const Notifications = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { userDetails } = useAuth();
  const { setTimedAlert } = useAlert();

  const toggleNotifications = () => {
    setShowNotifications((prevState) => !prevState);
  };

  useEffect(() => {
    setInterval(() => {
      getNotifications(userDetails.user_id)
        .then((res) => {
          setNotifications(res.data.notifications);
        })
        .catch((err) => {
          setTimedAlert("Error retrieving notifications", "error", 3000);
        });
    }, 100000);
  }, []);

  const deleteNotificationHandler = (user_id, date_and_time) => {
    setNotifications((prevNotifications) => {
      return prevNotifications.filter(
        (notification) => notification.date_and_time !== date_and_time
      );
    });
  };

  return (
    <div>
      <img
        src={notification_img}
        alt="notifications-icon"
        className="notificationIcon"
        onClick={toggleNotifications}
      />
      {showNotifications && (
        <ul className="notificationContainer">
          <h3>Notifications</h3>
          {notifications.map((notification, index) => (
            <Notification
              key={index}
              notification={notification}
              onDeleteNotification={deleteNotificationHandler}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
