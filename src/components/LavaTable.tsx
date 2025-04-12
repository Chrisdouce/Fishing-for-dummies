import { Box, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { JSX } from "react";
import { FishingInfo, SeaCreature } from "../types/types";
import lava from '../assets/scc-data/lava-sc.json';

interface TableProps {
  fishingInfo: FishingInfo;
  selectedModifiers: string[];
}

function LavaTable({ fishingInfo, selectedModifiers }: TableProps): JSX.Element {
  const {
    bait, location, hook, sinker, pet,
    eman, hotspot, chumcap, spooky, shark, squid, sharkArmor,
    spookyPerk, icyHookPerk, drakePiperPerk, sharkPerk
  } = fishingInfo;

  const filteredCreatures = lava.filter((sc: SeaCreature) =>
    selectedModifiers.length === 0 ||
    selectedModifiers.some(mod => sc.modifiers.includes(mod))
  );

  function calculateTotalLavaWeights(modifiers: boolean = true): number {
      let totalLavaWeight = 0;
      lava.forEach(sc => {
        totalLavaWeight += calculateLavaWeight(sc, modifiers);
      });
      return totalLavaWeight;
  }
  
  function calculateLavaWeight(sc: SeaCreature, modify: boolean = true): number{
      let weight = sc.weight;
      const modifiers = new Set(sc.modifiers);
      if(location !== "Lava" && location !== "Magma" && location !== "Hollows") return 0;
      if(bait === "Worm" && !sc.name.match(/Worm/) && location === "Hollows") return 0;
      if (
          (modifiers.has("Magma") && location !== "Magma") ||
          (modifiers.has("Hollows") && location !== "Hollows") ||
          (modifiers.has("Hotspot") && !hotspot) ||
          (!modifiers.has("Hollows") && location === "Hollows") ||
          (!modifiers.has("Magma") && location === "Magma")
      ) return 0;
      if(modify){
          if (modifiers.has("Hotspot")) {
              if (bait === "Hotspot") weight += sc.weight * .5;
              if (hook === "Hotspot") weight += sc.weight * 1;
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
      <Box hidden={calculateTotalLavaWeights() == 0}>
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
            {filteredCreatures
              .map((sc: SeaCreature) => ({
                ...sc,
                lavaWeight: calculateLavaWeight(sc),
              }))
              .filter(sc => sc.lavaWeight > 0)
              .sort((a, b) => a.lavaWeight - b.lavaWeight)
              .map((sc) => {
                const totalLavaWeight = calculateTotalLavaWeights();
                const totalLavaWeightUnmodified = calculateTotalLavaWeights(false);
                const percentage = (sc.lavaWeight / totalLavaWeight) * 100;
                const originalPercentage = (sc.weight / totalLavaWeightUnmodified) * 100;
                const percentageDiff = percentage - originalPercentage;
                const showBox = percentageDiff !== 0;

                return (
                  <TableRow key={sc.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row" style={{ color: getColor(sc) }}>
                      {sc.name}
                    </TableCell>
                    <TableCell>{sc.lavaWeight.toFixed(0)}</TableCell>
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
              <TableRow sx={{backgroundColor: 'rgba(0, 204, 255, 0.1)', '&:last-child td, &:last-child th': { border: 0 }}}>
                  <TableCell component="th" scope="row" style={{ color: "white" }}>
                    <strong>Total</strong>
                  </TableCell>
                  <TableCell>
                    <strong>
                      {filteredCreatures
                      .map(sc => calculateLavaWeight(sc))
                      .reduce((acc, weight) => acc + weight, 0)
                      .toFixed(0)}
                    </strong>
                  </TableCell>
                  <TableCell>
                    <strong>
                      {(filteredCreatures
                        .map(sc => calculateLavaWeight(sc))
                        .reduce((acc, weight) => acc + weight, 0) / calculateTotalLavaWeights() * 100)
                        .toFixed(3)}%
                    </strong>
                  </TableCell>
              </TableRow>
          </TableBody>
          </Table>
        </TableContainer>
      </Box>
  );   
}

export default LavaTable;