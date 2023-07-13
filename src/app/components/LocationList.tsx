import { useQuery } from "@apollo/client";
import AddIcon from "@mui/icons-material/Add";
import LoopIcon from "@mui/icons-material/Loop";
import { Box, Button, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FETCH_LOCATIONS } from "../GraphQL/Queries";
import LocationCard from "./LocationCard";
import Pagination from "@mui/material/Pagination";

import "./locationList.css";
import SearchField from "./SearchField";
import FormDialog from "./FormDialog";

export const TENANT = "692627ef-fda8-4203-b108-e8e9f52ad410";

interface Props {
  selectedLocation: string;
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

const LocationList: React.FC<Props> = ({
  selectedLocation,
  setSelectedLocation,
}) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [pageCount, setPageCount] = useState<number>(5);
  const [locationList, setLocationList] = useState<LocationsList[]>();
  const [searchText, setSearchText] = useState<string>("");
  const [refetch, setRefetch] = useState<boolean>(false);
  const [orderBy, setOrderBy] = useState<string>("desc");
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { error, loading, data, fetchMore } = useQuery(FETCH_LOCATIONS, {
    variables: {
      tenant: TENANT,
      page: page,
      limit: limit,
      search: searchText,
      order: orderBy,
    },
  });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  useEffect(() => {
    if (data?.locationList?.resources?.[0]) {
      setLocationList(data?.locationList?.resources);
      setPageCount(data?.locationList?.pages);
    }
  }, [data?.locationList, searchText]);

  useEffect(() => {
    fetchMore({
      variables: {
        page,
        limit,
        search: searchText,
        order: orderBy,
      },
    });
  }, [page, limit, searchText, orderBy]);

  useEffect(() => {
    if (refetch) {
      fetchMore({
        variables: {
          page,
          limit,
          search: searchText,
          order: orderBy,
        },
      });
    }
  }, [refetch]);

  // if (loading) return <span>Loading...</span>;

  if (error) return <p>Oops! {error?.message}</p>;

  return (
    <Grid
      item
      container
      xs={12}
      className="list_container"
      alignItems="flex-start"
    >
      <Grid item container xs={12} alignItems="flex-start">
        <Stack direction="row" alignItems="center" width="100%">
          <Button
            variant="outlined"
            fullWidth={true}
            size="small"
            className="refresh_btn"
            onClick={() => {
              setRefetch(true);
              setTimeout(() => setRefetch(false), 1000);
            }}
          >
            <LoopIcon />
          </Button>
          <Box className="heading">Locations</Box>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setOpenDialog(true)}
          >
            <AddIcon />
          </Button>
        </Stack>
      </Grid>
      <Grid item container xs={12} mt={2} mb={2}>
        <SearchField searchText={searchText} setSearchText={setSearchText} />
      </Grid>

      <Grid item container xs={12} alignItems="flex-start">
        <Stack
          direction="row"
          spacing={2}
          sx={{
            maxWidth: "100%",
            overflowX: "scroll",
            pb: 2,
          }}
        >
          <Button
            variant="outlined"
            size="small"
            sx={{
              minWidth: "80px",
            }}
            onClick={() => setOrderBy("asc")}
          >
            ORDER: ASC
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{
              minWidth: "80px",
            }}
            onClick={() => setOrderBy("desc")}
          >
            ORDER: DESC
          </Button>
        </Stack>
      </Grid>

      <Grid
        item
        container
        xs={12}
        mb={2}
        sx={{
          minHeight: "50vh",
        }}
      >
        {loading ? (
          <Box pt={4} textAlign="center" width="100%">
            Loading...
          </Box>
        ) : (
          locationList &&
          locationList?.map((locData) => (
            <LocationCard
              locData={locData}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          ))
        )}
      </Grid>
      <Grid item container xs={12}>
        <Pagination
          count={pageCount}
          page={page + 1}
          onChange={handleChange}
          variant="outlined"
          color="primary"
        />
      </Grid>
      {openDialog ? (
        <FormDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
      ) : null}
    </Grid>
  );
};

export default LocationList;
