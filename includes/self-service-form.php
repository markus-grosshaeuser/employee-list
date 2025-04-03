<?php

namespace BTZ\Customized\EmployeeList;

defined("ABSPATH") or die ("Unauthorized!");

add_shortcode("employee_list_ssf", 'BTZ\Customized\EmployeeList\self_service_form');
function self_service_form() {
	if ( \Elementor\Plugin::$instance->editor->is_edit_mode() ) {
		return 'Employee-List Self-Service-Form won\'t render correctly in Elementor Edit Mode. Please switch to Preview Mode.';
	}

    defined ('BTZC_EL_BASE_URL') or die ('');

    wp_enqueue_style('btz_customized_employee_list_frontend_stylesheet', BTZC_EL_BASE_URL . 'public/css/public.css');
    wp_enqueue_script('btz_employee_list_jquery', BTZC_EL_BASE_URL . 'public/js/jquery-3.7.1.min.js');

    if ($_GET['init_id'] == '99') {
        wp_enqueue_script('btz_customized_employee_list_ssf_sign_on', BTZC_EL_BASE_URL . 'public/js/ssf-sign-on.js');
        return get_sign_on_form_html();
    }

    wp_enqueue_script('btz_customized_employee_list_ssf_edit_data', BTZC_EL_BASE_URL . 'public/js/ssf-edit-data.js');

    if (isset($_POST['btzc-el-edit-data-username']) && isset($_POST['btzc-el-edit-data-pin'])) {
        $employees = Employee::get_all();
        foreach ($employees as $employee) {
            $username = explode($employee->get_email(), "@")[0];
            if ($username == $_POST['btzc-el-edit-data-username']) {
                return get_edit_data_form_html();
            }
        }
    }

    return get_edit_data_log_in_html();
}

function get_sign_on_form_html() {
    $html  = '<div id="btzc-el-sign-on-form-container">';
    $html .= '<div id="btzc-el-sign-on-form-main">';
    $html .= '    <div id ="btzc-el-sign-on-name-row">';
    $html .= '        <input type="text" id="btzc-el-sign-on-firstname" placeholder="Vorame" />';
    $html .= '        <input type="text" id="btzc-el-sign-on-lastname" placeholder="Nachname" />';
    $html .= '    </div>';
    $html .= '    <div id = "btzc-el-sign-on-gender-row">';
    $html .= '        <label for="btzc-el-sign-on-gender-selection">Geschlecht</label>';
    $html .= '        <select id="btzc-el-sign-on-gender-selection">';
    $html .= '            <option value="undefined">Keine Auswahl</option>';
    $html .= '            <option value="male">männlich</option>';
    $html .= '            <option value="female">weiblich</option>';
    $html .= '            <option value="diverse">divers</option>';
    $html .= '        </select>';
    $html .= '    </div>';
    $html .= '    <div id = "btzc-el-sign-on-department-container">';
    $html .= '        <div id = "btzc-el-sign-on-department-label-container">';
    $html .= '            <label for="btzc-el-sign-on-department-selection">Bereich(e)</label>';
    $html .= '        </div>';
    $html .= '        <div id = "btzc-el-sign-on-department-selection-container">';
    $html .=            getDepartmentSelectElement();
    $html .= '        </div>';
    $html .= '    </div>';
    $html .= '    <div id = "btzc-el-sign-on-occupation-container">';
    $html .= '        <div id = "btzc-el-sign-on-occupation-label-container">';
    $html .= '            <label for="btzc-el-sign-on-occupation-selection">Position(en)</label>';
    $html .= '        </div>';
    $html .= '        <div id = "btzc-el-sign-on-occupation-selection-container">';
    $html .=            getOccupationSelectElement();
    $html .= '        </div>';
    $html .= '    </div>';
    $html .= '    <div id = "btzc-el-sign-on-phone-and-room-row">';
    $html .= '        <div id = "btzc-el-sign-on-phone-container">';
    $html .= '            <label for="btzc-el-sign-on-phone-number">Telefonnummer</label>';
    $html .= '            <input type="text" id="btzc-el-sign-on-phone-number" placeholder="Telefonnummer" />';
    $html .= '        </div>';
    $html .= '        <div id = "btzc-el-sign-on-room-container">';
    $html .= '            <label for="btzc-el-sign-on-room-number">Raumnummer</label>';
    $html .= '            <input type="text" id="btzc-el-sign-on-room-number" placeholder="Raumnummer" />';
    $html .= '        </div>';
    $html .= '    </div>';
    $html .= '    <div id = "btzc-el-sign-on-email-row">';
    $html .= '        <label for="btzc-el-sign-on-email-address">E-Mail-Adresse</label>';
    $html .= '        <input type="text" id="btzc-el-sign-on-email-address" placeholder="E-Mail-Adresse" />';
    $html .= '    </div>';
    $html .= '    <div id = "btzc-el-sign-on-info-row">';
    $html .= '        <label for="btzc-el-sign-on-info">Info:</label>';
    $html .= '        <input type="text" id="btzc-el-sign-on-info" placeholder="Vorsicht, wenn ich noch keinen Kaffee hatte!" />';
    $html .= '    </div>';
    $html .= '</div>';
    $html .= '<div id="btzc-el-sign-on-form-secondary">';
    $html .= '    <div id = "btzc-el-sign-on-image-container">';
    $html .= '        <img id="btzc-el-sign-on-form-image" src="' . BTZC_EL_BASE_URL . 'public/images/profile_placeholder.png" alt="Bild" />';
    $html .= '        <input type="file" id="btzc-el-sign-on-form-image-file" accept="image/*" hidden="hidden" />';
    $html .= '    </div>';
    $html .= '    <div id = "btzc-el-sign-on-controls-container">';
    $html .= '        <input type="button" id="btzc-el-sign-on-button-save" value="Speichern" />';
    $html .= '    </div>';
    $html .= '</div>';
    $html .= '</div>';
    return $html;
}

function get_edit_data_log_in_html() {
    $html  = '<div id="btzc-el-edit-data-form-login">';
    $html .= '    <form method="POST">';
    $html .= '        <input type="text" name="btzc-el-edit-data-username" id="btzc-el-edit-data-username" placeholder="Benutzername" />';
    $html .= '        <input type="password" name="btzc-el-edit-data-pin" id="btzc-el-edit-data-pin" placeholder="PIN" />';
    $html .= '        <input type="submit" id="btzc-el-edit-data-button-login" value="Anmelden" />';
    $html .= '    </form>';
    $html .= '</div>';
    return $html;
}

function get_edit_data_form_html() {
    return 'Test';
}

function getDepartmentSelectElement($selected = Array()) {
    $departments = Department::get_all();
    $html = '';
    if (count($selected) == 0) {
        $html .= '<select class="btzc-el-sign-on-department-selection-element">';
        $html .= '    <option value="undefined">...</option>';
        foreach ($departments as $department) {
            $html .= '    <option value="' . $department->get_id() . '">' . $department->get_department() . '</option>';
        }
        $html .= '</select>';
    } else {
        foreach ($selected as $selection) {
            $html .= '<select class="btzc-el-sign-on-department-selection-element">';
            $html .= '    <option value="undefined">...</option>';
            foreach ($departments as $department) {
                if ($department->get_id() == $selection) {
                    $html .= '    <option selected value="' . $department->get_id() . '">' . $department->get_department() . '</option>';
                } else {
                    $html .= '    <option value="' . $department->get_id() . '">' . $department->get_department() . '</option>';
                }
            }
            $html .= '</select>';
        }
    }
    return $html;
}


function getOccupationSelectElement($selected = Array()) {
    $occupations = Occupation::get_all();
    $html = '';
    if (count($selected) == 0) {
        $html .= '<select class="btzc-el-sign-on-occupation-selection-element">';
        $html .= '    <option value="undefined">...</option>';
        foreach ($occupations as $occupation) {
            $html .= '    <option value="' . $occupation->get_id() . '">' . $occupation->get_occupation() . '</option>';
        }
        $html .= '</select>';
    } else {
        foreach ($selected as $selection) {
            $html .= '<select class="btzc-el-sign-on-occupation-selection-element">';
            $html .= '    <option value="undefined">...</option>';
            foreach ($occupations as $occupation) {
                if ($occupation->get_id() == $selection) {
                    $html .= '    <option selected value="' . $occupation->get_id() . '">' . $occupation->get_occupation() . '</option>';
                } else {
                    $html .= '    <option value="' . $occupation->get_id() . '">' . $occupation->get_occupation() . '</option>';
                }
            }
            $html .= '</select>';
        }
    }
    return $html;
}