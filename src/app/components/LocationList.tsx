import { Box, Button, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./LocationList.css";
import LoopIcon from "@mui/icons-material/Loop";
import { gql, useQuery } from "@apollo/client";
import SearchField from "./SearchField";
import LocationCard from "./LocationCard";
import { FETCH_LOCATIONS } from "../GraphQL/Queries";

interface Props {
  setSelectedLocation: React.Dispatch<React.SetStateAction<string>>;
}

export interface LocationsList {
  id: string;
  name: string;
  status: string;
  address: string;
  type: string;
  updatedAt: number;
}

const LocationList: React.FC<Props> = ({ setSelectedLocation }) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [locationList, setLocationList] = useState<LocationsList[]>();
  const [searchText, setSearchText] = useState<string>("");

  const { error, loading, data, fetchMore } = useQuery(FETCH_LOCATIONS, {
    variables: {
      tenant: "692627ef-fda8-4203-b108-e8e9f52ad410",
      page: page,
      limit: limit,
    },
  });

  useEffect(() => {
    fetchMore({
      variables: {
        page,
        limit,
      },
    });
  }, [page, limit]);

  useEffect(() => {
    if (data?.locationList?.resources?.[0]) {
      if (searchText) {
        setLocationList(
          data?.locationList?.resources?.filter((item: LocationsList) =>
            item?.name.includes(searchText)
          )
        );
      } else {
        setLocationList(data?.locationList?.resources);
      }
    }
  }, [data, searchText]);

  if (loading) return <span>Loading...</span>;

  if (error) return <p>Oops! {error?.message}</p>;

  return (
    <Grid item container xs={12} className="list_container">
      <Grid item container xs={12} alignItems="center">
        <Stack direction="row" alignItems="center" width="100%">
          <Button
            variant="outlined"
            fullWidth={true}
            size="small"
            className="refresh_btn"
          >
            <LoopIcon />
          </Button>
          <Box className="heading" onClick={() => setLimit(6)}>
            Locations
          </Box>
        </Stack>
      </Grid>
      <Grid item container xs={12} mt={2} mb={2}>
        <SearchField searchText={searchText} setSearchText={setSearchText} />
      </Grid>

      <Grid item container xs={12}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            maxWidth: "100%",
            overflowX: "scroll",
            pb: 2,
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7].map((item) => (
            <Button
              variant="outlined"
              size="small"
              sx={{
                minWidth: "80px",
              }}
            >
              Filter {item}
            </Button>
          ))}
        </Stack>
      </Grid>

      <Grid item container xs={12} mb={2}>
        {" "}
        {locationList &&
          locationList?.map((locData) => (
            <LocationCard
              locData={locData}
              setSelectedLocation={setSelectedLocation}
            />
          ))}
      </Grid>
      <Grid item container xs={12}>
        {" "}
        Pagination
      </Grid>
    </Grid>
  );
};

export default LocationList;
