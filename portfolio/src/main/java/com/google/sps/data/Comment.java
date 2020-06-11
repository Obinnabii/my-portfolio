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

package com.google.sps.data;

public final class Comment {

  private final long id;
  private final long postTime;
  private final String text;
  private final String  userEmail;

  // Constants
  public static String ENTITY_NAME = "Comment";
  public static String POST_TIME_FIELD = "postTime";
  public static String TEXT_FIELD = "text";  
  public static String USER_EMAIL_FIELD = "userEmail";

  public Comment(long id, String text, long postTime, String userEmail) {
    this.id = id;
    this.text = text;
    this.postTime = postTime;
    this.userEmail = userEmail;
  }
}
