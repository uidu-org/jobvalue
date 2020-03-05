import { ageRangeFromBirthdate } from '@jobvalue/utils';
import React from 'react';
import { Award, Briefcase, Tag, User } from 'react-feather';
import { UserProfileProps } from '../types';

export default function JobCustomizations(props: UserProfileProps) {
  const { industry, province, birthdate, qualification, gender } = props;
  return (
    <>
      <dl className="mb-0">
        <dd className="d-flex align-items-center justify-content-between">
          <span className="d-flex align-items-center" style={{ minWidth: 0 }}>
            <Briefcase size={16} className="mr-2 flex-shrink-0" />
            <span className="text-truncate">{industry.name}</span>
          </span>
          <small className="text-muted ml-3 font-weight-light flex-shrink-0">
            Settore
          </small>
        </dd>
        <dd className="d-flex align-items-center justify-content-between">
          <span className="d-flex align-items-center" style={{ minWidth: 0 }}>
            <Tag size={16} className="mr-2 flex-shrink-0" />
            <span className="text-truncate">
              {ageRangeFromBirthdate(birthdate)}
            </span>
          </span>
          <small className="text-muted ml-3 font-weight-light flex-shrink-0">
            Fascia d'età
          </small>
        </dd>
        <dd className="d-flex align-items-center justify-content-between">
          <span className="d-flex align-items-center" style={{ minWidth: 0 }}>
            <Award size={16} className="mr-2 flex-shrink-0" />
            <span className="text-truncate">{qualification}</span>
          </span>
          <small className="text-muted ml-3 font-weight-light flex-shrink-0">
            Titolo di studio
          </small>
        </dd>
        <dd className="d-flex align-items-center justify-content-between">
          <span className="d-flex align-items-center" style={{ minWidth: 0 }}>
            <User size={16} className="mr-2 flex-shrink-0" />
            <span className="text-truncate">{gender}</span>
          </span>
          <small className="text-muted ml-3 font-weight-light flex-shrink-0">
            Genere
          </small>
        </dd>
      </dl>
    </>
  );
}
