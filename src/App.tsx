import { Box, Container, createTheme, CssBaseline, Divider, ThemeProvider } from "@mui/material"
import Header from "./components/Header";
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

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container 
        maxWidth={false}
        sx={{ mt: 4, mb: 4, display: 'flex', gap: 4, px: 2, width: '100%' }}
      >
        <Box sx={{ flex: 1, maxWidth: 500, minWidth: 300 }}>
          <Header />
          <Options fishingInfo={fishingData} setFishingInfo={setFishingData} />
          <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
          <TableOptions selectedModifiers={selectedModifiers} onChange={setSelectedModifiers} />
        </Box>
        <Box sx={{ flex: 2, minWidth: 200}}>
          <WaterTable fishingInfo={fishingData} selectedModifiers={selectedModifiers} />
          <Box sx={{ mt: 3 }} />
          <LavaTable fishingInfo={fishingData} selectedModifiers={selectedModifiers} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App
