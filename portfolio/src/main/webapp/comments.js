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

// IDs
/** 
 * The id of the div where comments will be placed
 * @type {String}
 */
const AUTHENTICATION_BUTTON_ID = 'auth-button';
const COMMENTS_ID = 'comment-container';
const COMMENT_FORM_ID = 'comment-form';
const MAX_COMMENTS_ID = 'max-comments';
// Spans all the parts of the comment section
const COMMENT_SECTION_ID = 'comment-section';

// CLASS_NAMEs
/** 
 * The names of the classes I will use
 * @type {String}
 */
const LOGOUT_BUTTON_CLASS = 'btn logout'
const LOGIN_BUTTON_CLASS = 'btn login'

// START_UP_FUNCTION
/**
 * Set up the comments.html page
 */
function setUpCommentsPage() {
  getCommentsList();
  getUserLoginStatus();
}

// SERVER_FUNCTIONS
/**
 * Get a list of comments from the servlet.
 */
function getCommentsList() {

  let maxCommentsSelector = document.getElementById(MAX_COMMENTS_ID);
  let maxComments = maxCommentsSelector
    .options[maxCommentsSelector.selectedIndex]
    .value;
  getUserLoginStatus();
  let commentsUrl = '/get-comments?maxComments=' + maxComments;

  fetch(commentsUrl).then(response => response.json()).then((comments) => {
    let commentContainer = document.getElementById(COMMENTS_ID);
    commentContainer.innerHTML = '';
    comments.forEach((comment) => {
      addToList(comment, commentContainer);
    })
  });
}

/** 
 * Posts a comment to the servlet 
 * @param {Event} commentSubmissionEvent  
 */
function postComment(commentSubmissionEvent) {
  // Avoid redirection
  commentSubmissionEvent.preventDefault();
  const params = new URLSearchParams(new FormData(document.getElementById(COMMENT_FORM_ID)))
  fetch('/post-comment', { method: 'POST', body: params })
    .then(resp => getCommentsList());
}

/** 
 * Tells the servlet to delete the comment marked by @param commentObj or all comments if deleteAll is specified 
 * and refreshes the page 
 * @param {Object} commentObj 
 * @
 */
function deleteCommentFromDB(commentObj, deleteAll = false) {
  const params = new URLSearchParams();
  params.append('deleteAll', deleteAll);
  if (!deleteAll) {
    params.append('id', commentObj.id);
  }
  fetch('/delete-comment', { method: 'POST', body: params })
    .then(resp => getCommentsList());
}

/**
 * fetch the login status from the servlet. 
 * If the user is logged in, unhide the comment section.
 * If the user is not logged in, display a login link.
 */
function getUserLoginStatus() {
  fetch('/login').then(response => response.json()).then((userInfo) => {
    setAuthenticationButton(userInfo);
    showCommentSection(userInfo.isLoggedIn);
  });
}


// HELPER_FUNCTIONS
/** 
 * adds an <div> element containing @param commentObj to the HTML Element @param list.
 * @param {Object} commentObj
 * @param {HTMLElement} list
 */
function addToList(commentObj, list) {
  const commentElement = createCommentElement(commentObj.text);
  const postTimeElement = createPostTimeElement(commentObj.postTime)
  commentElement.appendChild(postTimeElement);
  const rowElement = createRowElement();
  rowElement.appendChild(commentElement)
  const deleteButtonElement = createDeleteButtonElement(commentObj)
  rowElement.appendChild(deleteButtonElement);
  list.prepend(rowElement);
}

/** 
 * Submits the comment form when the enter key is pressed without the shift key
 * @param {Object} commentObj from a query to the database
 * @return {HTMLElement} a delete button for @param commentObj
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
 * @return {HTMLElement} a new row div
 */
function createRowElement() {
  let rowElement = document.createElement('div');
  rowElement.className = 'row';
  return rowElement;
}

/** 
 * Create the container for the comment text 
 * @param {String} text the actual text inside the comment
 * @return {HTMLElement} the html element containing @param text
 */
function createCommentElement(text) {
  let commentElement = document.createElement('div');
  commentElement.innerText = text;
  commentElement.className = 'col-10 comment-text';
  return commentElement;
}

/** 
 * Create the container for the timestamp of individual posts
 * @param {int} postTime in milliseconds
 * @return {HTMLElement} the html element containing the @param postTime
 */
function createPostTimeElement(postTime) {
  let postTimeElement = document.createElement('small');
  // Insert a newline character to separate the comment from its timestamp
  let postTimeString = '\n' + new Date(postTime).toLocaleString();
  postTimeElement.innerText = postTimeString;
  return postTimeElement;
}


/**
 * Sets whether authentication button is a login or logout 
 * @param {Object} userInfo is the parsed user authentication information
 */
function setAuthenticationButton(userInfo) {
  let authenticationButtonElement = document.getElementById(AUTHENTICATION_BUTTON_ID);
  if (userInfo.isLoggedIn) {
    authenticationButtonElement.innerText = "logout";
    authenticationButtonElement.className = LOGOUT_BUTTON_CLASS;
  } else {
    authenticationButtonElement.innerText = "login";
    authenticationButtonElement.className = LOGIN_BUTTON_CLASS;
  }
  authenticationButtonElement.href = userInfo.authenticationURL;
}

/**
 * If the user is logged in, unhide the comment section.
 * If the user is not logged in, hide the comment section.
 * @param {boolean} userIsLoggedin
 */
function showCommentSection(userIsLoggedin) {
  let commentSection = document.getElementById(COMMENT_SECTION_ID);
  if (userIsLoggedin) {
    commentSection.removeAttribute("hidden");
  } else {
    commentSection.hidden;
  }
}