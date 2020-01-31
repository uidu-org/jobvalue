import React from 'react';
import Job from '..';
import { mockUser } from '../examples-utils';

export default function Basic() {
  return <Job {...mockUser} />;
}
