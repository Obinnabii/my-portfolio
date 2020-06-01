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

// HELPER_FUNCTIONS

/** 
* Create a typewriter from a given div 
* @param {String} div_id A string that refers to the ID of a div in the HTML file.
* @return {Typewriter} a Typewriter referring to the given div id
*/
function typify(div_id) {
  //get the div
  let div = document.getElementById(div_id);
  //turn into typewriter object
  return new Typewriter(div, {
    loop: false,
    delay: 10,
    autoStart: true,
    cursor: '',
    strings: []
  });
}

/**
* Make project div visible visible
* @param {String} div_id A string that refers to the ID of a project div in the HTML file.
*/
function addProject(div_id){
  document.getElementById(div_id).style.visibility = 'visible';
}

// TEXT

/** 
* Heading text 
* @type {String}
*/
const heading_text = `<div class="row"> <h1> Obi Abii's Portfolio </h1> </div>`; 

/** 
* About me blurb 
* @type {String}
*/
const about_me_text = `
  <div class="row"> 
    <p>Hi, My name is Obi and this is my <span class="emphasis">portfolio! <br></span></p>
    <p>I'm a CS Major at Cornell, currently interning at Google for the Summer of 2020. My main career focus is 
       <span class="emphasis">software engineering</span>. I am particularly interested in <span class="emphasis">Machine learning.</span>
    </p>
  </div>`;

/**
* blurb containg information about the languages I know 
* @type {String}
*/
const language_blurb = `
  <div class="row"> 
    <h2>languages</h2>
  </div>
  <div class="row"> 
    <p> I have experience with the following languages</p>
  </div>
  <!-- List of languages with icons -->
  <div class="row row-cols-4 justify-content-center text-center emphasis align-middle">
    <div class="col col-2">
      <div class="col"><span class="iconify" data-icon="simple-icons:ocaml" data-inline="false"></span></div>
      <div class="col col-lg-2"> Ocaml</div>
    </div>
    <div class="col col-2">
      <div class="col"><i class="fab fa-html5"></i></div>
      <div class="col"> HTML</div>
    </div>
    <div class="col col-2">
      <div class="col"><i class="fab fa-css3"></i></div>
      <div class="col">CSS</div>
    </div>
    <div class="col col-3">
      <div class="col"><i class="fab fa-js-square"></i></div> 
      <div class="col">JavaScript</div>
    </div>
    <div class="col col-2">
      <div class="col"><i class="fab fa-node-js"></i></div>
      <div class="col"> NodeJS</div>
    </div>
    <div class="col col-2"> 
      <div class="col"><i class="fab fa-java"></i></div>
      <div class="col"> Java</div>
    </div>
    <div class="col col-2"> 
      <div class="col"><i class="fab fa-python"></i></div>
      <div class="col"> Python</div>
    </div>
    <div class="col col-2"> 
      <div class="col">
        <span class="iconify" data-icon="cib:coreui-c" data-inline="false"></span>
      </div>
      <div class="col"> C/C++</div>
    </div>
  </div>`

  // <div class="col col-2"> \
  //   C/C++ \
  // </div>\

/**
* blurb containg information about the languages I know 
* @type {String}
*/
const projects_blurb = `
  <div class="row"> <h2>projects</h2></div>
  <div class="row"> <p> Below is a selection of some of my favorite projects.</p></div>`


// DIV_ID

/** 
* The id of the div where the above text will be placed 
* @type {String}
*/
const console_id = "console";

/** 
* List of project_ids 
* @type {!Array<String>}
*/
const projects = ['project_0', 'project_1', 'project_2']

// TYPEWRITERS

/**
* The typewriter corresponding to the 'console_id' div
* @type {Typewriter}
*/
let console = typify(console_id);

// FUNCTION CALLS

/**print the initial text blurbs */
console
  .typeString(heading_text) 
  .pauseFor(300)
  .typeString(about_me_text) 
  .pauseFor(300)
  .typeString(language_blurb) 
  .pauseFor(300)
  .typeString(projects_blurb) 
  .pauseFor(300)
  .callFunction(() => addProject(projects[0])) //show first project
  .pauseFor(300)
  .callFunction(() => addProject(projects[1])) // show second project
  .pauseFor(300)
  .callFunction(() => addProject(projects[2])); // show third project

