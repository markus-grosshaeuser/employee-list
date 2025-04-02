<?php

namespace BTZ\Customized\EmployeeList;

defined("ABSPATH") or die ("Unauthorized!");

add_shortcode("employee_list_ssf", 'BTZ\Customized\EmployeeList\self_service_form');

function self_service_form() {
	if ( \Elementor\Plugin::$instance->editor->is_edit_mode() ) {
		return 'Employee-List Self-Service-Form won\'t render correctly in Elementor Edit Mode. Please switch to Preview Mode.';
	}

	if (defined('BTZC_EL_BASE_URL')) {
		wp_enqueue_style('btz_customized_employee_list_frontend_stylesheet', BTZC_EL_BASE_URL . 'public/css/public.css');
		wp_enqueue_script('btz_employee_list_jquery', BTZC_EL_BASE_URL . 'public/js/jquery-3.7.1.min.js');
		wp_enqueue_script_module('btz_customized_employee_list_ssf_javascript', BTZC_EL_BASE_URL . 'public/js/self-service-form.js');
	}

	if ($_GET['init_id'] == '99') {
		return '<div id="btzc-el-sign-on-form-container"></div>';
	} else {
		return '<div id="btzc-el-edit-data-form-container"></div>';
	}
}
