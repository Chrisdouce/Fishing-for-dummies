// Filter.tsx
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput, FormLabel, Box } from "@mui/material";
import { useState } from "react";

const allModifiers = ["Spooky", "Shark", "Hotspot", "Jerry", "Oasis", "Hollows", "Goblin", "Bayou", "Quarry", "Chumcap", "Squid", "Common", "Mythic", "Legendary", "Epic", "Rare", "Uncommon", "Night", "Carrot"];

interface FilterProps {
  selectedModifiers: string[];
  onChange: (newModifiers: string[]) => void;
}

function Filter({ selectedModifiers, onChange }: FilterProps) {
  return (
    <>
    <FormLabel><strong>Filter:</strong></FormLabel>
    <Box>
        <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="modifier-label">Modifiers</InputLabel>
        <Select
            labelId="modifier-label"
            multiple
            value={selectedModifiers}
            onChange={(e) => onChange(e.target.value as string[])}
            input={<OutlinedInput label="Modifiers" />}
            renderValue={(selected) => selected.join(', ')}
        >
            {allModifiers.map((modifier) => (
            <MenuItem key={modifier} value={modifier}>
                <Checkbox checked={selectedModifiers.includes(modifier)} />
                <ListItemText primary={modifier} />
            </MenuItem>
            ))}
        </Select>
        </FormControl>
    </Box>
    </>
  );
}

export default Filter;