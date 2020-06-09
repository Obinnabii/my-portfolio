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
 * adds an <div> element containing @param commentObj to the HTML Element @param list.
 * @param {Object} commentObj
 * @param {HTMLElement} list
 */
function addToList(commentObj, list) {
  const rowElement = createRowElement();
  const commentElement = createCommentElement(commentObj.text);
  rowElement.appendChild(commentElement);
  const deleteButtonElement = createDeleteButtonElement(commentObj);
  rowElement.appendChild(deleteButtonElement);
  list.prepend(rowElement);
}

/** 
 * Submits the comment form when the enter key is pressed without the shift key
 * @param {Object} commentObj from the query
 * @return {HTMLElement} a delete button
 */
function createDeleteButtonElement(commentObj) {
  let deleteButtonElement = document.createElement('div');
  deleteButtonElement.innerText = 'Delete';
  deleteButtonElement.className = 'delete-button col-2';
  deleteButtonElement.addEventListener('click', () => {
    deleteCommentFromDB(commentObj);
  });
  return deleteButtonElement;
}

/** 
 * Create a row for a comment
 */
function createRowElement() {
  let rowElement = document.createElement('div');
  rowElement.className = 'row';
  return rowElement;
}

/** 
 * Create the container for the comment text 
 * @param {String} text the actual text inside the comment
 * @return {HTMLElement} the html element containing the comment text
 */
function createCommentElement(text) {
  let commentElement = document.createElement('div');
  commentElement.innerText = text;
  commentElement.className = 'col-10 comment-text';
  return commentElement;
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
