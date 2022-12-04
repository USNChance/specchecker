import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { AppList } from '../models/AppsModel';
import { GameObject } from '../models/GameModel';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

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

  const [selectedGame, setSelectedGame] = React.useState<GameObject>();

  const [id, setId] = React.useState<AppList>();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setUpdatedList(true);
    setSearch(e.target.value);
  }

  React.useEffect(() => {
    setIsLoaded(false);
    if (search !== "") {
      const fetch = async () => {
        try {
          const res = await axios.get("https://localhost:7217/api/FindGame?gamename=" + search)
          setGame({ ...game, results: res.data });
          setIsLoaded(true);
          setUpdatedList(false);
        } catch (err) {
          console.error(err);
        }
      };
      fetch();
    }
  }, [search, updatedList]);

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3);

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

  React.useEffect(() => {
    if (id) {
      setIsLoaded(false);
      console.log(id.appId + " " + id.name)
      const fetchGame = async () => {
        try {
          const res = await axios.get("https://localhost:7217/api/GetRequirements?id=" + id.appId)
          setSelectedGame(res.data);
          setIsLoaded(true);
        } catch (err) {
          console.error(err);
        }
      };
      fetchGame();
    }
  }, [id]);

  return (
    <div>
      <div>
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
          onChange={(event, value: AppList) => setId(value)}
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
      </div>
      <br />
      <div>
        {selectedGame &&
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={selectedGame.data.header_image}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {selectedGame.data.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: selectedGame.data.pc_requirements.minimum }} />
              <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: selectedGame.data.pc_requirements.recommended }} />
            </CardContent>
          </Card>
        }
      </div>
    </div>
  );
}