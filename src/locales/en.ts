import { I18nLocales } from 'i18n-mini/lib/types';

const app: I18nLocales = {
    a_account_created: 'Created Account',
    a_account_recovery: 'ACCOUNT RECOVERY',
    a_cancel: 'Cancel',
    a_change_password: 'Change Password',
    a_choose_birthday: 'Choose the birthday...',
    a_clear: 'Clear',
    a_close: 'Close',
    a_contact_information: 'CONTACT INFORMATION',
    a_create: 'Create',
    a_dashboard: 'Dashboard',
    a_delete_data: 'Delete Data',
    a_delete: 'Delete',
    a_en: 'English',
    a_enter_first_name: 'Enter First Name',
    a_enter_id_number: 'Enter ID',
    a_enter_last_name: 'Enter Last Name',
    a_enter_name: 'Enter Name',
    a_enter_permissions: 'Select Permissions',
    a_enter_phone: 'Enter Number',
    a_enter_slug: 'Enter Slug',
    a_es: 'Spanish',
    a_filter_by: 'Filter by',
    a_filter_field: 'Filter field',
    a_filter: 'Filter',
    a_gender_other: 'other',
    a_home: 'Home',
    a_list: 'List',
    a_loading: 'Loading',
    a_login: 'Login',
    a_logout: 'Logout',
    a_order_by: 'Order by',
    a_order_field: 'Order field',
    a_password: 'Password',
    a_personal_information: 'PERSONAL INFORMATION',
    a_reload: 'Reload',
    a_repeat_password: 'Repeat Password',
    a_reset: 'Reset',
    a_save: 'Save',
    a_search: 'Search',
    a_select_country: 'Select Country',
    a_select_enable: 'Select State',
    a_select_roles: 'Select Roles',
    a_send: 'Send',
    a_submitting: 'Submitting',
    a_view_more: 'View more',
    a_your_address: 'Your address...',
    a_your_email: 'Your email',
    a_your_password: 'Your password',

};
const auth: I18nLocales = {
    au_can_log_in_data: 'You can log in with your data.',
    au_can_log_in_with: 'You can log in with:',
    au_check_your_box: 'Check your box, we will send you an email with the account activation link.',
    au_check_your_email_change_password: 'Please check your email inbox, to proceed to change your password and then login.',
    au_check_your_email: 'Check your box, we will send you an email ',
    au_email_sent_successfully: 'Message sent successfully',
    au_forgot_password: '¿Forgot your Password?',
    au_go_to_login: 'Go to Login',
    au_password_updated: 'Password Updated',
    au_send_email: 'We sent you an email',
    au_verification_successful: '¡ Verification Successful !',
    au_wait_few_moments: 'wait a few moments...',
    au_we_building: 'We are building everything you need to get started',
};
const appValidations: I18nLocales = {
    av_email_valid: 'Must be a valid email',
    av_one_item: 'Must have at least 1 items',
    av_password_match: 'Passwords must match',
    av_required: 'Required',
    av_too_long: 'Too Long!',
    av_too_short: 'Too Short!',
};

const entities: I18nLocales = {
    User: 'User',
};

const errors: I18nLocales = {
    'app.domain.exceptions.uniqueAttribute': 'Already exists a record with the same value of `{field}`.',
    'app.presentation.exceptions.duplicateEntity': 'Already exists a record with {field} {value}.',
    'auth.domain.exceptions.badCredentials': 'Email or password incorrect.',
    'err_404': 'The page you are looking for doesn&apos;t exist',
    'err_create_user': 'Error at create user',
    'err_login_description': 'Could not start session. Check your email and password or try again later.',
    'err_login': 'Error at login',
    'err_save_role': 'Error at save role',
    'err_save_user': 'Error at save user',
    'err_save': 'Error at save',
    'err_server': 'Error at server',
    'err_view': 'Error at load view',
    'err': 'Error',
    'Forbidden': 'Access denied',
    'HTTP_BAD_REQUEST': 'Error in the request',
    'HTTP_FORBIDDEN': 'Access denied',
    'HTTP_UNPROCESSABLE_ENTITY': 'The record does not meet the validation rules.',
    'shared.exceptions.notFound': 'The resource `{entity}` was not found.',
    'user.domain.exceptions.unverifiedUser': 'The user is not verified.',

};

const properties: I18nLocales = {
    address: 'Address',
    birthday: 'Birthday',
    confirm_password: 'Confirm Password',
    country: 'Country',
    document_number: 'document number',
    email: 'Email',
    enable: 'Enable',
    first_name: 'First Name',
    gender: 'Gender',
    id_number: 'ID number',
    last_name: 'Last Name',
    name: 'Name',
    new_password: 'New Password',
    password: 'Password',
    permissions: 'Permissions',
    phone: 'Phone',
    roles: 'Roles',
    slug: 'Slug',
    type_id: 'Type',

};

const roles: I18nLocales = {
    r_assigned: 'Role/s assigned',
    r_create: 'Create Role',
    r_created: 'Created Role',
    r_list: 'Role List',
    r_no_roles: 'Without Roles',
    r_remove: 'Are you sure you want to delete this role?',
    r_removed: 'The role was removed',
    r_search: '{count, plural, one {Search role} other {Search roles}}',
    r_update: 'Update Role',
    r_updated: 'Role Updated',
};

const user: I18nLocales = {
    u_assigned: 'User/s assigned',
    u_create: 'Create User',
    u_created: 'User created',
    u_list: 'User List',
    u_no_users: 'Without User',
    u_remove: 'Are you sure you want to delete this user?',
    u_removed: 'User Deleted',
    u_search: '{count, plural, one {Search user} other {Search users}}',
    u_update: 'Update User',
    u_updated: 'User updated',
    u_users: 'Users',
    u_view: 'Show User',
};

const en: I18nLocales = {
    ...app,
    ...appValidations,
    ...auth,
    ...entities,
    ...errors,
    ...properties,
    ...roles,
    ...user,
};

export default en;
