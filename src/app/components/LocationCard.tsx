import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";
import { LocationsList } from "./LocationList";

interface Props {
  locData: LocationsList;
  selectedLocation: string;
  setSelectedLocation: React.Dispatch<React.SetStateAction<string>>;
}

const LocationCard: React.FC<Props> = ({
  locData,
  selectedLocation,
  setSelectedLocation,
}) => {
  return (
    <Card
      sx={{
        minHeight: "130px",
        maxHeight: "130px",
        minWidth: "100%",
        mb: 2,
        background:
          selectedLocation === locData?.id
            ? "rgba(255, 255, 255, 0.5)"
            : "auto",
        border:
          selectedLocation === locData?.id ? "1.8px solid #556CD6" : "auto",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        transition: "0.2s",

        "&:hover": {
          cursor: "pointer",
          boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
        },
      }}
      onClick={() => setSelectedLocation(locData?.id)}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6" component="div">
            {locData?.name}
          </Typography>

          <Typography variant="body2" component="div" className="status">
            {locData?.status ?? "NA"}
          </Typography>
        </Stack>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {locData?.address}
        </Typography>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" spacing={3} alignItems="center">
            <Stack direction="row" spacing={0.5}>
              <CalendarMonthIcon fontSize="small" />
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {`${new Date(locData?.updatedAt).toLocaleString("en-US", {
                  month: "short",
                })}-${new Date(locData?.updatedAt).toLocaleString("en-US", {
                  day: "2-digit",
                })}`}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5}>
              <AccessTimeIcon fontSize="small" />

              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {`${new Date(locData?.updatedAt).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                })}`}
              </Typography>
            </Stack>
          </Stack>
          <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
            {Math.abs(
              (new Date().valueOf() - new Date(locData?.updatedAt).valueOf()) /
                36e5
            ).toFixed(0)}
            H
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default LocationCard;
