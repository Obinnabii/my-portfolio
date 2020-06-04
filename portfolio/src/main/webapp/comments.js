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


// SERVER_FUNCTIONS

/**
* Get a list of comments  from the serverlet.
*/
async function getCommentsList() {
  fetch('/data')                          // look above for simple explanation
  .then(response => response.json()) 
  .then((comments) => { 
    let commentContainer = document.getElementById(COMMENTS_ID); 
    commentContainer.innerHTML = '';        // clear current div
    for (i = 0; i < comments.length; i++) {
      console.log(comments[i]);
      addToList(comments[i], commentContainer);
    } 
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

getCommentsList();