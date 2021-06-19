import React from 'react';
import './AvailiableSubject.css';

export interface IAvailiableSubject {
  id: number,
  code: string,
  name: string,
  details: string,
  capacity: number,
}

export const SubjectTableHeader = () => (
  <div className="subject-details">
    <div className="subject-details__code">
      <span> Code </span>
    </div>
    <div className="subject-details__name">
      <span> Name </span>
    </div>
    <div className="subject-details__cappacity">
      <span> Capacity </span>
    </div>
  </div>
);

export const AvailiableSubject: React.FC<IAvailiableSubject> = (props) => {
  const currentlyRegistered = 0; // change this to hasura count registered
  const {
    code, name, capacity,
  } = props;
  return (
    <div className="subject-details">
      <div className="subject-details__code">
        <span>{ code }</span>
      </div>
      <div className="subject-details__name">
        <span>{ name }</span>
      </div>
      <div className="subject-details__cappacity">
        <span>{ `${currentlyRegistered} / ${capacity}` }</span>
      </div>
    </div>
  );
};
