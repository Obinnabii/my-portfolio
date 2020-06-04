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
* The id of the div where the nav bar will be added.
* @const {String}
*/
const NAV_ID = "my-nav";

/** 
* list containing JS objects with link information. link fields correspond to anchor fields
* @const {Object List}
*/
const LINKS = [
    {
      target:"_blank", 
      href:"mailto: coa22@cornell.edu",
      class:"nav_bar", 
      text:"/email_me "
    },
    {
      target:"_blank", 
      href:"https://github.com/Obinnabii",
      class:"nav_bar", 
      text:"/see_github "
    },
    {
      target:"_blank", 
      href:"https://drive.google.com/file/d/1tc2YaWmPzVhdCSb3Gv6VVz-599Qa5CrT/view?usp=sharing",
      class:"nav_bar", 
      text:"/see_resume "
    },
    {
      target:"_self", 
      href:"index.html",
      class:"nav_bar", 
      text:"/home_page "
    },
    {
      target:"_self", 
      href:"comments.html",
      class:"nav_bar", 
      text:"/comments"
    }
  ];


// HELPER_FUNCTIONS

/**
* Create an anchor <a> from a given JS object
* @param {Object} link Js object with required fields. look at LINKS for more details
* @return {HTMLElement} anchor object
*/
function anchorfy(link) {
  const a = document.createElement('a');
  a.innerText = link.text;
  a.class = link.class;
  a.href = link.href;
  a.target = link.target;
  return a;
}

// FUNCTION 

/**
* Add nav bar to page
*/
function createNavBar() {
  let navBar = document.getElementById(NAV_ID);         
  for (i = 0; i < LINKS.length; i++) {            
    console.log(LINKS[i]);
    let a = anchorfy(LINKS[i]);
    navBar.appendChild(a);
  }
}


// FUNCTION_CALL
createNavBar();
