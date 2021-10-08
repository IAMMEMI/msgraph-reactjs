import React, { useEffect, useState } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { Table } from "reactstrap";
import moment from "moment-timezone";
import { config } from "./Config";
import { getUserWeekCalendar } from "./GraphService";
import withAuthProvider from "./AuthProvider";
import CalendarDayRow from "./CalendarDayRow";
import "./Calendar.css";

const Calendar = (props) => {
  const [state, setState] = useState({
    eventsLoaded: false,
    events: [],
    startOfWeek: undefined,
    isLoading: false,
  });

  useEffect(() => {
    const getData = async () => {
      try {
        // Get the user's access token
        var accessToken = await props.getAccessToken(config.scopes);

        // Get midnight on the start of the current week in the user's timezone,
        // but in UTC. For example, for Pacific Standard Time, the time value would be
        // 07:00:00Z
        var startOfWeek = moment.tz(props.user.timeZone).startOf("week").utc();

        // Get the user's events
        var events = await getUserWeekCalendar(
          accessToken,
          props.user.timeZone,
          startOfWeek
        );
        console.log("events", events);
        setState({
          eventsLoaded: true,
          events: events,
          startOfWeek: startOfWeek,
          isLoading: false,
        });
      } catch (err) {
        props.setError("ERROR", JSON.stringify(err));
      }
    };

    if (
      props.user &&
      props.isAuthenticated &&
      !state.eventsLoaded &&
      !state.isLoading
    ) {
      setState({ ...state, isLoading: true });
      getData();
    }
  }, [props, state]);

  var sunday = moment(state.startOfWeek);
  var monday = moment(sunday).add(1, "day");
  var tuesday = moment(monday).add(1, "day");
  var wednesday = moment(tuesday).add(1, "day");
  var thursday = moment(wednesday).add(1, "day");
  var friday = moment(thursday).add(1, "day");
  var saturday = moment(friday).add(1, "day");

  return (
    <div>
      <div className="mb-3">
        <h1 className="mb-3">
          {sunday.format("MMMM D, YYYY")} - {saturday.format("MMMM D, YYYY")}
        </h1>
        <RouterNavLink to="/newevent" className="btn btn-light btn-sm" exact>
          New event
        </RouterNavLink>
      </div>
      <div className="calendar-week">
        <div className="table-responsive">
          <Table size="sm">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Event</th>
              </tr>
            </thead>
            <tbody>
              <CalendarDayRow
                date={sunday}
                timeFormat={props.user.timeFormat}
                events={state.events.filter(
                  (event) =>
                    moment(event.start?.dateTime).day() === sunday.day()
                )}
              />
              <CalendarDayRow
                date={monday}
                timeFormat={props.user.timeFormat}
                events={state.events.filter(
                  (event) =>
                    moment(event.start?.dateTime).day() === monday.day()
                )}
              />
              <CalendarDayRow
                date={tuesday}
                timeFormat={props.user.timeFormat}
                events={state.events.filter(
                  (event) =>
                    moment(event.start?.dateTime).day() === tuesday.day()
                )}
              />
              <CalendarDayRow
                date={wednesday}
                timeFormat={props.user.timeFormat}
                events={state.events.filter(
                  (event) =>
                    moment(event.start?.dateTime).day() === wednesday.day()
                )}
              />
              <CalendarDayRow
                date={thursday}
                timeFormat={props.user.timeFormat}
                events={state.events.filter(
                  (event) =>
                    moment(event.start?.dateTime).day() === thursday.day()
                )}
              />
              <CalendarDayRow
                date={friday}
                timeFormat={props.user.timeFormat}
                events={state.events.filter(
                  (event) =>
                    moment(event.start?.dateTime).day() === friday.day()
                )}
              />
              <CalendarDayRow
                date={saturday}
                timeFormat={props.user.timeFormat}
                events={state.events.filter(
                  (event) =>
                    moment(event.start?.dateTime).day() === saturday.day()
                )}
              />
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default withAuthProvider(Calendar);
