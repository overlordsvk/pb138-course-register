import React from 'react';
import './AvailiableSubject.css';

export interface IAvailiableSubject {
  id: number,
  code: string,
  name: string,
  details: string,
  credits: number,
  capacity: number,
}

export interface IAmountOfSubjects{
  amount: number;
}

export const AmountOfSubjects: React.FC<IAmountOfSubjects> = (props) => {
  const { amount } = props;
  return (
    <div className="current-panel__amount">
      <span>{ amount }</span>
    </div>
  );
};

export const SubjectTableHeader = () => (
  <div className="subject-details">
    <div className="subject-details__code">
      <span> Code </span>
    </div>
    <div className="subject-details__name">
      <span> Name </span>
    </div>
    <div className="subject-details__credits">
      <span> credits </span>
    </div>
    <div className="subject-details__cappacity">
      <span> Capacity </span>
    </div>
  </div>
);

export const AvailiableSubject: React.FC<IAvailiableSubject> = (props) => {
  const currentlyRegistered = 0; // change this to hasura count registered
  const {
    code, name, capacity, credits,
  } = props;
  return (
    <div className="subject-details">
      <div className="subject-details__code">
        <span>{ code }</span>
      </div>
      <div className="subject-details__name">
        <span>{ name }</span>
      </div>
      <div className="subject-details__credits">
        <span>{ credits }</span>
      </div>
      <div className="subject-details__capacity">
        <span>{ `${currentlyRegistered} / ${capacity}` }</span>
      </div>
    </div>
  );
};
