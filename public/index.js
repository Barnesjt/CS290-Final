function toggleUploadBox() {
    var uploadBox = document.querySelector('.upload-dialog-box');
    uploadBox.classList.toggle('hidden');
}

function singleView(event) {
    newGet = new XMLHttpRequest();
    newGet.open('GET', '/view/'+ event.currentTarget.parentElement.getAttribute('image-filename'));
    newGet.send();
}

function commentSubmitted() {

    var comment = document.querySelector('#add-comment-input').value.trim();
  
    if (!comment) {
      alert("Please enter your comment before submitting");
    } else {
  
      var newPost = new XMLHttpRequest();
      var targetFilename = document.querySelector('.item').getAttribute('image-filename');

      newPost.open('POST', '/comment');
  
      var requestBody = JSON.stringify({
        filename: targetFilename,
        comment: comment
      });

      newPost.setRequestHeader('Content-Type', 'application/json');
      newPost.send(requestBody);

      location.reload();
    }
}

window.addEventListener('DOMContentLoaded', function () {

    var uploadButton = document.querySelector('.new-upload-button');
    uploadButton.addEventListener('click', toggleUploadBox);

    var cancelButton = document.querySelector('.cancel-button');
    cancelButton.addEventListener('click', toggleUploadBox);

    var submitComment = document.querySelector('#submit-button');
    if (submitComment) {
        submitComment.addEventListener('click', commentSubmitted);
    }
});