import { Box, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { JSX } from "react";
import water from '../assets/scc-data/water-sc.json';
import { FishingInfo, SeaCreature } from "../types/types";

interface TableProps {
  fishingInfo: FishingInfo;
}

function WaterTable({ fishingInfo }: TableProps): JSX.Element {
  const {
    bait, location, hook, sinker, pet,
    eman, hotspot, chumcap, spooky, shark, squid, sharkArmor,
    spookyPerk, icyHookPerk, drakePiperPerk, sharkPerk
  } = fishingInfo;
  
  function calculateTotalWaterWeights(modifiers = true): number {
      let totalWaterWeight = 0;
      water.forEach(sc => {
        totalWaterWeight += calculateWaterWeight(sc, modifiers);
      });
      return totalWaterWeight;
  }

  function calculateWaterWeight(sc: SeaCreature, modify: boolean = true): number{
      let weight = sc.weight;
      const modifiers = new Set(sc.modifiers);
      if(bait === "Worm" && !sc.name.match(/Worm/) && location === "Hollows" || location === "Goblin") return 0;
      if (
          (modifiers.has("Oasis") && location !== "Oasis") ||
          (modifiers.has("Hollows") && location !== "Hollows") ||
          (modifiers.has("Goblin") && location !== "Goblin") ||
          (modifiers.has("Bayou") && location !== "Bayou") ||
          (modifiers.has("Jerry") && location !== "Jerry") ||
          (modifiers.has("Quarry") && location !== "Quarry") ||
          (modifiers.has("Night") && bait !== "Dark") ||
          (modifiers.has("Carrot") && bait !== "Carrot") ||
          (modifiers.has("Chumcap") && !chumcap) ||
          (modifiers.has("Hotspot") && !hotspot) ||
          (modifiers.has("Spooky") && !spooky) ||
          (modifiers.has("Shark") && !shark) ||
          location == "Lava" ||
          location == "Magma"
      ) return 0;
      if (modify){
        if (modifiers.has("Hotspot")) {
            if (bait === "Hotspot") weight += sc.weight * .5;
            if (hook === "Hotspot") weight += sc.weight * 1;
            if (pet === "Hermit") weight += sc.weight * .2;
        }
        if (modifiers.has("Spooky")) {
            weight += sc.weight * (spookyPerk * .02);
            if (hook === "Phantom") weight += sc.weight * 1;
            if (bait === "Spooky") weight += sc.weight * .15;
            if (pet === "Bat") weight += sc.weight * .25;
        }
        if(modifiers.has("Jerry")){
            weight += sc.weight * (icyHookPerk * .02);
            if(sc.name === "Reindrake") weight += sc.weight * (drakePiperPerk * .02);
            if(bait === "Ice") weight += sc.weight * .15;
            if(bait === "Frozen") weight += sc.weight * .35;
            if(sinker === "Icy") weight += sc.weight * 2;
        }
        if(modifiers.has("Shark")){
            weight += sc.weight * (sharkPerk * .02);
            if(bait === "Shark") weight += sc.weight * .2;
            if(pet === "Megalodon") weight += sc.weight * .2;
            if(sharkArmor) weight += sc.weight * .25;
        }
        if(modifiers.has("Squid") && squid) {
            weight += sc.weight * 1;
        }
        if(modifiers.has("Common") && hook === "Common") {
            weight += sc.weight * .25;
        }
        if (modifiers.has("Mythic") && eman) {
            weight += sc.weight * .15;
        }
        if (["Dark", "Light", "Whale"].includes(bait) && sc.weight < 400) {
            weight += sc.weight * .25;
        }
      }
      return weight;
  }

  function getColor(sc: SeaCreature): string {
    if (sc.modifiers.includes("Mythic")) {
      return "rgb(255, 0, 170)";
    } else if (sc.modifiers.includes("Legendary")) {
      return "orange";
    } else if (sc.modifiers.includes("Epic")) {
      return "rgb(141, 0, 141)";
    } else if (sc.modifiers.includes("Rare")) {
      return "rgb(0, 162, 255)";
    } else if (sc.modifiers.includes("Uncommon")) {
      return "rgb(0, 255, 0)";
    } else if (sc.modifiers.includes("Common")) {
      return "white";
    } else {
      return "red";
    }
  }
  return (
      <Box hidden={calculateTotalWaterWeights() == 0} sx={{ mt: 3 }}>
        <Typography variant="h4" color="rgb(0, 162, 255)" sx={{pb: 1}}>Water</Typography>
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
                .map((sc: SeaCreature) => ({
                  ...sc,
                  waterWeight: calculateWaterWeight(sc),
                }))
                .filter(sc => sc.waterWeight > 0)
                .sort((a, b) => a.waterWeight - b.waterWeight)
                .map((sc) => {
                  const totalWaterWeight = calculateTotalWaterWeights();
                  const totalWaterWeightUnmodified = calculateTotalWaterWeights(false);
                  const percentage = (sc.waterWeight / totalWaterWeight) * 100;
                  const originalPercentage = (sc.weight / totalWaterWeightUnmodified) * 100;
                  const percentageDiff = percentage - originalPercentage;
                  const showBox = percentageDiff !== 0;

                  return (
                    <TableRow key={sc.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row" style={{ color: getColor(sc) }}>
                        {sc.name}
                      </TableCell>
                      <TableCell>{sc.waterWeight.toFixed(0)}</TableCell>
                      <TableCell>
                        {percentage.toFixed(3)}%
                        {showBox && (
                          <Box color={percentageDiff >= 0 ? "green" : "red"}>
                            ({percentageDiff > 0 ? "+" : ""}
                            {percentageDiff.toFixed(3)}%)
                          </Box>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
  );
}

export default WaterTable;