import React from "react";
import { useAuth } from "../../AuthContext";
import { useAlert } from "../../AlertContext";
import { deleteNotification } from "../../apiHelper/backendHelper";
import "./Notifications.css";

const Notification = (props) => {
    const { notification, onDeleteNotification } = props;
    const { topic, date_and_time, description } = notification;
    const { userDetails } = useAuth();
    const { setTimedAlert } = useAlert();

    const deleteNotificationHandler = () => {
        deleteNotification(userDetails.user_id, notification.date_and_time)
            .then((res) => {
                onDeleteNotification(userDetails.user_id, notification.date_and_time);
            })
            .catch((err) => {
                setTimedAlert("Error deleting notification", "error", 3000);
            });
    };

    return (
        <li className="notification">
            <button className="delete-notification" onClick={deleteNotificationHandler}>X</button>
            <h3>{topic}</h3>
            <p>{date_and_time.toString()}</p>
            <p>{description}</p>
        </li>
    );    
};

export default Notification;