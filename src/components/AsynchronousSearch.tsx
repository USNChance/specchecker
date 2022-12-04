import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { AppList } from '../models/AppsModel';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}



export default function Asynchronous() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly AppList[]>([]);
  const loading = open && options.length === 0;
  const [game, setGame] = React.useState({
    slug: "",
    results: [],
  });
  const [updatedList, setUpdatedList] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [isLoaded, setIsLoaded] = React.useState(false);
  const axios = require("axios").default;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setUpdatedList(true);
    setSearch(e.target.value);
  }

  React.useEffect(() => 
  {
    setIsLoaded(false);
    if (search !== "") {
      const timeoutId = setTimeout(() => {
        const fetch = async () => {
          try {
            const res = await axios.get("https://localhost:7217/api/FindGame?gamename="+search)
            setGame({ ...game, results: res.data });
            setIsLoaded(true);
            setUpdatedList(false);
          } catch (err) {
            console.error(err);
          }
        };
        fetch();
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [search, updatedList]);

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active && isLoaded) {
        setOptions([...game.results]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, isLoaded]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      color='black'
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option: AppList) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search your specs"
          onChange={((e) => handleChange(e))}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading && isLoaded ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}