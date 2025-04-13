import { Box, Button, Container, createTheme, CssBaseline, ThemeProvider, Typography } from "@mui/material"
import WaterTable from "./components/WaterTable";
import LavaTable from "./components/LavaTable";
import Options from "./components/Options";
import TableOptions from "./components/TableOptions";
import { JSX, useState } from "react";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App(): JSX.Element {
  const [fishingData, setFishingData] = useState({
    bait: '',
    location: '',
    hook: '',
    sinker: '',
    pet: '',
    eman: false,
    hotspot: false,
    chumcap: false,
    spooky: false,
    shark: false,
    squid: false,
    sharkArmor: false,
    spookyPerk: 0,
    icyHookPerk: 0,
    drakePiperPerk: 0,
    sharkPerk: 0,
  });
  const [selectedModifiers, setSelectedModifiers] = useState<string[]>([]);
  const [displayPercent, setDisplayPercent] = useState(true);

  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container sx={{ mt: 4 }}>
          <Typography
          variant="h3"
          sx={{
            pb: "20px",
            textTransform: "uppercase",
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
        >
          Fishing For Dummies
        </Typography>
        <Options fishingInfo={fishingData} setFishingInfo={setFishingData} />
        <hr style={{ margin: "20px 0", border: "1px solid rgba(255, 255, 255, 0.2)" }} />
        <TableOptions selectedModifiers={selectedModifiers} onChange={setSelectedModifiers}/>
        <hr style={{ margin: "20px 0", border: "1px solid rgba(255, 255, 255, 0.2)" }} />
        <Box sx={{ mt: 2, textAlign: 'left' }}>
          <Button variant="outlined" size="small" onClick={() => setDisplayPercent(!displayPercent)}>
            {displayPercent ? "%" : "1/x"}
          </Button>
        </Box>
        <WaterTable fishingInfo={fishingData} selectedModifiers={selectedModifiers} displayPercent={displayPercent} />
        <LavaTable fishingInfo={fishingData} selectedModifiers={selectedModifiers} displayPercent={displayPercent} />
      </Container>
    </ThemeProvider>
    </>
  )
}

export default App
