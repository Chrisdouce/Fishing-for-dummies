import { Box, Checkbox, Container, createTheme, CssBaseline, FormControl, FormControlLabel, FormLabel, Grid2, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, Typography } from "@mui/material"

import water from './assets/scc-data/water-sc.json';
import lava from './assets/scc-data/lava-sc.json';
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid/DataGrid/DataGrid";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const defaultProps = {
  options: [],
  getOptionLabel: (option: string) => option,
};

type SeaCreature = {
  "name": string,
  "weight": number
  "modifiers": string[]
}

function App() {
  const [bait, setBait] = useState('');
  const [location, setLocation] = useState('');
  const [hook, setHook] = useState('');
  const [sinker, setSinker] = useState('');
  const [pet, setPet] = useState('');
  const [eman, setEman] = useState(Boolean);
  const [hotspot, setHotspot] = useState(Boolean);
  const [chumcap, setChumcap] = useState(Boolean);
  const [spooky, setSpooky] = useState(Boolean);
  const [shark, setShark] = useState(Boolean);
  const [spookyPerk, setSpookyPerk] = useState('');
  const [icyHookPerk, setIcyHookPerk] = useState('');
  const [drakePiperPerk, setDrakePiperPerk] = useState('');
  const [sharkPerk, setSharkPerk] = useState('');

  function calculateTotalWeights(): number {
    let totalWaterWeight = 0;
    let totalLavaWeight = 0;
    water.forEach(sc => {
      totalWaterWeight += calculateWaterWeight(sc);
    });
    lava.forEach(sc => {
      totalLavaWeight += calculateLavaWeight(sc);
    });
    return totalWaterWeight > 0 ? totalWaterWeight : totalLavaWeight;
  }

  function calculateWaterWeight(sc: SeaCreature): number{
    let weight = sc.weight;
    const modifiers = new Set(sc.modifiers);
    if (
        (modifiers.has("Oasis") && location !== "Oasis") ||
        (modifiers.has("Hollows") && location !== "Hollows") ||
        (modifiers.has("Goblin") && location !== "Goblin") ||
        (modifiers.has("Bayou") && location !== "Bayou") ||
        (modifiers.has("Jerry") && location !== "Jerry") ||
        (modifiers.has("Night") && bait !== "Dark") ||
        (modifiers.has("Carrot") && bait !== "Carrot") ||
        (modifiers.has("Chumcap") && !chumcap) ||
        (modifiers.has("Hotspot") && !hotspot) ||
        (modifiers.has("Spooky") && !spooky) ||
        (modifiers.has("Shark") && !shark) ||
        location == "Lava" ||
        location == "Magma"
    ) return 0;

    if (modifiers.has("Hotspot")) {
      if (bait === "Hotspot") weight += sc.weight * 1.5;
      if (hook === "Hotspot") weight += sc.weight * 2;
      if (pet === "Hermit") weight += sc.weight * 1.2;
    }
    if (modifiers.has("Spooky")) {
      weight += sc.weight * Number(spookyPerk);
      if (hook === "Phantom") weight += sc.weight * 2;
      if (bait === "Spooky") weight += sc.weight * 1.15;
    }
    if(modifiers.has("Jerry")){
      weight += sc.weight * Number(icyHookPerk);
      if(sc.name === "Reindrake") weight += sc.weight * Number(drakePiperPerk);
      if(bait === "Ice") weight += sc.weight * 1.15;
      if(bait === "Frozen") weight += sc.weight * 1.35;
      if(sinker === "Icy") weight += sc.weight * 3;
    }
    if(modifiers.has("Shark")){
      weight += sc.weight * Number(sharkPerk);
      if(bait === "Shark") weight += sc.weight * 1.25;
      if(pet === "Megalodon") weight += sc.weight * 1.2;
    }
    if (modifiers.has("Mythic") && eman) {
        weight += sc.weight * 1.15;
    }
    if (["Dark", "Light", "Whale"].includes(bait) && sc.weight < 400) {
        weight += sc.weight * 1.25;
    }

    return weight;
  }

  function calculateLavaWeight(sc: SeaCreature): number{
    let weight = sc.weight;
    const modifiers = new Set(sc.modifiers);

    if (
        (modifiers.has("Magma") && location !== "Magma") ||
        (modifiers.has("Hollows") && location !== "Hollows") ||
        location !== "Lava"
    ) return 0;
    if (modifiers.has("Hotspot")) {
      if (bait === "Hotspot") weight += sc.weight * 1.5;
      if (hook === "Hotspot") weight += sc.weight * 2;
    }
    if (modifiers.has("Mythic") && eman) {
        weight += sc.weight * 1.15;
    }
    if (["Dark", "Light", "Whale"].includes(bait) && sc.weight < 400) {
        weight += sc.weight * 1.25;
    }
    return weight;
  }
  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h3" color="blue" sx={{pb:"20px"}}>Fishing For Dummies</Typography>
        <FormLabel>Basic fishing information:</FormLabel>
        <Grid2 container spacing={2}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="simple-location">Location</InputLabel>
            <Select
              labelId="simple-location"
              id="simple-location"
              value={location}
              label="Location"
              autoWidth
              onChange={(event: SelectChangeEvent<string>) => {
                setLocation(event.target.value as string);
              }}
            >
              <MenuItem value={"Water"}>Any Water</MenuItem>
              <MenuItem value={"Lava"}>Crimson Isle</MenuItem>
              <MenuItem value={"Jerry"}>Jerry's Workshop</MenuItem>
              <MenuItem value={"Oasis"}>Oasis</MenuItem>
              <MenuItem value={"Hollows"}>Precursor Remnants, Jungle, or Mithril Deposits</MenuItem>
              <MenuItem value={"Goblin"}>Goblin Holdout</MenuItem>
              <MenuItem value={"Bayou"}>Backwater Bayou</MenuItem>
              <MenuItem value={"Magma"}>Magma Fields</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="simple-bait">Bait</InputLabel>
            <Select
              labelId="simple-bait"
              id="simple-bait"
              value={bait}
              label="Bait"
              autoWidth
              onChange={(event: SelectChangeEvent<string>) => {
                setBait(event.target.value as string);
              }}
            >
              <MenuItem value={"None"}><em>None</em></MenuItem>
              <MenuItem value={"Whale"}>Whale Bait</MenuItem>
              <MenuItem value={"Dark"}>Dark Bait</MenuItem>
              <MenuItem value={"Light"}>Light Bait</MenuItem>
              <MenuItem value={"Carrot"}>Carrot Bait</MenuItem>
              <MenuItem value={"Icy"}>Icy Bait</MenuItem>
              <MenuItem value={"Frozen"}>Frozen Bait</MenuItem>
              <MenuItem value={"Spooky"}>Spooky Bait</MenuItem>
              <MenuItem value={"Shark"}>Shark Bait</MenuItem>
              <MenuItem value={"Hotspot"}>Hotspot Bait</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="simple-hook">Hook</InputLabel>
            <Select
              labelId="simple-hook"
              id="simple-hook"
              value={hook}
              label="Hook"
              autoWidth
              onChange={(event: SelectChangeEvent<string>) => {
                setHook(event.target.value as string);
              }}
            >
              <MenuItem value={"None"}><em>None</em></MenuItem>
              <MenuItem value={"Hotspot"}>Hotspot Hook</MenuItem>
              <MenuItem value={"Phantom"}>Phantom Hook</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="simple-sinker">Sinker</InputLabel>
            <Select
              labelId="simple-sinker"
              id="simple-sinker"
              value={sinker}
              label="Sinker"
              autoWidth
              onChange={(event: SelectChangeEvent<string>) => {
                setSinker(event.target.value as string);
              }}
            >
              <MenuItem value={"None"}><em>None</em></MenuItem>
              <MenuItem value={"Icy"}>Icy Sinker</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="simple-pet">Pet</InputLabel>
            <Select
              labelId="simple-pet"
              id="simple-pet"
              value={pet}
              label="Pet"
              autoWidth
              onChange={(event: SelectChangeEvent<string>) => {
                setPet(event.target.value as string);
              }}
            >
              <MenuItem value={"None"}><em>None</em></MenuItem>
              <MenuItem value={"Bat"}>Bat pet</MenuItem>
              <MenuItem value={"Hermit"}>Hermit Crab pet</MenuItem>
              <MenuItem value={"Megalodon"}>Megalodon pet</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <FormLabel>Are you fishing with:</FormLabel>
        <Grid2 container spacing={2}>
          <FormControlLabel control={<Checkbox />} onChange={(event, checked) => {
                setEman(checked);
              }} label="Eman 9?" />
          <FormControlLabel control={<Checkbox />} onChange={(event, checked) => {
                setHotspot(checked);
              }}  label="A Hotspot?" />
          <FormControlLabel control={<Checkbox />} onChange={(event, checked) => {
                setChumcap(checked);
              }}  label="A Chumcap?" />
          <FormControlLabel control={<Checkbox />} onChange={(event, checked) => {
                setSpooky(checked);
              }}  label="Spooky Festival?" />
          <FormControlLabel control={<Checkbox />} onChange={(event, checked) => {
                setShark(checked);
              }}  label="Fishing Festival?" />
        </Grid2>
        <Box hidden={location == "Lava" || location == "Magma"}>
          <Typography variant="h4" color="rgb(0, 162, 255)">Water</Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Probability</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {water
                  .filter((sc: SeaCreature) => calculateWaterWeight(sc) > 0)
                  .sort((a, b) => calculateWaterWeight(a) - calculateWaterWeight(b))
                  .map((sc: SeaCreature) => (
                    <TableRow
                      key={sc.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {sc.name}
                      </TableCell>
                      <TableCell>{calculateWaterWeight(sc).toFixed(0)}</TableCell>
                      <TableCell>{((calculateWaterWeight(sc) / calculateTotalWeights()) * 100).toFixed(3)}%</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box hidden={location !== "Lava" && location !== "Magma"}>
          <Typography variant="h4" color="rgb(255, 0, 0)">Lava</Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Weight</TableCell>
                  <TableCell>Probability</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lava.filter((sc: SeaCreature) => calculateLavaWeight(sc) > 0)
                  .sort((a, b) => calculateLavaWeight(a) - calculateLavaWeight(b)).map((sc: SeaCreature) => (calculateLavaWeight(sc) > 0) && (
                  <TableRow
                    key={sc.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {sc.name}
                    </TableCell>
                    <TableCell>{calculateLavaWeight(sc).toFixed(0)}</TableCell>
                    <TableCell>{((calculateLavaWeight(sc) / calculateTotalWeights()) * 100).toFixed(3)}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </ThemeProvider>
    </>
  )
}

export default App
