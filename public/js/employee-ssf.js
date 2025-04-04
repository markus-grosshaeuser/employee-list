jQuery(function($) {


    let image = $('#btzc-el-self-service-form-image');
    let imageFileUpload = $('#btzc-el-self-service-form-image-file');
    let imageUploadButton = $('#btzc-el-self-service-button-fileupload');
    let imageTemplateButton = $('#btzc-el-self-service-button-template');
    let placeholderImageUrl = image.attr('src');

    let departmentContainer = $('#btzc-el-self-service-department-selection-container');
    let occupationContainer = $('#btzc-el-self-service-occupation-selection-container');

    let wordpressAccessCheckbox = $('#btzc-el-self-service-wordpress-account-checkbox');
    let wordpressAccesscontainer = $('#btzc-el-self-service-wordpress-account-data-container');



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
        console.log("Not yet implemented!")
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