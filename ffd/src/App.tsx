import { Autocomplete, Checkbox, Container, createTheme, CssBaseline, FormControlLabel, FormGroup, TextField, ThemeProvider, Typography } from "@mui/material"

import water from './assets/scc-data/water-sc.json';
import lava from './assets/scc-data/lava-sc.json';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const defaultProps = {
  options: [],
  getOptionLabel: (option: string) => option,
};

function App() {

  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h3" color="gray">Fishing For Dummies</Typography>
        <Container>
          <Typography variant="h4" color="rgb(0, 162, 255)">Water</Typography>
          <Typography>{water.map(fish => fish.name).join(', ')}</Typography>
        </Container>
        <Container>
          <Typography variant="h4" color="rgb(255, 72, 0)">Lava</Typography>
          <Typography>{lava.map(fish => fish.name).join(', ')}</Typography>
        </Container>
        <Autocomplete
          {...defaultProps}
          renderInput={(params) => <TextField {...params} label="Bait" />}
        />
        <Autocomplete
          {...defaultProps}
          renderInput={(params) => <TextField {...params} label="Location" />}
        />
        <FormGroup>
          <FormControlLabel required control={<Checkbox defaultChecked />} label="Hotspot" />
        </FormGroup>
        <Typography>{water.filter(fish => fish.weight < 100).map(fish => fish.name).join(', ')}</Typography>
        <Typography>{lava.filter(fish => fish.weight < 100).map(fish => fish.name).join(', ')}</Typography>
        
      </Container>
    </ThemeProvider>
    </>
  )
}

export default App
