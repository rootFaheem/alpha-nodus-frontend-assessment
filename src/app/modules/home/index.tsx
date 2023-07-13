import { Grid } from "@mui/material";
import { lazy, useState } from "react";
import "./index.css";

const LocationDetails = lazy(() => import("../../components/LocationDetails"));
const LocationList = lazy(() => import("../../components/LocationList"));

function App() {
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  return (
    <div>
      <Grid container columnSpacing={3}>
        <Grid item container xs={4} alignItems="flex-start">
          <LocationList
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
        </Grid>
        <Grid item container xs={8}>
          <LocationDetails
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
