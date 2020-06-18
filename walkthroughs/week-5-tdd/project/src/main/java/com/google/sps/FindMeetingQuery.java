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

package com.google.sps;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

public final class FindMeetingQuery {
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    Collection<String> mandatoryAttendees = request.getAttendees();
    Collection<String> optionalAttendees = request.getOptionalAttendees();
    long duration = request.getDuration();

    if (mandatoryAttendees.isEmpty()) {
      ArrayList<TimeRange> optionalConflicts = getConflictingEvents(events, optionalAttendees);
      return getPossibleTimeRanges(optionalConflicts, duration);
    }

    ArrayList<String> allAttendees = new ArrayList<String>();
    allAttendees.addAll(mandatoryAttendees);
    allAttendees.addAll(optionalAttendees);

    ArrayList<TimeRange> allConflicts = getConflictingEvents(events, allAttendees);
    ArrayList<TimeRange> possibleTimerangesAllAttendees =
        getPossibleTimeRanges(allConflicts, duration);
    if (possibleTimerangesAllAttendees.isEmpty()) {
      ArrayList<TimeRange> mandatoryConflicts =
          getConflictingEvents(events, request.getAttendees());
      return getPossibleTimeRanges(mandatoryConflicts, duration);
    }
    return possibleTimerangesAllAttendees;
  }

  private ArrayList<TimeRange> getConflictingEvents(
      Collection<Event> events, Collection<String> meetingAttendees) {
    ArrayList<TimeRange> conflicts = new ArrayList<TimeRange>();
    for (Event event : events) {
      if (!Collections.disjoint(event.getAttendees(), meetingAttendees)) {
        System.out.println(event);
        System.out.println(event.getWhen());
        System.out.println(event.getAttendees());
        conflicts.add(event.getWhen());
      }
    }
    Collections.sort(conflicts, TimeRange.ORDER_BY_START);
    return conflicts;
  }

  private ArrayList<TimeRange> getPossibleTimeRanges(
      Collection<TimeRange> conflicts, long duration) {
    int start = TimeRange.START_OF_DAY;
    ArrayList<TimeRange> possibleTimes = new ArrayList<TimeRange>();

    // These are the situations that could occur while looking for a good time
    // s = start
    // Case 1: s |---|  -> |--s
    //      -> distance could be (a) large enough to add as a possible time
    //                        or (b) not large enough
    // Case 2: |-s-|    -> |--s
    //
    // Case 3: |---| s  -> |---| s
    //
    for (TimeRange conflict : conflicts) {
      int end = conflict.start();
      if (end - start >= duration) { // Case 1(a)
        possibleTimes.add(TimeRange.fromStartEnd(start, end, false));
      }
      if (start < conflict.end()) { // !Case 3
        start = conflict.end();
      }
    }
    if (TimeRange.END_OF_DAY - start >= duration) {
      possibleTimes.add(TimeRange.fromStartEnd(start, TimeRange.END_OF_DAY, true));
    }
    return possibleTimes;
  }
}
