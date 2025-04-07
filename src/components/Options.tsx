import { FormLabel, Grid2, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem, FormControlLabel, Checkbox } from "@mui/material";
import { JSX } from "react";
import type { FishingInfo } from "../types/types";

interface FishingInfoProps {
  fishingInfo: FishingInfo;
  setFishingInfo: React.Dispatch<React.SetStateAction<any>>;
}

function FishingInfo({ fishingInfo, setFishingInfo }: FishingInfoProps): JSX.Element {
  const handleChange = (field: string) => (event: SelectChangeEvent<string>) => {
    setFishingInfo((prev: any) => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleCheckboxChange = (field: string) => (_event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setFishingInfo((prev: any) => ({
      ...prev,
      [field]: checked
    }));
  };

  const handlePerks = () => (_event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setFishingInfo((prev: any) => ({
      ...prev,
      spookyPerk: checked ? 5 : 0,
      icyHookPerk: checked ? 5 : 0,
      drakePiperPerk: checked ? 5 : 0,
      sharkPerk: checked ? 5 : 0
    }));
  };
  
  return (
      <>
      <FormLabel><strong>Basic fishing information:</strong></FormLabel>
      <Grid2 container spacing={2}>
        <FormControl sx={{ m: 1, minWidth: 110 }}>
          <InputLabel id="simple-location">Location</InputLabel>
          <Select
            labelId="simple-location"
            id="simple-location"
            value={fishingInfo.location}
            label="Location"
            autoWidth
            onChange={handleChange("location")}
          >
            <MenuItem value={"Water"}>Any Water</MenuItem>
            <MenuItem value={"Lava"}>Crimson Isle</MenuItem>
            <MenuItem value={"Jerry"}>Jerry's Workshop</MenuItem>
            <MenuItem value={"Oasis"}>Oasis</MenuItem>
            <MenuItem value={"Hollows"}>Precursor Remnants, Jungle, or Mithril Deposits</MenuItem>
            <MenuItem value={"Goblin"}>Goblin Holdout</MenuItem>
            <MenuItem value={"Bayou"}>Backwater Bayou</MenuItem>
            <MenuItem value={"Magma"}>Magma Fields</MenuItem>
            <MenuItem value={"Quarry"}>Abandoned Quarry</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="simple-bait">Bait</InputLabel>
          <Select
            labelId="simple-bait"
            id="simple-bait"
            value={fishingInfo.bait}
            label="Bait"
            autoWidth
            onChange={handleChange("bait")}
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
            <MenuItem value={"Worm"}>Worm Bait</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="simple-hook">Hook</InputLabel>
          <Select
            labelId="simple-hook"
            id="simple-hook"
            value={fishingInfo.hook}
            label="Hook"
            autoWidth
            onChange={handleChange("hook")}
          >
            <MenuItem value={"None"}><em>None</em></MenuItem>
            <MenuItem value={"Hotspot"}>Hotspot Hook</MenuItem>
            <MenuItem value={"Phantom"}>Phantom Hook</MenuItem>
            <MenuItem value={"Common"}>Common Hook</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 90 }}>
          <InputLabel id="simple-sinker">Sinker</InputLabel>
          <Select
            labelId="simple-sinker"
            id="simple-sinker"
            value={fishingInfo.sinker}
            label="Sinker"
            autoWidth
            onChange={handleChange("sinker")}
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
            value={fishingInfo.pet}
            label="Pet"
            autoWidth
            onChange={handleChange("pet")}
          >
            <MenuItem value={"None"}><em>None</em></MenuItem>
            <MenuItem value={"Bat"}>Bat pet</MenuItem>
            <MenuItem value={"Hermit"}>Hermit Crab pet</MenuItem>
            <MenuItem value={"Megalodon"}>Megalodon pet</MenuItem>
          </Select>
        </FormControl>
      </Grid2>
      <FormLabel><strong>Are you fishing with:</strong></FormLabel>
      <Grid2 container spacing={2}>
        <FormControlLabel control={<Checkbox checked={fishingInfo.eman} onChange={handleCheckboxChange("eman")} />} label="Eman 9?"/>
        <FormControlLabel control={<Checkbox checked={fishingInfo.hotspot} onChange={handleCheckboxChange("hotspot")} />} label="A Hotspot?" />
        <FormControlLabel control={<Checkbox checked={fishingInfo.chumcap} onChange={handleCheckboxChange("chumcap")}/>}  label="A Chumcap?" />
        <FormControlLabel control={<Checkbox checked={fishingInfo.spooky} onChange={handleCheckboxChange("spooky")}/>}  label="Spooky Festival?" />
        <FormControlLabel control={<Checkbox checked={fishingInfo.shark} onChange={handleCheckboxChange("shark")}/>}  label="Fishing Festival?" />
        <FormControlLabel control={<Checkbox checked={fishingInfo.squid} onChange={handleCheckboxChange("squid")}/>}  label="Squid Hat?" />
        <FormControlLabel control={<Checkbox checked={fishingInfo.sharkArmor} onChange={handleCheckboxChange("sharkArmor")}/>}  label="4/4 Shark Armor?" />
        <FormControlLabel control={<Checkbox checked={fishingInfo.spookyPerk > 0} onChange={handlePerks()}/>} label="Max Perks?" />
      </Grid2>
      </>
  );
}

export default FishingInfo;