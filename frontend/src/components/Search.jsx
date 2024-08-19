import React, { useEffect, useState } from 'react';

import MasonryLayout from './MasonryLayout';
import api from '../utils/base';
import Spinner from './Spinner';

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm !== '') {
      setLoading(true);
      api.get(`/pin/search?searchTerm=${searchTerm}`).then((data) => {
        setPins(data.data);
        setLoading(false);
      });
    } else {
      api.get('/pin').then((data) => {
        setPins(data.data)
        setLoading(false)
      })
    }
  }, [searchTerm]);

  return (
    <div>

      {loading && <Spinner message="Searching pins" />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== '' && !loading && (
        <div className="mt-10 text-center text-xl ">No Pins Found!</div>
      )}
    </div>
  );
};

export default Search;