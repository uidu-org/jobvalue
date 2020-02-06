import { ageRangeFromBirthdate } from '@jobvalue/utils';
import React from 'react';
import { Award, Briefcase, Tag, User } from 'react-feather';
import { UserProfileProps } from '../types';

export default function JobCustomizations(props: UserProfileProps) {
  const { industry, province, birthdate, qualification, gender } = props;
  return (
    <>
      <dl className="mb-0">
        <dd className="d-flex align-items-center">
          <span className="d-flex align-items-center">
            <Briefcase size={16} className="mr-2" />
            {industry.name}
          </span>
          <small className="text-muted ml-auto font-weight-light">
            Settore
          </small>
        </dd>
        <dd className="d-flex align-items-center">
          <span className="d-flex align-items-center">
            <Tag size={16} className="mr-2" />
            {ageRangeFromBirthdate(birthdate)}
          </span>
          <small className="text-muted ml-auto font-weight-light">
            Fascia d'età
          </small>
        </dd>
        <dd className="d-flex align-items-center">
          <span className="d-flex align-items-center">
            <Award size={16} className="mr-2" />
            {qualification}
          </span>
          <small className="text-muted ml-auto font-weight-light">
            Titolo di studio
          </small>
        </dd>
        <dd className="d-flex align-items-center">
          <span className="d-flex align-items-center">
            <User size={16} className="mr-2" />
            {gender}
          </span>
          <small className="text-muted ml-auto font-weight-light">Genere</small>
        </dd>
      </dl>
    </>
  );
}
