import React from 'react';
import Province from '..';

export default function Basic() {
  return (
    <>
      <div className="card mb-5">
        <div className="card-header border-bottom">
          Valore e costo del tuo lavoro annuo
        </div>
        <Province province={{ code: 'BG' }} />
      </div>
    </>
  );
}
