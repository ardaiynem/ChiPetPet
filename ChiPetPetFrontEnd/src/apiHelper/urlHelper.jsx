export const COMMON_PATH = 'http://localhost:8080/'

/**
 * @author Faruk Uçgun
 * @date 11.12.2023
 * @abstract: This is a helper file to create the url paths for the backend api calls. 
 */

// application 
export const APPLICATION_PATH = () => COMMON_PATH + 'application/';
export const GET_APPLICATION_BY_ADOPTER_PATH = (adopterId) => APPLICATION_PATH() + 'get_application_by_adopter/?' + adopterId;
export const GET_APPLICATION_BY_SHELTER_PATH = (shelterId) => APPLICATION_PATH() + 'get_application_by_shelter/?' + shelterId;
export const GET_APPLICATION_BY_PET_PATH = (petId) => APPLICATION_PATH() + 'get_application_by_pet/?' + petId;
export const GET_APPLICATION_PATH = (applicationId) => APPLICATION_PATH() + 'get_application/?' + applicationId;
export const CREATE_APPLICATION_PATH = () => APPLICATION_PATH() + 'create_application';
export const UPDATE_APPLICATION_PATH = () => APPLICATION_PATH() + 'update_application';
export const UPDATE_APPLICATION_STATUS_PATH = () => APPLICATION_PATH() + 'update_application_status';
export const DELETE_APPLICATION_PATH = (applicationId) => APPLICATION_PATH() + 'delete_application/?' + applicationId;

// appointment
export const APPOINTMENT_PATH = () => COMMON_PATH + 'appointment/';
export const GET_APPOINTMENT_PATH = (appointmentId) => APPOINTMENT_PATH() + 'get_appointment/?' + appointmentId;
export const GET_APPOINTMENT_BY_USER_PATH = (userId) => APPOINTMENT_PATH() + 'get_appointment_by_user/?' + userId;
export const GET_APPOINTMENT_BY_VETERINARIAN_PATH = (veterinarianId) => APPOINTMENT_PATH() + 'get_appointment_by_veterinarian/?' + veterinarianId;
export const CREATE_APPOINTMENT_PATH = () => APPOINTMENT_PATH() + 'create_appointment';
export const UPDATE_APPOINTMENT_PATH = () => APPOINTMENT_PATH() + 'update_appointment';
export const DELETE_APPOINTMENT_PATH = (appointmentId) => APPOINTMENT_PATH() + 'delete_appointment/?' + appointmentId;

// notification
export const NOTIFICATION_PATH = () => COMMON_PATH + 'notification/';
export const GET_NOTIFICATIONS_PATH = () => NOTIFICATION_PATH() + 'get_notifications';
export const GET_NOTIFICATION_PATH = (notificationId, dateAndTime) => NOTIFICATION_PATH() + 'get_notification/?' + notificationId + '&' + dateAndTime;
export const GET_RECENT_NOTIFICATIONS_PATH = (notificationId, dateAndTime) => NOTIFICATION_PATH() + 'get_recent_notifications/?' + notificationId + '&' + dateAndTime;
export const DELETE_NOTIFICATION_PATH = (notificationId, dateAndTime) => NOTIFICATION_PATH() + 'delete_notification/?' + notificationId + '&' + dateAndTime;

