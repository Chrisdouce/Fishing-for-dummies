import { Fab, FormLabel, Grid, Grid2 } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { JSX } from "react";

function Filter(): JSX.Element {
    return <> 
        <FormLabel><strong>Filters:</strong></FormLabel>
        <Grid2 container spacing={2}>
            <Fab size="small" color="secondary" aria-label="add">
                <AddIcon />
            </Fab>
        </Grid2>
        
    </>
}

export default Filter;