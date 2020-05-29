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


// TEXT
/**Heading text */
const heading_text = "<h1>Obi Abii's Portfolio</h1>"; 

/**About me blob */
const about_me_text = ("<p>Hi, My name is Obi and this is my portfolio! <br>\
I'm a CS Major at Cornell, currently interning at Google for the Summer of 2020 </p>");

// DIVS
/** The name of the div where the heading will be placed */
const heading_div = 'console_output';


/** print text to a given_div  */
function type(text, div_text) {
  var got_div = document.getElementById(div_text);
  //instantiate the typewriter
  var typewriter = new Typewriter(got_div, {
    loop: false,
    delay: 0,
    autoStart: true,
    cursor: '*',
    strings: []
  });
  //print
  typewriter
  .typeString(text);
}


/**
 * Adds heading to the page.
 */
function add_heading() { 
  //print
  type(heading_text, heading_div);
}

