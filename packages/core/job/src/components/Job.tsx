import React from 'react';
import { UserProfileProps } from '../types';

export default function Job(props: UserProfileProps) {
  const { job } = props;
  return (
    <>
      <h5>{job.name}</h5>
      <p>{job.description}</p>
    </>
  );
}
