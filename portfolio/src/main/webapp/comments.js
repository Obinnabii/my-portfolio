// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// DIV_IDs
/** 
 * The id of the div where comments will be placed
 * @type {String}
 */
const COMMENTS_ID = "comment-container";
const COMMENT_FORM_ID = "comment-form";
const MAX_COMMENTS_ID = "max-comments";

// SERVER_FUNCTIONS
/**
 * Get a list of comments from the servlet.
 */
async function getCommentsList() {
  let maxCommentsSelector = document.getElementById(MAX_COMMENTS_ID);
  let maxComments = maxCommentsSelector
    .options[maxCommentsSelector.selectedIndex]
    .value;

  let commentsUrl = '/get-comments?maxComments=' + maxComments;

  fetch(commentsUrl).then(response => response.json()).then((comments) => {
    let commentContainer = document.getElementById(COMMENTS_ID);
    commentContainer.innerHTML = '';
    comments.forEach((comment) => {
      addToList(comment, commentContainer);
    })
  });
}

// HELPER_FUNCTIONS
/** 
 * adds an <li> element containing @param text to the HTML Element @param list.
 * @param {String} text
 * @param {HTMLElement} list
 */
function addToList(commentObj, list) {
  const comment = document.createElement('li');
  comment.innerText = commentObj.text;

  const deleteButtonElement = document.createElement('button');
  deleteButtonElement.innerText = 'Delete';
  deleteButtonElement.addEventListener('click', () => {
    deleteCommentFromDB(commentObj);
  });

  comment.appendChild(deleteButtonElement);
  list.prepend(comment);
}

/** 
 * submits the comment form when the enter key is pressed without the shift key
 * @param {Event} The onkeydown event
 */
function submitCommentOnEnter(event) {
  if (event.keyCode == 13 && !event.shiftKey) {
    document.getElementById(COMMENT_FORM_ID).submit();
  }
}

/** Posts a comment to the server */
function postComment(commentSubmissionEvent) {
  // Avoid redirection
  commentSubmissionEvent.preventDefault();
  const params = new URLSearchParams(new FormData(document.getElementById(COMMENT_FORM_ID)))
  fetch('/post-comment', { method: 'POST', body: params })
    .then(resp => getCommentsList());
}

/** Tells the server to delete the comment and refresh the page */
function deleteCommentFromDB(comment) {
  const params = new URLSearchParams();
  params.append('id', comment.id);
  fetch('/delete-comment', { method: 'POST', body: params })
    .then(resp => getCommentsList());
}
