import React, { useState } from "react";
import {EtCalendar} from "et-calendar-react";

const MyComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  return (
    <EtCalendar
      value={selectedDate}
      onChange={handleDateChange}
      calendarType={true} 
      lang={'am'}
      fullWidth={false}
    />
  );
};

export default MyComponent;
