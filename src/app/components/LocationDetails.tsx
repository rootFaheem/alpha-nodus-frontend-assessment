import { Box, Grid } from "@mui/material";
import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FETCH_LOCATIONS_DETAILS } from "../GraphQL/Queries";
import { TENANT } from "./LocationList";

interface Props {
  selectedLocation: string;
}

interface LocationFullDetails {
  id: string;
  tenant: string;
  name: string;
  status: string;
  address: string;
  type: string;
  tag: string;
  taxId: string;
  npi: string;
  partOf: string;
  description: string;
  managingOrganization: string;
  alias: string;
  updatedAt: number;
  //   telecom: unknown[];
}

const LocationDetails: React.FC<Props> = ({ selectedLocation }) => {
  const [locData, setLocData] = useState<LocationFullDetails>();

  const [getDetails, { error, loading, data, fetchMore }] = useLazyQuery(
    FETCH_LOCATIONS_DETAILS
  );

  useEffect(() => {
    if (selectedLocation) {
      getDetails({
        variables: { tenant: TENANT, locationReadId: selectedLocation },
      });
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (data?.locationRead?.resource) {
      setLocData(data?.locationRead?.resource);
    }
  }, [data]);

  if (loading) return <span>Loading...</span>;

  if (error) return <p>Oops! {error?.message}</p>;
  console.log("locData :>> ", locData);
  return (
    <Grid item container xs={12} alignItems="flex-start" pt={5} pb={5}>
      <Grid item container xs={12}>
        <Grid item container xs={12}>
          <Box>Name: {locData?.name ?? "NA"}</Box>
        </Grid>
        <Grid item container xs={6}>
          <Box>ID: {locData?.id ?? "NA"}</Box>
        </Grid>

        <Grid item container xs={6}>
          <Box>Tenant: {locData?.tenant ?? "NA"}</Box>
        </Grid>

        <Grid item container xs={6}>
          <Box>Status: {locData?.status ?? "NA"}</Box>
        </Grid>

        <Grid item container xs={6}>
          <Box>Address: {locData?.address ?? "NA"}</Box>
        </Grid>

        <Grid item container xs={6}>
          <Box>Type :{locData?.type ?? "NA"}</Box>
        </Grid>

        <Grid item container xs={6}>
          <Box>Tag: {locData?.tag ?? "NA"}</Box>
        </Grid>

        <Grid item container xs={6}>
          <Box>TaxId: {locData?.taxId ?? "NA"}</Box>
        </Grid>

        <Grid item container xs={6}>
          <Box>NPI: {locData?.npi ?? "NA"}</Box>
        </Grid>
        <Grid item container xs={6}>
          <Box>Part of: {locData?.partOf ?? "NA"}</Box>
        </Grid>
        <Grid item container xs={6}>
          <Box>Description: {locData?.description ?? "NA"}</Box>
        </Grid>
        <Grid item container xs={6}>
          <Box>
            Managing Organization: {locData?.managingOrganization ?? "NA"}
          </Box>
        </Grid>
        <Grid item container xs={6}>
          <Box>Alias: {locData?.alias ?? "NA"}</Box>
        </Grid>
        <Grid item container xs={6}>
          <Box>
            Updated At:{" "}
            {locData?.updatedAt
              ? new Date(locData?.updatedAt.valueOf())?.toLocaleString()
              : "NA"}
          </Box>
        </Grid>
        {/* <Grid item container xs={6}>
          <Box>
            {locData?.telecom &&
              locData?.telecom?.map((item: unknown) => <div>{item}</div>)}
          </Box>
        </Grid> */}
      </Grid>
    </Grid>
  );
};

export default LocationDetails;
