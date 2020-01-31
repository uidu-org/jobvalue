import React from 'react';
import { UserProfileProps } from '../types';

export default function JobCustomizations(props: UserProfileProps) {
  const { industry, province, birthdate, qualification, gender } = props;
  return (
    <>
      <h6>Il tuo mercato</h6>
      <p>
        Settore: {industry.name}
        <br />
        Regione sede di lavoro: {province}
      </p>
      <h6>Le tue caratteristiche anagrafiche</h6>
      TODO: icone
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
