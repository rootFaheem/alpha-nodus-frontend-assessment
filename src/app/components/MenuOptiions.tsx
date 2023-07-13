import * as React from "react";
import { REMOVE_LOCATION } from "../GraphQL/Mutations";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import { FETCH_LOCATIONS, FETCH_LOCATIONS_DETAILS } from "../GraphQL/Queries";
import { TENANT } from "./LocationList";
import { LocationFullDetails } from "./LocationDetails";

interface Props {
  id: string;
  setSelectedLocation: React.Dispatch<React.SetStateAction<string>>;
  setLocData: React.Dispatch<
    React.SetStateAction<LocationFullDetails | undefined>
  >;
}

const MenuOptions: React.FC<Props> = ({
  id,
  setSelectedLocation,
  setLocData,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [locationRemove, { error }] = useMutation(REMOVE_LOCATION, {
    refetchQueries: [FETCH_LOCATIONS],
  });

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setAnchorEl(null);

    locationRemove({
      variables: {
        tenant: TENANT,
        locationRemoveId: id,
      },
    });

    if (!error) {
      setLocData(undefined);
      setSelectedLocation("");
    }
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MoreHorizIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleDelete}>
          <DeleteIcon sx={{ mr: 1 }} color="error" /> Delete
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default MenuOptions;
