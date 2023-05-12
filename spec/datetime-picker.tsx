// import { Button, Col, Container, Image, OverlayTrigger, Popover, Row } from "react-bootstrap";
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import AppService from "apps/ys-site/specs/gosuService";

// const DateTimePicker = ({ birthday, setBirthday, isYear = true, isTime = false, isOrder = false, isFuture = false }): JSX.Element => {
//   const localization = useSelector(selectLangState) as Langs;

//   var monthNames = ["Январь", "Февраль", "Март", "Апрель", "Мая", "Июнь",
//     "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
//   ];

//   const generateArrayOfYears = (): string[] => {
//     const now = new Date().getUTCFullYear();    
//     const years = Array<string>(now - (now - 90)).fill('').map((v, idx) => String(now - idx));
//     return years;
//   }

//   const [idxs, setIdxs] = useState({year:0, hours:0, minutes:0});
//   const [valueGroups, setValueGroups] = useState({
//       year: '2023',
//       hours: '00',
//       minutes: '00',
//   });

//   const [optionGroups, setOptionGroups] = useState({
//       year: [...generateArrayOfYears()],
//       hours: ['11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
//       minutes: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
//   });

//   const handleChange = (name: string, value: string) => {
//     setValueGroups((valueGroups) => ({...valueGroups, [name]: value }));
//   };

//   const select = (type = 'year', step) => {
//     if (type === 'year') {
//       step = (idxs.year + step) < 0 || (idxs.year + step) > optionGroups.year.length ? 0 : (idxs.year + step);
//       setIdxs({...idxs, year: step});
//       setValueGroups((valueGroups) => ({...valueGroups, year: String(optionGroups.year[optionGroups.year.length > step ? step : 0]) }));
//     }

//     if (type === 'hours') {
//       step = (idxs.hours + step) < 0 || (idxs.hours + step) > optionGroups.hours.length ? 0 : (idxs.hours + step);
//       setIdxs({...idxs, hours: step});
//       setValueGroups((valueGroups) => ({...valueGroups, hours: String(optionGroups.hours[optionGroups.hours.length > step ? step : 0]) }));
//     }

//     if (type === 'minutes') {
//       step = (idxs.minutes + step) < 0 || (idxs.minutes + step) > optionGroups.minutes.length ? 0 : (idxs.minutes + step);
//       setIdxs({...idxs, minutes: step});
//       setValueGroups((valueGroups) => ({...valueGroups, minutes: String(optionGroups.minutes[optionGroups.minutes.length > step ? step : 0]) }));
//     }
//   }

//   const dateTimeFormat = (digit: number): string => {
//       return digit < 10 ? `0${digit}` : String(digit);
//   }

//   useEffect(() => {
//     if (isYear) {
//       let selectDate = new Date(`${valueGroups.year}-${birthday.getMonth() + 1}-${birthday.getDate()}`);
//       if (isOrder) {
//         if (selectDate < new Date()) {
//           selectDate = new Date();
//         }
//       } 
//       setBirthday(selectDate);
//     }
//     if (isTime) {
//       let bd = new Date(`${valueGroups.year}-${birthday.getMonth() + 1}-${birthday.getDate()} ${valueGroups.hours}:${valueGroups.minutes}:00`);
//       if (isOrder) {
//         if (bd < new Date()) {
//           bd = new Date();
//         }
//       }
//       setBirthday(bd);
//     }
//   }, [valueGroups.year, valueGroups.hours, valueGroups.minutes]);

//   return (
//     <>
//     <Col className={`${isTime ? 'col-lg-5 col-sm-2' : 'd-none'}`} style={{marginRight:"3.5rem"}}></Col>
//     <Col>
//       <Container className="py-3">
//         <Row className="bg-dark bg-opacity-10 py-3 px-2 rounded-3">
//           <Col lg={6} xs={6} className={`${isTime ? '' : 'd-none'}`}></Col>
//           <Col xxs="10" xs="4">
//             <span className="date-year-select">
//               {`${dateTimeFormat(birthday.getDate())} ${monthNames[birthday.getMonth()]} ${birthday.getFullYear()}`}
//               { isTime ? ` ${dateTimeFormat(birthday.getHours())}:${dateTimeFormat(birthday.getMinutes())}` : '' }
//             </span>
//           </Col>
//           <Col xxs="2" xs="2" className="text-end">
//             <Image src='/img/icon_calendar.svg' alt='' />
//           </Col>
//         </Row>
//       </Container>
//       <Row>
//         {/* YEAR SELECTOR */}
//         <Col md="5" xxs="2"  className={`${isYear ? '' : 'd-none'} year-selector`}>
//           <Container className="year-picker">
//             <Row>
//               <Col className="text-center my-1">
//                 <span className="text-uppercase">{AppService.getLocalizedText(localization, 'year')}</span>
//               </Col>
//             </Row>
//             <Row className="border border-2 py-3 px-4" style={{borderRadius:'1.5rem'}}>
//               <Col>
//                 <Container className="m-0 p-0">
//                   <Row>
//                     <Col className="text-center bg-dark bg-opacity-10 py-2 mt-2 rounded-4">
//                       <span className="date-year-select">{valueGroups.year}</span>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col className="position-relative text-center p-0 m-0">
//                         <select className="form-select text-center bg-transparent border-0 my-4" 
//                           size={3}
//                           name="year" 
//                           value={valueGroups.year} 
//                           onChange={(e) => handleChange('year', e.target.value)}
//                         >
//                           {optionGroups.year.map((option) => (
//                             <option key={option} value={option} className='text-center mx-auto'>
//                               {option}
//                             </option>
//                           ))}
//                         </select>
//                         <i 
//                           role="button" 
//                           className="position-absolute bi bi-chevron-up pb-4" 
//                           style={{top: '1%',left: '43%'}}
//                           onClick={() => select('year', -1)}
//                         ></i>
//                         <i 
//                           role="button" 
//                           className="position-absolute bi bi-chevron-down" 
//                           style={{bottom: '1%',left: '43%'}}
//                           onClick={() => select('year', 1)}
//                         ></i>
//                     </Col>
//                   </Row>
//                 </Container>
//               </Col>
//             </Row>
//           </Container>
//         </Col>
//         {/* DATE SELECTOR */}
//         <Col className={`${isTime ? 'col-auto' : 'col-sm-7'}`}>
//           <DatePicker
//             renderCustomHeader={({
//               date,
//               changeYear,
//               changeMonth,
//               decreaseMonth,
//               increaseMonth,
//               prevMonthButtonDisabled,
//               nextMonthButtonDisabled,
//             }) => (
//               <div
//                 style={{
//                   margin: 10,
//                   display: "flex",
//                   justifyContent: "center",
//                 }}
//               >
//                 <button 
//                   className="react-datepicker__navigation react-datepicker__navigation--previous" 
//                   aria-label="Previous Month"
//                   onClick={decreaseMonth} disabled={prevMonthButtonDisabled}
//                 >
//                   <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--previous">Previous Month</span>
//                 </button>
//                 <button 
//                   className="react-datepicker__navigation react-datepicker__navigation--next" 
//                   aria-label="Next Month"
//                   onClick={increaseMonth} disabled={nextMonthButtonDisabled}
//                 >
//                   <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--next">Next Month</span>
//                 </button>
//                 <OverlayTrigger
//                   trigger="click"
//                   placement={'bottom'}
//                   rootClose={true}
//                   overlay={
//                     <Popover id={`popover-positioned-bottom`} 
//                       className="border border-1 shadow-lg" 
//                       style={{borderRadius:'1.5rem'}}
//                     >
//                       <Popover.Body>
//                         <Row>
//                           {
//                             (monthNames ?? []).map((month, index) => (
//                               <Col key={index} className="text-center"
//                                 style={{maxWidth: '109px'}}
//                               >
//                                 <button
//                                   className="btn btn-link text-center"
//                                   onClick={() => changeMonth(index)}
//                                 >
//                                   <span className="text-darck-blue">{month}</span>
//                                 </button>
//                               </Col>
//                             ))
//                           }
//                           <Row className="ms-1 mt-2">
//                             <Col className="position-relative">
//                               <button 
//                                 className="year-up react-datepicker__navigation react-datepicker__navigation--previous" 
//                                 aria-label="Previous Year"
//                                 style={{top: '0 !important'}}
//                                 onClick={() => select('year', 1)}
//                               >
//                                 <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--previous">Previous Year</span>
//                               </button>
//                             </Col>
//                             <Col>
//                               <span className="fs-5 text-blue-gray">{date.getFullYear()}</span>
//                             </Col>
//                             <Col className="position-relative">
//                               <button 
//                                 className="year-down react-datepicker__navigation react-datepicker__navigation--next" 
//                                 aria-label="Next Year"
//                                 onClick={() => select('year', -1)}
//                               >
//                                 <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--next">Next Year</span>
//                               </button>
//                             </Col>
//                           </Row>
//                         </Row>
//                       </Popover.Body>
//                     </Popover>
//                   }
//                 >
//                   <div className="react-datepicker__current-month">
//                     {monthNames[date.getMonth()]} {date.getFullYear()}
//                   </div>
//                 </OverlayTrigger>
      
//               </div>
//             )}
//             peekNextMonth
//             inline
//             disabledKeyboardNavigation
//             dropdownMode="select"
//             locale={ru}
//             dateFormat={`dd.MM.yyy ${isTime ? 'HH:mm' : ''}}`}
//             name="birthday"
//             closeOnScroll={true}
//             selected={birthday}
//             minDate={isFuture ? new Date() : new Date('1940-01-01 00:00:00')}
//             maxDate={new Date().setFullYear(new Date().getFullYear() + 1)}
//             className="fw-semibold"
//             onChange={(date: Date): void => setBirthday(date)}
//           />
//         </Col>
//         {/* TIME SELECTOR */}
//         <Col lg sm xxs='7' className={`${isTime ? '' : 'd-none'}`}>
//           <Container className="year-picker px-3">
//             <Row className="d-none d-sm-block">
//               <Col className="text-center">
//                 <span className="text-uppercase">{AppService.getLocalizedText(localization, 'time')}</span>
//               </Col>
//             </Row>
//             <Row className="border border-1 p-1 px-3 my-2" 
//               style={{borderRadius:'1.5rem', borderColor:'var(--gosu-blue-space-light-100)!important'}}>
//               <Col className="px-0 px-sm-2 px-lg-1">
//                 <Container className="m-0 p-0">
//                   <Row>
//                     <Col className="text-center p-0 m-0 my-2">
//                       <span className="date-year-select">{valueGroups.hours}:{valueGroups.minutes}</span>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col className="text-center p-0 m-0">
//                       <span className="date-year-select text-uppercase" style={{fontSize:'12px'}}>{AppService.getLocalizedText(localization, 'hours')}</span>
//                     </Col>
//                     <Col className="text-center p-0 m-0">
//                       <span className="date-year-select text-uppercase" style={{fontSize:'12px'}}>{AppService.getLocalizedText(localization, 'minutes')}</span>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col className="position-relative text-center p-0 m-0">
//                         <select className="form-select border-0 my-4 bg-transparent" 
//                           size={3}
//                           name="hours" 
//                           value={valueGroups.hours} 
//                           onChange={(e) => handleChange('hours', e.target.value)}
//                         >
//                           {optionGroups.hours.map((option) => (
//                             <option key={option} value={option} className='text-center'>
//                               {option}
//                             </option>
//                           ))}
//                         </select>
//                         <i 
//                           role="button" 
//                           className="position-absolute bi bi-chevron-up" 
//                           style={{top: '3%',left: '37%'}}
//                           onClick={() => select('hours', -1)}
//                         ></i>
//                         <i 
//                           role="button" 
//                           className="position-absolute bi bi-chevron-down" 
//                           style={{bottom: '0.5%',left: '37%'}}
//                           onClick={() => select('hours', 1)}
//                         ></i>
//                     </Col>
//                     <Col className="position-relative text-center p-0 m-0">
//                         <select className="form-select border-0 my-4 bg-transparent" 
//                           size={3}
//                           name="minutes" 
//                           value={valueGroups.minutes} 
//                           onChange={(e) => handleChange('minutes', e.target.value)}
//                         >
//                           {optionGroups.minutes.map((option) => (
//                             <option key={option} value={option} className='text-center'>
//                               {option}
//                             </option>
//                           ))}
//                         </select>
//                         <i 
//                           role="button" 
//                           className="position-absolute bi bi-chevron-up" 
//                           style={{top: '3%',left: '37%'}}
//                           onClick={() => select('minutes', -1)}
//                         ></i>
//                         <i 
//                           role="button" 
//                           className="position-absolute bi bi-chevron-down" 
//                           style={{bottom: '0.5%',left: '37%'}}
//                           onClick={() => select('minutes', 1)}
//                         ></i>
//                     </Col>
//                   </Row>
//                 </Container>
//               </Col>
//             </Row>
//           </Container>
//         </Col>
//       </Row>
//     </Col>
//     </>
//   );
// }
// export default DateTimePicker;