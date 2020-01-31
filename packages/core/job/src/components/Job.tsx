import React from 'react';
import { UserProfileProps } from '../types';

export default function Job(props: UserProfileProps) {
  const { job, industry, province, birthdate, qualification, gender } = props;
  console.log(props);
  return (
    <>
      <div>
        <h6>{job.name}</h6>
        <p>{job.description}</p>
      </div>
      <h6>Il tuo mercato</h6>
      <p>
        Settore: {industry.name}
        <br />
        Regione sede di lavoro: {province}
      </p>
      <h6>Le tue caratteristiche anagrafiche</h6>
      <p>
        Fascia d'età anagrafica: {birthdate}
        <br />
        Titolo di studio: {qualification}
        <br />
        Genere: {gender}
      </p>
    </>
  );
}
