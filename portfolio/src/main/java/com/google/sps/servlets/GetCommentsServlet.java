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

package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.gson.Gson;
import com.google.sps.data.Comment;
import java.io.IOException;
import java.util.ArrayList;
import java.sql.Timestamp;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns comments data */
@WebServlet("/get-comments")
public class GetCommentsServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    int maxComments = getMaxComments(request);

    Query query = new Query(Comment.ENTITY_NAME).addSort(Comment.POST_TIME_FIELD, SortDirection.DESCENDING);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    FetchOptions commentsQueryOptions = FetchOptions.Builder
                                        .withLimit(maxComments);

    ArrayList<Comment> commentList = new ArrayList<>();
    for (Entity commentEntity : results.asIterable(commentsQueryOptions)) {
      long id = commentEntity.getKey().getId();
      String text = (String) commentEntity.getProperty(Comment.TEXT_FIELD);
      long postTime = (long) commentEntity.getProperty(Comment.POST_TIME_FIELD);

      Comment comment = new Comment(id, text, postTime);
      commentList.add(comment);
    }
    Gson gson = new Gson();
    response.setContentType("application/json;");
    response.getWriter().println(gson.toJson(commentList));
  }

  /** Returns the max number of comments entered by the user */
  private int getMaxComments(HttpServletRequest request) {
    String maxCommentsString = request.getParameter("maxComments");

    int maxComments;
    try {
      maxComments = Integer.parseInt(maxCommentsString);
    } catch (NumberFormatException e) {
      System.err.println("Could not convert to int: " + maxCommentsString);
      return -1;
    }
    return maxComments;
  }
}
