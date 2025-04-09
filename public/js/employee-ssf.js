jQuery(function($) {


    let image = $('#btzc-el-self-service-form-image');
    let imageFileUpload = $('#btzc-el-self-service-form-image-file');
    let imageUploadButton = $('#btzc-el-self-service-button-fileupload');
    let imageTemplateButton = $('#btzc-el-self-service-button-template');
    let placeholderImageUrl = image.data('default');

    let departmentContainer = $('#btzc-el-self-service-department-selection-container');
    let occupationContainer = $('#btzc-el-self-service-occupation-selection-container');

    let wordpressAccessCheckbox = $('#btzc-el-self-service-wordpress-account-checkbox');
    let wordpressAccesscontainer = $('#btzc-el-self-service-wordpress-account-data-container');
    let wordpressAccessUsername = $('#btzc-el-self-service-username');
    let wordpressAccessPassword = $('#btzc-el-self-service-password');

    let saveDataButton = $('#btzc-el-self-service-button-submit');



    let forgotPin = $('#btzc-el-edit-data-button-forgot-pin');
    let usernameInput = $('#btzc-el-edit-data-username');
    let passwordInput = $('#btzc-el-edit-data-password');

    forgotPin.on('click', function () {
        if (usernameInput.val() === '') {
            if (! usernameInput.hasClass('is-invalid')) {
                usernameInput.addClass('is-invalid');
                $('#btzc-el-edit-data-info-no-username').show()
                usernameInput.trigger('focus');
            }
            return;
        }
        let username = usernameInput.val().toString();
        if (username.includes('@')) {
            username = username.split('@')[0];
        }

        const formData = new FormData();
        formData.append('action', 'btzc_el_reset_pin');
        formData.append('btzc-el-reset-pin-username', username);
        $.ajax ({
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                alert("Ihr neuer Pin wurde an Ihre E-Mail Adresse gesendet.")
                if (usernameInput.hasClass('is-invalid')) {
                    usernameInput.removeClass('is-invalid');
                    $('#btzc-el-edit-data-info-no-username').hide()
                    passwordInput.trigger('focus');
                }
            },
            error: function (response) {
                alert("Es ist ein interner Fehler aufgetreten.\nBitte wenden Sie sich an das Wiki-Team.")
            }
        });
    })






    wordpressAccesscontainer.slideUp(0);

    departmentContainer.on('input', '.btzc-el-self-service-department-selection-element', function () {
        if (this === departmentContainer.children().last().get(0)) {
            departmentContainer.append(departmentContainer.children().last().clone())
        } else {
            this.value === 'undefined'? $(this).remove(): '';
        }
    })


    occupationContainer.on('input', '.btzc-el-self-service-occupation-selection-element', function () {
        if (this === occupationContainer.children().last().get(0)) {
            occupationContainer.append(occupationContainer.children().last().clone())
        } else {
            this.value === 'undefined'? $(this).remove(): '';
        }
    })


    imageUploadButton.on('click', function () {
        imageFileUpload.trigger('click');
    })


    imageFileUpload.on('change', function () {
        image.attr('src', URL.createObjectURL(this.files[0]));
    })


    imageTemplateButton.on('click', function (e) {
        if (e.ctrlKey && e.shiftKey) {
            console.log("Not yet implemented!")
            //TODO implement secret template placeholder selection
        } else {
            image.attr('src', placeholderImageUrl);
        }
    })

    wordpressAccessCheckbox.on('change', function () {
        if (wordpressAccessCheckbox.is(':checked')) {
            wordpressAccesscontainer.slideDown(500);
            $('#btzc-el-self-service-password').trigger('focus');
        } else {
            wordpressAccesscontainer.slideUp(500);
        }
    })


    saveDataButton.on('click', function () {
        const formData = new FormData();
        formData.append('employee_id', $('#btzc-el-self-service-employee-id').val());
        formData.append('first_name', $('#btzc-el-self-service-firstname').val());
        formData.append('last_name', $('#btzc-el-self-service-lastname').val());
        formData.append('gender', $('#btzc-el-self-service-gender-selection').find(":selected").val());
        formData.append('departments', department);
        formData.append('occupations', occupation);
        formData.append('phone_number', $('#btzc-el-self-service-phone-number').val());
        formData.append('room_number', $('#btzc-el-self-service-room-number').val());
        formData.append('email_address', $('#btzc-el-self-service-email-address').val());
        formData.append('information', $('#btzc-el-self-service-info').val());
        formData.append('wp_username',  wordpressAccessCheckbox.is(':checked')? wordpressAccessUsername.val(): '');
        formData.append('wp_password', wordpressAccessCheckbox.is(':checked')? wordpressAccessPassword.val(): '');

        let department = $('#btzc-el-self-service-department-selection-container').children().map(function () {
            return $(this).val();
        }).get().join(' ');
        formData.append('department', department.replace('undefined', '').trim())

        let occupation = $('#btzc-el-self-service-occupation-selection-container').children().map(function () {
            return $(this).val();
        }).get().join(' ');
        formData.append('occupation', occupation.replace('undefined', '').trim())

        for (const file of imageFileUpload.prop('files')) {
            formData.append('btzc-el-employee-photo-upload[]', file);
        }

        $.ajax ({
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (data) {
                location.reload();
            }
        });
    })




    $('#btzc-el-self-service-email-address').on('input', function () {
        let email = $(this).val();
        let wordpressUsername = $('#btzc-el-self-service-username')
        if (email.includes('@')) {
            wordpressUsername.val(email.split('@')[0]);
        } else {
            wordpressUsername.val('');
        }
    })
})