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

/**About me blob */
const about_me_text = "<div class = 'row'> <p>Hi, My name is Obi and this is my portfolio! </p>\
<p>I'm a CS Major at Cornell, currently interning at Google for the Summer of 2020. My main career focus is software engineering. \
I am partyicularly interensted in Machine learning </p></div>";

const projects_blurb = "<div class = 'row'>"



// DIV_ID
/** The id of the div where the text will be placed */
const console_id = 'console';

// TYPEWRITERS
/**The names of the various typewriters I will use */
var console = typify(console_id);

console
  .typeString(heading_text)
  .pauseFor(300)
  .typeString(about_me_text);

