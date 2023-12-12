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

// health_record 
export const HEALTH_RECORD_PATH = () => COMMON_PATH + 'health_record/';
export const UPLOAD_HEALTH_RECORD_PATH = () => HEALTH_RECORD_PATH() + 'upload_health_record/';
export const GET_HEALTH_RECORDS_BY_PET_PATH = (pet_id) => HEALTH_RECORD_PATH() + 'upload_health_record/?pet_id=' + pet_id;

// pet_create
export const PET_CREATE_PATH = () => COMMON_PATH + 'pet_create/';
export const INSERT_PET_PATH = () => PET_CREATE_PATH() + 'insert_pet/';
export const GET_PETS_BY_SHELTER_PATH = (user_id) => PET_CREATE_PATH() + 'get_pets_by_shelter/?user_id=' + user_id; 

// verification documents
export const VERIFICATION_DOCUMENTS_PATH = () => COMMON_PATH + 'verification_documents/';
export const GET_UNVERIFIED_DOCUMENTS_PATH = () => VERIFICATION_DOCUMENTS_PATH() + 'get_unverified_documents/';
export const UPLOAD_VERIFICATION_DOCUMENT_PATH = () => VERIFICATION_DOCUMENTS_PATH() + 'upload_verification_document/';
export const GET_OWN_VERIFICATION_DOCUMENTS_PATH = (user_id) => VERIFICATION_DOCUMENTS_PATH() + 'get_own_verification_documents/?user_id=' + user_id;
export const VERIFY_USER_PATH = () => VERIFICATION_DOCUMENTS_PATH() + 'verify_user/';