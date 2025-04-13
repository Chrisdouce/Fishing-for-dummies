import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput, FormLabel, Box, Grid2, Button, FormControlLabel } from "@mui/material";
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
        <InputLabel id={`${filterType.toLowerCase()}-label`}>{filterType}</InputLabel>
        <Select
        labelId={`${filterType.toLowerCase()}-label`}
        multiple
        value={selectedModifiers.filter((modifier) => options.includes(modifier))}
        onChange={(e) => {
          const selected = e.target.value as string[];
          const updatedModifiers = selectedModifiers.filter((modifier) => !options.includes(modifier)).concat(selected);
          onChange(updatedModifiers);
          }}
          input={<OutlinedInput label={filterType} />}
          renderValue={(selected) => {
          const maxLength = 20; // Maximum length of the string
          const selectedString = selected.join(', ');
          return selectedString.length > maxLength
            ? `${selectedString.slice(0, maxLength)}...`
            : selectedString;
          }}
          >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
          <Checkbox checked={selectedModifiers.includes(option)} />
          <ListItemText primary={option} />
          </MenuItem>
        ))}
        </Select>
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