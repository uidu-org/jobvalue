import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Benefits from '..';
import { apiBaseUrl } from '../../utils';

export default function Basic() {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get(
        `${
          apiBaseUrl[process.env.NODE_ENV]
        }/api/search/141-2/benefits?token=jobpricing`,
      )
      .then(response => setData(response.data));
    return () => {
      setData(null);
    };
  }, []);
  return <Benefits data={data} />;
}
