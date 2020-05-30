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

//HELPER_FUNCTION
/**Create a typewriter from a given div */
function typify(div_id){
  //get the div
  var div = document.getElementById(div_id);
  //turn into typewriter object
  return new Typewriter(div, {
    loop: false,
    delay: 10,
    autoStart: true,
    cursor: '',
    strings: []
  });
}

// TEXT
/**Heading text */
const heading_text = "<div class = 'row'> <h1> Obi Abii's Portfolio </h1> </div>"; 

/**About me blurb */
const about_me_text = "<div class = 'row'> <p>Hi, My name is Obi and this is my <span class='emphasis'>portfolio! <br></span></p>\
<p>I'm a CS Major at Cornell, currently interning at Google for the Summer of 2020. My main career focus is <span class='emphasis'>software engineering</span>. \
I am particularly interested in <span class='emphasis'>Machine learning.</span></p></div>";

/**blurb containg information about the languages I know */
const language_blurb = "<div class = 'row'> <h2>languages</h2></div><div class = 'row'> <p> I have experience with the following languages</p></div>\
  <!-- the list of languages with icons -->\
  <div class='row row-cols-4 justify-content-center text-center emphasis align-middle'>\
    <div class='col col-2'>\
      <div class='col'><span class='iconify' data-icon='simple-icons:ocaml' data-inline='false'></span></div>\
      <div class='col col-lg-2'> Ocaml</div>\
    </div>\
    <div class='col col-2 '>\
      <div class='col'><i class='fab fa-html5'></i></div>\
      <div class='col'> HTML</div>\
    </div>\
    <div class='col col-2 '>\
      <div class='col'><i class='fab fa-css3'></i></div>\
      <div class='col'>CSS</div>\
    </div>\
    <div class='col col-3 '>\
      <div class='col'><i class='fab fa-js-square'></i></div> \
      <div class='col'>JavaScript</div>\
    </div>\
    <div class='col col-2 '>\
      <div class='col'><i class='fab fa-node-js'></i></div>\
      <div class='col'> NodeJS</div>\
    </div>\
    <div class='col col-2 '> \
      <div class='col'><i class='fab fa-java'></i></div>\
      <div class='col'> Java</div>\
    </div>\
    <div class='col col-2 '> \
      <div class='col'><i class='fab fa-python'></i></div>\
      <div class='col'> Python</div>\
    </div>\
  </div>"

  // <div class='col col-2'> \
  //   C/C++ \
  // </div>\

const projects_blurb = "<div class = 'row'> <h2>projects</h2></div><div class = 'row'> <p> Below is a selection of some of my favorite projects.</p></div>"


// DIV_ID
/** The id of the div where the text will be placed */
const console_id = 'console';

/** List of project_ids */
var projects = ['project_0', 'project_1']

// TYPEWRITERS
/**The names of the various typewriters I will use */
var console = typify(console_id);

// FUNCTIONS
/**Make projects visible */
function addProject(div_id){
  document.getElementById(div_id).style.visibility = "visible";
}



/**print the initial text blurbs */

console
  .typeString(heading_text) //print heading
  .pauseFor(300)
  .typeString(about_me_text) //print about_me section
  .pauseFor(300)
  .typeString(language_blurb) //print language_section
  .pauseFor(300)
  .typeString(projects_blurb) //print project header
  .pauseFor(300)
  .callFunction(() => addProject(projects[0])); //show first project
  // .pauseFor(300)
  // .callFunction(() => addProject(projects[1])); // show second project

