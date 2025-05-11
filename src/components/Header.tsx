import { Typography } from "@mui/material";

function Header() {
  return (
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
  );
}

export default Header;