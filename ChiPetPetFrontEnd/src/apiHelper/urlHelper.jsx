export const COMMON_PATH = 'http://127.0.0.1:8000/'

/**
 * @author Faruk Uçgun
 * @date 11.12.2023
 * @abstract: This is a helper file to create the url paths for the backend api calls.
 */

// application 
export const APPLICATION_PATH = () => COMMON_PATH + 'application/';
export const GET_ALL_APPLICATIONS_PATH = () => APPLICATION_PATH() + 'get_all_applications';
export const GET_APPLICATION_BY_ADOPTER_PATH = (adopterId) => APPLICATION_PATH() + 'get_application_by_adopter/?adopter_id=' + adopterId;
export const GET_APPLICATION_BY_SHELTER_PATH = (shelterId) => APPLICATION_PATH() + 'get_application_by_shelter/?animal_shelter_id=' + shelterId;
export const GET_APPLICATION_BY_PET_PATH = (petId) => APPLICATION_PATH() + 'get_application_by_pet/?pet_id=' + petId;
export const GET_APPLICATION_PATH = (applicationId) => APPLICATION_PATH() + 'get_application/?application_id=' + applicationId;
export const CREATE_APPLICATION_PATH = () => APPLICATION_PATH() + 'create_application';
export const UPDATE_APPLICATION_PATH = () => APPLICATION_PATH() + 'update_application';
export const UPDATE_APPLICATION_STATUS_PATH = () => APPLICATION_PATH() + 'update_application_status';
export const DELETE_APPLICATION_PATH = (applicationId) => APPLICATION_PATH() + 'delete_application/?application_id=' + applicationId;

// appointment
export const APPOINTMENT_PATH = () => COMMON_PATH + 'appointment/';
export const GET_APPOINTMENT_PATH = (appointmentId) => APPOINTMENT_PATH() + 'get_appointment/?=appointment_id=' + appointmentId;
export const GET_APPOINTMENT_BY_USER_PATH = (userId) => APPOINTMENT_PATH() + 'get_appointment_by_user/?user_id=' + userId;
export const GET_APPOINTMENT_BY_VETERINARIAN_PATH = (veterinarianId) => APPOINTMENT_PATH() + 'get_appointment_by_veterinarian/?veterinarian_id=' + veterinarianId;
export const CREATE_APPOINTMENT_PATH = () => APPOINTMENT_PATH() + 'create_appointment';
export const UPDATE_APPOINTMENT_PATH = () => APPOINTMENT_PATH() + 'update_appointment';
export const DELETE_APPOINTMENT_PATH = (appointmentId) => APPOINTMENT_PATH() + 'delete_appointment/appointment_id=?' + appointmentId;

// notification
export const NOTIFICATION_PATH = () => COMMON_PATH + 'notification/';
export const GET_NOTIFICATIONS_PATH = (user_id) => NOTIFICATION_PATH() + 'get_notifications/?user_id=' + user_id;
export const GET_NOTIFICATION_PATH = (notificationId, dateAndTime) => NOTIFICATION_PATH() + 'get_notification/?notification_id=' + notificationId + '&date_and_time=' + dateAndTime;
export const GET_RECENT_NOTIFICATIONS_PATH = (notificationId, dateAndTime) => NOTIFICATION_PATH() + 'get_recent_notifications/?notification_id=' + notificationId + '&date_and_time=' + dateAndTime;
export const DELETE_NOTIFICATION_PATH = (notificationId, dateAndTime) => NOTIFICATION_PATH() + 'delete_notification/notification_id=?' + notificationId + '&date_and_time=' + dateAndTime;

// health_record
export const HEALTH_RECORD_PATH = () => COMMON_PATH + "health_record/";
export const UPLOAD_HEALTH_RECORD_PATH = () =>
  HEALTH_RECORD_PATH() + "upload_health_record/";
export const GET_HEALTH_RECORDS_BY_PET_PATH = (pet_id) =>
  HEALTH_RECORD_PATH() + "upload_health_record/?pet_id=" + pet_id;

// pet_create
export const PET_CREATE_PATH = () => COMMON_PATH + "pet_create/";
export const INSERT_PET_PATH = () => PET_CREATE_PATH() + "insert_pet/";
export const GET_PETS_BY_SHELTER_PATH = (user_id) => PET_CREATE_PATH() + "get_pets_by_shelter/?user_id=" + user_id;
export const GET_PETS_BY_TYPE_PATH = (type) => PET_CREATE_PATH() + "get_pets_by_type/?type=" + type;
export const GET_PET_BY_ID_PATH = (petid) => PET_CREATE_PATH() + "get_pet_by_id/?petid=" + petid;

// login register
export const LOGIN_REGISTER_PATH = () => COMMON_PATH + "login_register/";
export const GET_SHELTER_BY_ID_PATH = (shelterid) => LOGIN_REGISTER_PATH() + "get_shelter_by_id/?userid=" + shelterid;
export const GET_ALL_SHELTERS_PATH = () => LOGIN_REGISTER_PATH() + "get_all_shelters/";

// verification documents
export const VERIFICATION_DOCUMENTS_PATH = () =>
  COMMON_PATH + "verification_documents/";
export const GET_UNVERIFIED_DOCUMENTS_PATH = () =>
  VERIFICATION_DOCUMENTS_PATH() + "get_unverified_documents/";
export const UPLOAD_VERIFICATION_DOCUMENT_PATH = () =>
  VERIFICATION_DOCUMENTS_PATH() + "upload_verification_document/";
export const GET_OWN_VERIFICATION_DOCUMENTS_PATH = (user_id) =>
  VERIFICATION_DOCUMENTS_PATH() +
  "get_own_verification_documents/?user_id=" +
  user_id;
export const VERIFY_USER_PATH = () =>
  VERIFICATION_DOCUMENTS_PATH() + "verify_user/";

// message paths
export const MESSAGE_PATH = () => COMMON_PATH + 'message/';
export const GET_MESSAGES_PATH = (user_id) => MESSAGE_PATH() + 'get/?user_id=' + user_id;
export const GET_AFTER_MESSAGES_PATH = (date, user_id) => MESSAGE_PATH() + 'getAfter/?date=' + date + '&user_id=' + user_id;
export const SEND_MESSAGE_PATH = () => MESSAGE_PATH() + 'send';

// blogpost paths
export const BLOGPOST_PATH = () => COMMON_PATH + 'blogpost/';
export const TOPIC_PATH = () => BLOGPOST_PATH + 'topic';
export const GET_TOPIC_BLOGS_PATH = (topic) => BLOGPOST_PATH + 'getTopicBlogs/?topic=' + topic;
export const CREATE_BLOG_PATH = () => BLOGPOST_PATH + 'createBlog';
export const CREATE_COMMENT_PATH = () => BLOGPOST_PATH + 'createComment';
export const GET_BLOG_COMMENTS_PATH = (post_id) => BLOGPOST_PATH + 'getBlogComments/?post_id=' + post_id;
export const UPDATE_BLOG_PATH = () => BLOGPOST_PATH + 'updateBlog';
export const UPDATE_COMMENT_PATH = () => BLOGPOST_PATH + 'updateComment';
export const DELETE_BLOG_PATH = (post_id, user_id) => BLOGPOST_PATH + 'deleteBlog/?post_id=' + post_id + '&user_id=' + user_id;
export const DELETE_COMMENT_PATH = (post_id, comment_id, user_id) => BLOGPOST_PATH + 'deleteComment/?post_id=' + post_id + '&comment_id' + comment_id + '&user_id=' + user_id;
