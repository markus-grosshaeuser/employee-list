jQuery(function($) {

    let container = $('#btzc-el-sign-on-form-container');

    let image = $('#btzc-el-sign-on-form-image');
    let imageFileUpload = $('#btzc-el-sign-on-form-image-file');

    let departmentContainer = $('#btzc-el-sign-on-department-selection-container');
    let occupationContainer = $('#btzc-el-sign-on-occupation-selection-container');

    image.on('click', function () {
        imageFileUpload.trigger('click');
    })


    departmentContainer.on('input', '.btzc-el-sign-on-department-selection-element', function () {
        if (this === departmentContainer.children().last().get(0)) {
            departmentContainer.append(departmentContainer.children().last().clone())
        } else {
            this.value === 'undefined'? $(this).remove(): '';
        }
    })

    occupationContainer.on('input', '.btzc-el-sign-on-occupation-selection-element', function () {
        if (this === occupationContainer.children().last().get(0)) {
            occupationContainer.append(occupationContainer.children().last().clone())
        } else {
            this.value === 'undefined'? $(this).remove(): '';
        }
    })
})