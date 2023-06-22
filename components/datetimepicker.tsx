import React, { useState } from 'react';
import DateTimePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MyDateTimePicker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <DateTimePicker
      selected={selectedDate}
      onChange={handleDateChange}
      showTimeSelect
      timeIntervals={15}
      dateFormat="dd/MM/yyyy"
      className="form-control"
    />
  );
};

export default MyDateTimePicker;