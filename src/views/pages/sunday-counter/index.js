import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";

function SundayCounter() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [sundayCount, setSundayCount] = useState(null);
  const [startError, setStartError] = useState("");
  const [endError, setEndError] = useState("");

  const countSundays = (start, end) => {
    let count = 0;
    let currentDate = new Date(start);

    while (currentDate <= end) {
      if (currentDate.getDay() === 0 && currentDate.getDate() < 28) {
        count++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return count;
  };

  const handleStartDateChange = (date) => {
    setStartError("");
    if (date && date > new Date() && date.getDay() !== 0) {
      setStartDate(date);
    } else if (date) {
      setStartError("Start date must be in the future and not a Sunday");
      setStartDate(null);
    }
  };

  const handleEndDateChange = (date) => {
    setEndError("");
    if (date) {
      setEndDate(date);
      if (startDate && date - startDate < 2 * 365 * 24 * 60 * 60 * 1000 || !startDate) {
        setEndError("End date must be at least two years after the start date");
      }
    }
  };

  const handleCalculateSundays = () => {
    if(!endError && !startError){
      if (startDate && endDate && startDate < endDate) {
        const sundays = countSundays(startDate, endDate);
        setSundayCount(sundays);
      }
    }
  };

  return (
    <div className="sundays-page">
      <h1>We Love Sundays!</h1>
      <div className="date-picker">
        <label style={{ width: 100 }}>Start Date:</label>
        <div>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            placeholderText="Select a start date"
          />
          {startError && <p className="error">{startError}</p>}
        </div>
      </div>
      <div className="date-picker">
        <label style={{ width: 100 }}>End Date:</label>
        <div>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            placeholderText="Select an end date"
          />
          {endError && <p className="error">{endError}</p>}
        </div>
      </div>
      <button style={{ marginLeft: 100 }} onClick={handleCalculateSundays}>
        Calculate Sundays
      </button>
      {sundayCount !== null && (
        <p>
          Number of Sundays between the selected dates (before the 28th of the
          month): <b>{sundayCount}</b>
        </p>
      )}
    </div>
  );
}

export default SundayCounter;
