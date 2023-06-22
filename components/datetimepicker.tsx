import React, { useState } from 'react';
import DateTimePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export default function MyDateTimePicker({birthday, setBirthday}: any) {
  return (
    <DateTimePicker
      selected={birthday}
      onChange={setBirthday}
      peekNextMonth
      disabledKeyboardNavigation
      // showTimeSelect
      // timeFormat="HH:mm"
      // timeIntervals={15}
      placeholderText={birthday?.toString()}
      dateFormat="dd/MM/yyyy" // dd/MM/yyyy hh:mm aa
      className="form-control"
      minDate={new Date('1900-01-01 00:00:00')}
      maxDate={new Date()}
    />
  );
}