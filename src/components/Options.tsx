import {
  FormLabel,
  Grid2,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  FormControlLabel,
  Checkbox,
  TextField
} from "@mui/material";
import { JSX, useEffect } from "react";
import type { FishingInfo } from "../types/types";

interface FishingInfoProps {
  fishingInfo: FishingInfo;
  setFishingInfo: React.Dispatch<React.SetStateAction<any>>;
}

const baitOptions = [
  { value: "None", label: <em>None</em> },
  { value: "Whale", label: "Whale Bait" },
  { value: "Dark", label: "Dark Bait" },
  { value: "Light", label: "Light Bait" },
  { value: "Carrot", label: "Carrot Bait" },
  { value: "Frozen", label: "Frozen Bait" },
  { value: "Spooky", label: "Spooky Bait" },
  { value: "Shark", label: "Shark Bait" },
  { value: "Hotspot", label: "Hotspot Bait" }
];

const locationOptions = [
  { value: "Water", label: "Any Water" },
  { value: "Lava", label: "Crimson Isle" },
  { value: "Jerry", label: "Jerry's Workshop" },
  { value: "Oasis", label: "Oasis" },
  { value: "Hollows", label: "Precursor Remnants, Jungle, or Mithril Deposits" },
  { value: "Goblin", label: "Goblin Holdout" },
  { value: "Bayou", label: "Backwater Bayou" },
  { value: "Magma", label: "Magma Fields" },
  { value: "Quarry", label: "Abandoned Quarry" },
  { value: "Galatea", label: <><span style={{ color: "hotpink" }}>(NEW!) </span> <span> Galatea</span></> }
];

const hookOptions = [
  { value: "None", label: <em>None</em> },
  { value: "Hotspot", label: "Hotspot Hook" },
  { value: "Phantom", label: "Phantom Hook" },
  { value: "Common", label: "Common Hook" }
];

const petOptions = [
  { value: "None", label: <em>None</em> },
  { value: "Bat", label: "Bat Pet" },
  { value: "Hermit", label: "Hermit Crab Pet" },
  { value: "Megalodon", label: "Megalodon Pet" }
];

function FishingInfo({ fishingInfo, setFishingInfo }: FishingInfoProps): JSX.Element {
  useEffect(() => {
    if (fishingInfo.tracking === undefined) {
      setFishingInfo((prev: any) => ({
        ...prev,
        tracking: 0
      }));
    }
  }, [fishingInfo.tracking, setFishingInfo]);

  const handleChange = (field: string) => (event: SelectChangeEvent<string>) => {
    setFishingInfo((prev: any) => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleCheckboxChange =
    (field: string) =>
    (_event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      setFishingInfo((prev: any) => ({
        ...prev,
        [field]: checked
      }));
    };

  const handlePerks =
    () => (_event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      setFishingInfo((prev: any) => ({
        ...prev,
        spookyPerk: checked ? 5 : 0,
        icyHookPerk: checked ? 5 : 0,
        drakePiperPerk: checked ? 5 : 0,
        sharkPerk: checked ? 5 : 0
      }));
    };

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(0, Number(event.target.value));

      setFishingInfo((prev: any) => ({
        ...prev,
        [field]: value
      }));
    };

  const renderSelect = (
    label: string,
    value: string,
    field: string,
    options: { value: string; label: any }[]
  ) => (
    <FormControl fullWidth size="small">
      <InputLabel>{label}</InputLabel>
      <Select value={value} label={label} onChange={handleChange(field)}>
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <>
      <FormLabel sx={{ mb: 2, display: "block" }}>
        <strong>Basic fishing information:</strong>
      </FormLabel>

      <Grid2 container spacing={2} alignItems="center">

        <Grid2 size={{ xs: 10, sm: 4 }}>
          {renderSelect("Location", fishingInfo.location, "location", locationOptions)}
        </Grid2>

        <Grid2 size={{ xs: 10, sm: 4 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Bait</InputLabel>
            <Select
              value={fishingInfo.bait}
              label="Bait"
              onChange={handleChange("bait")}
            >
              {baitOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}

              {(fishingInfo.location === "Hollows" ||
                fishingInfo.location === "Goblin") && (
                <MenuItem value="Worm">Worm Bait</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid2>

        <Grid2 size={{ xs: 10, sm: 4 }}>
          {renderSelect("Hook", fishingInfo.hook, "hook", hookOptions)}
        </Grid2>

        <Grid2 size={{ xs: 10, sm: 4 }}>
          {renderSelect("Pet", fishingInfo.pet, "pet", petOptions)}
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 3}}>
          <TextField
            label="Tracking"
            type="number"
            size="small"
            fullWidth
            value={fishingInfo.tracking}
            onChange={handleInputChange("tracking")}
            slotProps={{
              htmlInput: { min: 0 },
              inputLabel: {
                sx: {
                  color: "hotpink",
                  "&.Mui-focused": { color: "hotpink" }
                }
              }
            }}
          />
        </Grid2>

      </Grid2>

      <FormLabel sx={{ mt: 3, mb: 1, display: "block" }}>
        <strong>Are you fishing with:</strong>
      </FormLabel>

      <Grid2 container spacing={2}>

        <FormControlLabel
          control={
            <Checkbox
              checked={fishingInfo.spookyPerk > 0}
              onChange={handlePerks()}
            />
          }
          label="Max Perks?"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={fishingInfo.hotspot}
              onChange={handleCheckboxChange("hotspot")}
            />
          }
          label="A Hotspot?"
        />

        {fishingInfo.location !== "Lava" &&
          fishingInfo.location !== "Magma" && (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={fishingInfo.chumcap}
                    onChange={handleCheckboxChange("chumcap")}
                  />
                }
                label="A Chumcap?"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={fishingInfo.spooky}
                    onChange={handleCheckboxChange("spooky")}
                  />
                }
                label="Spooky Festival?"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={fishingInfo.shark}
                    onChange={handleCheckboxChange("shark")}
                  />
                }
                label="Fishing Festival?"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={fishingInfo.squid}
                    onChange={handleCheckboxChange("squid")}
                  />
                }
                label="Squid Hat?"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={fishingInfo.sharkArmor}
                    onChange={handleCheckboxChange("sharkArmor")}
                  />
                }
                label="4/4 Shark Armor?"
              />
            </>
          )}

      </Grid2>
    </>
  );
}

export default FishingInfo;