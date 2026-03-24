import { Box, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import { JSX, useState } from "react";
import { FishingInfo, SeaCreature } from "../types/types";
import water from '../assets/scc-data/water-sc.json';

interface TableProps {
  fishingInfo: FishingInfo;
  selectedModifiers: string[];
}

function WaterTable({ fishingInfo, selectedModifiers }: TableProps): JSX.Element {
  const {
    bait, location, hook, sinker, pet,
    tracking, hotspot, chumcap, spooky, shark, squid, sharkArmor,
    spookyPerk, icyHookPerk, drakePiperPerk, sharkPerk
  } = fishingInfo;
  const [displayPercent, setDisplayPercent] = useState(true);

  const filteredCreatures = water.filter((sc: SeaCreature) =>
    selectedModifiers.length === 0 ||
    selectedModifiers.some(mod => sc.modifiers.includes(mod) || sc.name.includes(mod))
  );
  
  function calculateTotalWaterWeights(modifiers = true): number {
      let totalWaterWeight = 0;
      water.forEach(sc => {
        totalWaterWeight += calculateWaterWeight(sc, modifiers);
      });
      return totalWaterWeight;
  }

  function calculateWaterWeight(sc: SeaCreature, modify: boolean = true): number {
    const base = sc.weight;
    let weight = base;
    const modifiers = new Set(sc.modifiers);

    if (!isValidSpawn(sc, modifiers)) return 0;

    if (!modify) return weight;

    const add = (mult: number) => weight += base * mult;

    if (modifiers.has("Hotspot")) {
        if (bait === "Hotspot") add(.5);
        if (hook === "Hotspot") add(1);
        if (pet === "Hermit") add(.2);
    }

    if (modifiers.has("Spooky")) {
        add(spookyPerk * .02);
        if (hook === "Phantom") add(1);
        if (bait === "Spooky") add(.15);
        if (pet === "Bat") add(.25);
    }

    if (modifiers.has("Jerry")) {
        add(icyHookPerk * .02);
        if (sc.name === "Reindrake") add(drakePiperPerk * .02);
        if (bait === "Ice") add(.15);
        if (bait === "Frozen") add(.35);
        if (sinker === "Icy") add(2);
    }

    if (modifiers.has("Shark")) {
        add(sharkPerk * .02);
        if (bait === "Shark") add(.2);
        if (pet === "Megalodon") add(.2);
        if (sharkArmor) add(.25);
    }

    if (modifiers.has("Squid") && squid) add(1);

    if (modifiers.has("Common") && hook === "Common") add(.25);

    if (modifiers.has("Elusive")) add(tracking / 100);

    if (["Dark", "Light", "Whale"].includes(bait) && sc.weight < 400) {
        add(.25);
    }

    return weight;
  }

  function isValidSpawn(sc: SeaCreature, modifiers: Set<string>): boolean {
    if (bait === "Worm" && !sc.name.includes("Worm") &&
        (location === "Hollows" || location === "Goblin")) {
        return false;
    }

    const locationRequirements: Record<string, string> = {
        Oasis: "Oasis",
        Hollows: "Hollows",
        Goblin: "Goblin",
        Bayou: "Bayou",
        Jerry: "Jerry",
        Quarry: "Quarry",
        Galatea: "Galatea"
    };

    for (const [modifier, requiredLocation] of Object.entries(locationRequirements)) {
        if (modifiers.has(modifier) && location !== requiredLocation) {
            return false;
        }
    }

    if (modifiers.has("Night") && bait !== "Dark") return false;
    if (modifiers.has("Carrot") && bait !== "Carrot") return false;
    if (modifiers.has("Chumcap") && !chumcap) return false;
    if (modifiers.has("Hotspot") && !hotspot) return false;
    if (modifiers.has("Spooky") && !spooky) return false;
    if (modifiers.has("Shark") && !shark) return false;

    if (!modifiers.has("Jerry") && location === "Jerry") return false;
    if (!modifiers.has("Galatea") && location === "Galatea") return false;

    if (location === "Lava" || location === "Magma") return false;

    return true;
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
      <Box hidden={calculateTotalWaterWeights() == 0} sx={{ mt: 2, mb: 4, textAlign: 'left' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            variant="h4"
            sx={{
              pb: 1,
              background: "linear-gradient(90deg, rgba(0,162,255,1) 0%, rgba(0,102,204,1) 50%, rgba(0,162,255,1) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradient-animation 3s infinite",
              "@keyframes gradient-animation": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
              },
              backgroundSize: "200% 200%",
            }}
          >
            Water
          </Typography>
            <Button
            variant="outlined"
            size="large"
            sx={{
              mb: 1,
              fontSize: "1.2rem",
              textTransform: "uppercase",
              width: "100px",
              background: "linear-gradient(90deg, red, orange, yellow, green, cyan, blue, violet, red)", 
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% 100%",
              animation: "chromaWave 5s linear infinite",
              "@keyframes chromaWave": {
              "0%": { backgroundPosition: "100% 50%" },
              "100%": { backgroundPosition: "-100% 50%" },
              },
            }}
            onClick={() => setDisplayPercent(!displayPercent)}
            >
            {displayPercent ? "%" : "1/x"}
            </Button>
        </Box>
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
                        {displayPercent ? `${percentage.toFixed(3)}%` : `1 / ${(100 / percentage).toFixed(1)}`}
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
                      .map(sc => calculateWaterWeight(sc))
                      .reduce((acc, weight) => acc + weight, 0)
                      .toFixed(0)}
                    </strong>
                  </TableCell>
                    <TableCell>
                        <strong>
                        {displayPercent
                        ? `${filteredCreatures
                          .map(sc => (calculateWaterWeight(sc) / calculateTotalWaterWeights()) * 100)
                          .reduce((acc, percentage) => acc + percentage, 0)
                          .toFixed(3)}%`
                        : `1 / ${(100 / filteredCreatures
                          .map(sc => (calculateWaterWeight(sc) / calculateTotalWaterWeights()) * 100)
                          .reduce((acc, percentage) => acc + percentage, 0)).toFixed(1)}`}
                        </strong>
                    </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
  );
}

export default WaterTable;