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
const COMMENT_MAX_NO_ID = "comment-max-no";

// SERVER_FUNCTIONS
/**
* Get a list of comments  from the serverlet.
*/
async function getCommentsList() {
  let maxNoCommentsSelector = document.getElementById(COMMENT_MAX_NO_ID);
  let maxNoComments = maxNoCommentsSelector
                      .options[maxNoCommentsSelector.selectedIndex]
                      .value;             
  let commentsUrl = '/comments?maxNoComments=' + maxNoComments;
  fetch(commentsUrl).then(response => response.json()).then((comments) => { 
    let commentContainer = document.getElementById(COMMENTS_ID);
    commentContainer.innerHTML = '';
    comments.forEach((comment) => {
      addToList(comment.text, commentContainer);
    })
  });
}

// HELPER_FUNCTIONS
/** 
* adds an <li> element containing @param text to the HTML Element @param list.
* @param {String} text
* @param {HTMLElement} list
*/
function addToList(text, list) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  list.appendChild(liElement);
}

/** 
* submits the comment form when the enter key is pressed without the shift key
* @param {Event} event the onkeydown event
*/
function submitCommentOnEnter(event) {
  if (event.keyCode == 13 && !event.shiftKey) {
    document.getElementById(COMMENT_FORM_ID).submit();
  }
}
