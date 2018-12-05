function toggleUploadBox() {
    var uploadBox = document.querySelector('.upload-dialog-box');
    uploadBox.classList.toggle('hidden');
}

window.addEventListener('DOMContentLoaded', function () {

    var uploadButton = document.querySelector('.new-upload-button');
    uploadButton.addEventListener('click', toggleUploadBox);

    var cancelButton = document.querySelector('.cancel-button');
    cancelButton.addEventListener('click', toggleUploadBox);

/*     var deleteButton = document.querySelector('.delete-button');
    deleteButton = addEventListener('hover') */

});