import LoopIcon from "@mui/icons-material/Loop";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FETCH_LOCATIONS_DETAILS } from "../GraphQL/Queries";
import InputField from "./InputField";
import { TENANT } from "./LocationList";
import MenuOptions from "./MenuOptiions";

interface Props {
  selectedLocation: string;
  setSelectedLocation: React.Dispatch<React.SetStateAction<string>>;
}

export interface LocationFullDetails {
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

const LocationDetails: React.FC<Props> = ({
  selectedLocation,
  setSelectedLocation,
}) => {
  const [locData, setLocData] = useState<LocationFullDetails>();

  const [getDetails, { error, loading, data, refetch }] = useLazyQuery(
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

  if (loading) return <Box p={5}>Loading...</Box>;

  if (error) return <Box p={5}>Oops! {error?.message}</Box>;

  if ((!data && !loading) || !locData)
    return (
      <Box p={5}>
        Please select a card from left panel to see the details...
      </Box>
    );

  const viewProps = [
    {
      label: "Name",
      value: locData?.name ?? "",
      name: "name",
    },
    {
      label: "Updated At",
      value: locData?.updatedAt
        ? new Date(locData?.updatedAt.valueOf())?.toLocaleString()
        : "NA",
      name: "updatedAt",
    },
    {
      label: "ID",
      value: locData?.id ?? "",
      name: "id",
    },
    {
      label: "Tenant",
      value: locData?.tenant ?? "",
      name: "tenant",
    },
    {
      label: "Status",
      value: locData?.status ?? "",
      name: "status",
    },
    {
      label: "Address",
      value: locData?.address ?? "",
      name: "address",
    },
    {
      label: "Type",
      value: locData?.type ?? "",
      name: "type",
    },
    {
      label: "Tag",
      value: locData?.tag ?? "",
      name: "tag",
    },
    {
      label: "Tax ID",
      value: locData?.taxId ?? "",
      name: "taxId",
    },
    {
      label: "NPI",
      value: locData?.npi ?? "",
      name: "npi",
    },
    {
      label: "Part Of",
      value: locData?.partOf ?? "",
      name: "partOf",
    },
    {
      label: "Description",
      value: locData?.description ?? "",
      name: "description",
    },
    {
      label: "Alias",
      value: locData?.alias ?? "",
      name: "alias",
    },
  ];

  return (
    <Grid item container xs={12} alignItems="flex-start" pt={3} pb={3}>
      <Grid item container xs={12}>
        <Card sx={{ width: "calc(100% - 20px)" }}>
          <CardContent>
            <Box mb={2}>
              <Stack direction="row" justifyContent="space-between">
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    refetch();
                  }}
                >
                  <LoopIcon />
                </Button>
                <Typography variant="h5">
                  {locData?.name}'s Full Details
                </Typography>
                <MenuOptions
                  id={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                  setLocData={setLocData}
                />
              </Stack>
            </Box>
            <hr />
            {viewProps?.map((item, index) => (
              <Grid item container xs={12} key={`some-random-key-${index}`}>
                <InputField
                  label={item?.label}
                  value={item?.value}
                  name={item?.name}
                  ID={selectedLocation}
                />
              </Grid>
            ))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default LocationDetails;
