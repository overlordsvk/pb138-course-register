import React from 'react';
// import { DataGrid } from '@material-ui/data-grid';
import './main.css';
import { SubjectTableHeader, AvailiableSubject, IAvailiableSubject } from './listOfSubjects/AvailiableSubject';
import book from '../icons/book-solid.svg';
import myStudents from '../icons/user-graduate-solid.svg';
import mySubjects from '../icons/book-reader-solid.svg';

const subjects :IAvailiableSubject[] = [
  {
    id: 1, code: 'pb138', name: 'Moderni znackovaci jazyky a jejich aplikace', details: 'learn xml, xslt, xquery, html, css, react, and use of APIs', capacity: 50,
  },
  {
    id: 2, code: 'pv131', name: 'spracovanie digitalneho obrazu', details: 'learn how to process image in matlab', capacity: 50,
  },
];

// const columns = [
//   { field: 'id', headerName: 'ID', width: 100 },
//   { field: 'course', headerName: 'Course', width: 300 },
//   { field: 'cap', headerName: 'Capacity', width: 200 },
//   { field: 'semester', headerName: 'Semester', width: 200 },
// ];

// const rows = [
//   {
//     id: 1, course: 'PB138 znackovacie jazyky', cap: `${10} / ${50}`, semester: 'summer2021',
//   },
//   {
//     id: 2, course: 'PV131 spracovanie obrazu', cap: `${10} / ${50}`, semester: 'summer2021',
//   },
// ];

export const TopMenu = () => (
  <div className="main">
    <div className="row-headder">
      <div className="ISName">
        <h1 className="blue">Placeholder</h1>
      </div>
      <div className="mySubjects">
        <div className="nav-image">
          <img src={mySubjects} alt="my subjects" />
        </div>
        <span>my Subjects</span>
      </div>
      <div className="listOfSubjects">
        <img src={book} alt="list of subjects" />
      </div>
      <div className="myStudents">
        <img src={myStudents} alt="my students" />
      </div>
    </div>
    <div className="d">
      {SubjectTableHeader()}
      {subjects.map((subject) => AvailiableSubject(subject))}
    </div>
  </div>

);

export default TopMenu;
