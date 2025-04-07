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

    let saveDataButton = $('#btzc-el-self-service-button-submit');



    let forgotPin = $('#btzc-el-edit-data-button-forgot-pin');
    let usernameInput = $('#btzc-el-edit-data-username')

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
        $('<form/>', {'method': 'POST'}).append(
            $('<input/>', {'type': 'hidden', 'name': 'btzc-el-reset-pin-username', 'value': username})
        ).appendTo('body').submit();
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
        let id = $('#btzc-el-self-service-employee-id').val();
        let firstName = $('#btzc-el-self-service-firstname').val();
        let lastName = $('#btzc-el-self-service-lastname').val();
        let gender = $('#btzc-el-self-service-gender-selection').find(":selected").val();
        let department = $('#btzc-el-self-service-department-selection-container').children().map(function () {
            return $(this).val();
        }).get().join(' ');
        department = department.replace('undefined', '');
        let occupation = $('#btzc-el-self-service-occupation-selection-container').children().map(function () {
            return $(this).val();
        }).get().join(' ');
        occupation = occupation.replace('undefined', '');
        let phone = $('#btzc-el-self-service-phone-number').val();
        let room = $('#btzc-el-self-service-room-number').val();
        let email = $('#btzc-el-self-service-email-address').val();
        let info = $('#btzc-el-self-service-info').val();
        let image = $('#btzc-el-self-service-form-image').attr('src');
        // $('<form/>', {'method': 'POST'}).append(
        //     $('<input/>', {'type': 'hidden', 'name': 'employee_id', 'value': id}),
        //     $('<input/>', {'type': 'hidden', 'name': 'first_name', 'value': firstName}),
        //     $('<input/>', {'type': 'hidden', 'name': 'last_name', 'value': lastName}),
        //     $('<input/>', {'type': 'hidden', 'name': 'room_number', 'value': room}),
        //     $('<input/>', {'type': 'hidden', 'name': 'phone_number', 'value': phone}),
        //     $('<input/>', {'type': 'hidden', 'name': 'email_address', 'value': email}),
        //     $('<input/>', {'type': 'hidden', 'name': 'gender', 'value': gender}),
        //     $('<input/>', {'type': 'hidden', 'name': 'information', 'value': info}),
        //     $('<input/>', {'type': 'hidden', 'name': 'btzc-el-edit-save-department', 'value': department}),
        //     $('<input/>', {'type': 'hidden', 'name': 'btzc-el-edit-save-occupation', 'value': occupation}),
        //     $('<input/>', {'type': 'file hidden', 'name': 'image', 'value': image})
        // ).appendTo('body').submit();
        console.log(id, firstName, lastName, gender, department, occupation, phone, room, email, info, image);
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