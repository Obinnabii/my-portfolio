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

/**
 * @typedef MarkerInfo
 * @type {object}
 * @property {LatLng} position - geographical location of marker on google maps.
 * @property {string} title - name of marker.
 * @property {string} description - info to be displayed when marker is clicked.
 */

/** The coordinates for Cornell University 
 * @type {LatLng}
 */
const cornellUniversity = new google.maps.LatLng(42.446872, -76.483842);

/** The location object for my favorite trail 
 * @type {MarkerInfo}
 */
const myFavoriteTrail = {
  position: new google.maps.LatLng(42.442732, -76.485788),
  title: "My Favorite Trail",
  description: "I have jogged the Cascacadilla Gorge Trail on multiple occasions. " +
    "It is the perfect place to calm your nerves!",
}


/** Creates a map and adds it to the page. */
function createMap() {
  const map = new google.maps.Map(
    document.getElementById('map'), { center: cornellUniversity, zoom: 15 });

  addLandmark(map, myFavoriteTrail);
}

/** Adds a marker that shows an info window when clicked.
 * @param {Map} map
 * @param {MarkerInfo} location - information about the marker that will point to the proposed landmark 
 */
function addLandmark(map, location) {
  const marker = new google.maps.Marker({ position: location.position, map: map, title: location.title });

  const infoWindow = new google.maps.InfoWindow({ content: location.description });
  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });
}