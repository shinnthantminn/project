import { useEffect, useState, memo, useContext } from "react";
import Calendar from "react-calendar";
import { Context } from "../Store/LoadingStore";

// date
import date from "../utils/date";
import ColorHighlight from "./ColorHighlight";

const CalendarModel = ({ shift, dater }) => {
  const [value, setValue] = useState(new Date());
  const [count, setCount] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [active, setActive] = useState(null);
  const [show, setShow] = useState(true);
  const { loading, handleStopLoading } = useContext(Context);

  // const showOneDayOnly = (value) => {
  //   console.log(value);
  // };

  function countDays(date1, date2) {
    // Convert both dates to milliseconds
    var date1Ms = date1.getTime();
    var date2Ms = date2.getTime();

    // Calculate the difference in milliseconds
    var differenceMs = date2Ms - date1Ms;

    // Convert back to days and return
    return Math.round(differenceMs / (1000 * 60 * 60 * 24));
  }

  const handleChange = (date) => {
    const startDay = new Date(date[0]);
    const endDay = new Date(date[1]);
    setStart(
      startDay.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    );
    setEnd(
      endDay.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    );
    setCount(countDays(startDay, endDay));
    setValue(date);
  };

  const handleManageData = (param) => {
    for (let x of date) {
      if (
        new Date(x.date).toLocaleDateString() ==
        new Date(param.date).toLocaleDateString()
      ) {
        if (show) {
          if (x.assign[shift] == "Off") {
            return (
              <ColorHighlight
                active={"react-calendar__month-view__days__day"}
                bgColor={"#ffee32"}
                shift={x.assign[shift]}
              />
            );
          } else if (x.assign[shift] == "Morning") {
            return (
              <ColorHighlight
                active={"react-calendar__month-view__days__day"}
                bgColor={"#6fffe9"}
                shift={x.assign[shift]}
              />
            );
          } else if (x.assign[shift] == "Night") {
            return (
              <ColorHighlight
                active={"react-calendar__month-view__days__day"}
                bgColor={"#e71d36"}
                shift={x.assign[shift]}
              />
            );
          }
        }
      }
    }
  };

  useEffect(() => {
    if (dater) {
      setActive(new Date(dater));
    }
  }, [dater]);

  useEffect(() => {
    handleStopLoading();
  }, [shift, handleManageData]);

  const handleViewChange = ({ action, activeStartDate, value, view }) => {
    if (view !== "month") {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <Calendar
            onChange={handleChange}
            value={active ? active : value}
            goToRangeStartOnSelect
            tileContent={handleManageData}
            selectRange={true}
            onViewChange={handleViewChange}
            activeStartDate={active}
            showNeighboringMonth
          />
          <div style={{ marginTop: "50px" }}>
            <p style={{ color: "#ffffff90" }}>
              <span className="shiftDisplay">From</span>
              <span className="selectedDateShow">
                {start ? start : "_____"}
              </span>
              <span className="shiftDisplay">To</span>
              <span className="selectedDateShow">{end ? end : "_____"}</span>
              <span className="shiftDisplay">Total</span>
              <span className="selectedDateShow">
                {count ? count : "0"} days
              </span>
            </p>
          </div>
        </>
      )}
    </>
  );
};
export default memo(CalendarModel);
