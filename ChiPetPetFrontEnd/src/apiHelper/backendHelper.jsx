import { getFetcher, postFetcher, putFetcher, patchFetcher, deleteFetcher } from "./apiHelper";
import * as url from "./urlHelper";

/**
 * @author Faruk Uçgun
 * @date 11.12.2023
 * @abstract: This file is responsible for making requests to backend 
 */

// application
export const getApplicationByAdopter = async (adopterId) => {
    return await getFetcher(url.GET_APPLICATION_BY_ADOPTER_PATH(adopterId));
}

export const getApplicationByShelter = async (shelterId) => {
    return await getFetcher(url.GET_APPLICATION_BY_SHELTER_PATH(shelterId));
}

export const getApplicationByPet = async (petId) => {
    return await getFetcher(url.GET_APPLICATION_BY_PET_PATH(petId));
}

export const getApplication = async (applicationId) => {    
    return await getFetcher(url.GET_APPLICATION_PATH(applicationId));
}

export const createApplication = async (data) => {
    return await postFetcher(url.CREATE_APPLICATION_PATH(), data);
}

export const updateApplication = async (data) => {
    return await putFetcher(url.UPDATE_APPLICATION_PATH(), data);
}

export const updateApplicationStatus = async (data) => {
    return await putFetcher(url.UPDATE_APPLICATION_STATUS_PATH(), data);
}

export const deleteApplication = async (applicationId) => {
    return await deleteFetcher(url.DELETE_APPLICATION_PATH(applicationId));
}

// appointment
export const getAppointment = async (appointmentId) => {
    return await getFetcher(url.GET_APPOINTMENT_PATH(appointmentId));
}

export const getAppointmentByUser = async (userId) => {
    return await getFetcher(url.GET_APPOINTMENT_BY_USER_PATH(userId));
}

export const getAppointmentByVeterinarian = async (veterinarianId) => {
    return await getFetcher(url.GET_APPOINTMENT_BY_VETERINARIAN_PATH(veterinarianId));
}

export const createAppointment = async (data) => {
    return await postFetcher(url.CREATE_APPOINTMENT_PATH(), data);
}

export const updateAppointment = async (data) => {
    return await putFetcher(url.UPDATE_APPOINTMENT_PATH(), data);
}

export const deleteAppointment = async (appointmentId) => {
    return await deleteFetcher(url.DELETE_APPOINTMENT_PATH(appointmentId));
}

// notification
export const getNotifications = async () => {
    return await getFetcher(url.GET_NOTIFICATIONS_PATH());
}

export const getNotification = async (notificationId, date_and_time) => {
    return await getFetcher(url.GET_NOTIFICATION_PATH(notificationId, date_and_time));
}

export const getRecentNotifications = async (notificationId, date_and_time) => {
    return await getFetcher(url.GET_RECENT_NOTIFICATIONS_PATH(notificationId, date_and_time));
}

export const deleteNotification = async (notificationId, date_and_time) => {
    return await deleteFetcher(url.DELETE_NOTIFICATION_PATH(notificationId, date_and_time));
}

// health record
export const uploadHealthRecord = async () => {
    return await postFetcher(url.UPLOAD_HEALTH_RECORD_PATH());
}

export const getHealthRecordsByPet = async (pet_id) => {
    return await getFetcher(url.GET_HEALTH_RECORDS_BY_PET_PATH(pet_id));
}

// pet create
export const insertPet = async () => {
    return await postFetcher(url.INSERT_PET_PATH());
}

export const getPetsByShelter = async (user_id) => {
    return await getFetcher(url.GET_PETS_BY_SHELTER_PATH(user_id));
}

// verification documents

export const getUnverifiedDocuments = async () => {
    return await getFetcher(url.GET_UNVERIFIED_DOCUMENTS_PATH());
}

export const uploadVerificationDocument = async () => {
    return await postFetcher(url.UPLOAD_VERIFICATION_DOCUMENT_PATH());
}

export const getOwnVerificationDocuments = async (user_id) => {
    return await getFetcher(url.GET_OWN_VERIFICATION_DOCUMENTS_PATH(user_id));
}

export const verifyUser = async () => {
    return await putFetcher(url.VERIFY_USER_PATH());
}

// login register
export const register = async () => {
    return await postFetcher(url.REGISTER_PATH());
}

export const login = async () => {
    return await postFetcher(url.LOGIN_PATH());
}

export const resetPassword = async () => {
    return await putFetcher(url.RESET_PASSWORD_PATH());
}

export const changePassword = async () => {
    return await putFetcher(url.CHANGE_PASSWORD_PATH());
}