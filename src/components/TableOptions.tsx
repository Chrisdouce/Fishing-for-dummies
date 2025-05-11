import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput, FormLabel, Box, Grid2, Button, FormControlLabel, Autocomplete, TextField } from "@mui/material";
import water from '../assets/scc-data/water-sc.json';
import lava from '../assets/scc-data/lava-sc.json';

const rarity = ["Common", "Uncommon", "Rare", "Epic", "Legendary", "Mythic"];
const type = ["Spooky", "Shark", "Hotspot", "Jerry", "Worm", "Goblin", "Bayou", "Quarry", "Chumcap", "Squid", "Carrot", "Oasis"];
const names = water.map((sc) => sc.name).concat(lava.map((sc) => sc.name)).filter((value, index, self) => self.indexOf(value) === index).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));


interface FilterProps {
  selectedModifiers: string[];
  onChange: (newModifiers: string[]) => void;
}

function Filter({ selectedModifiers, onChange}: FilterProps) {
  return (
    <>
    <FormLabel sx={{ mb: 2, display: 'block' }}><strong>Filters:</strong></FormLabel>
    <Grid2 container spacing={2}>
      {["Rarity", "Type", "Name"].map((filterType) => {
      const options = filterType === "Rarity" ? rarity : filterType === "Type" ? type : names;
      return (
      <FormControl key={filterType} sx={{ mr: 1, minWidth: 200 }}>
        <Autocomplete
          multiple
          options={options}
          value={selectedModifiers.filter((modifier) => options.includes(modifier))}
          onChange={(event, newValue) => {
            const updatedModifiers = [
              ...selectedModifiers.filter((modifier) => !options.includes(modifier)),
              ...newValue,
            ];
            onChange(updatedModifiers);
          }}
          sx={filterType === "Name" ? { width: 300 } : {}}
          renderInput={(params) => <TextField {...params} label={filterType} variant="outlined" />}
          disableCloseOnSelect
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox checked={selected} />
              {option}
            </li>
          )}
        />
      </FormControl>
      );
      })}
    </Grid2>
    <Grid2 container spacing={2}>
      <Box sx={{ mt: 2, textAlign: 'left' }}>
        <Button variant="text" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} color="error" size="small" onClick={() => onChange([])}>
        Clear
        </Button>
      </Box>
    </Grid2>
    </>
  );
}

export default Filter;