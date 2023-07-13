import * as Yup from "yup";
import * as React from "react";
import TextField from "@mui/material/TextField";
import { Form, FormikProvider, useFormik } from "formik";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { useMutation } from "@apollo/client";
import { ADD_NEW_LOCATION } from "../GraphQL/Mutations";
import { TENANT } from "./LocationList";
import { FETCH_LOCATIONS } from "../GraphQL/Queries";

// const CustomDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiDialogContent-root": {
//     padding: theme.spacing(2),
//   },
//   "& .MuiDialogActions-root": {
//     padding: theme.spacing(1),
//   },
// }));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function CustomDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

interface Props {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().trim().min(1).required("Name is required"),
  status: Yup.string().trim().min(1).required("Status is required"),
  address: Yup.string().trim().min(1).required("Address is required"),
  type: Yup.string().trim().min(1).required("Type is required"),
  tag: Yup.string().trim().min(1).required("Tag is required"),
  taxId: Yup.string().trim().min(1).required("Tax ID  is required"),
  npi: Yup.string().trim().min(1).required("NPI is required"),
  partOf: Yup.string().trim().min(1).required("Part Of is required"),
  description: Yup.string().trim().min(1).required("Description is required"),
  managingOrganization: Yup.string()
    .trim()
    .min(1)
    .required("Managing Organization is required"),
  alias: Yup.string().trim().min(1).required("Alias is required"),
  updatedAt: Yup.string().trim().min(1).required("updated At is required"),
});

const FormDialog: React.FC<Props> = ({ openDialog, setOpenDialog }) => {
  const [locationCreate, { error }] = useMutation(ADD_NEW_LOCATION, {
    refetchQueries: [FETCH_LOCATIONS],
  });

  const handleClose = () => {
    setOpenDialog(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      status: "",
      address: "",
      type: "",
      tag: "",
      taxId: "",
      npi: "",
      partOf: "",
      description: "",
      managingOrganization: "",
      alias: "",
      updatedAt: new Date().getTime(),
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        try {
          locationCreate({
            variables: {
              tenant: TENANT,
              requestBody: {
                ...values,
              },
            },
          });
          if (error) {
            return alert(error.message);
          }
          resetForm();
          handleClose();
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const {
    errors,
    touched,
    handleBlur,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue,
  } = formik;

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
      >
        <FormikProvider value={formik}>
          <Form
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit}
            //   className={classes.formContainer}
          >
            <CustomDialogTitle
              id="customized-dialog-title"
              onClose={handleClose}
            >
              Add new Location
            </CustomDialogTitle>
            <DialogContent dividers>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 2, width: "45%" },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    size="small"
                    fullWidth
                    label="Name"
                    {...getFieldProps("name")}
                    error={Boolean(touched?.name && errors?.name)}
                    helperText={touched.name && errors.name}
                    variant="outlined"
                  />
                  <TextField
                    size="small"
                    fullWidth
                    label="Status"
                    {...getFieldProps("status")}
                    error={Boolean(touched?.status && errors?.status)}
                    helperText={touched.status && errors.status}
                    variant="outlined"
                  />
                </div>
                <div>
                  <TextField
                    size="small"
                    fullWidth
                    label="Address"
                    {...getFieldProps("address")}
                    error={Boolean(touched?.address && errors?.address)}
                    helperText={touched.address && errors.address}
                    variant="outlined"
                  />
                  <TextField
                    size="small"
                    fullWidth
                    label="Type"
                    {...getFieldProps("type")}
                    error={Boolean(touched?.type && errors?.type)}
                    helperText={touched.type && errors.type}
                    variant="outlined"
                  />
                </div>
                <div>
                  <TextField
                    size="small"
                    fullWidth
                    label="Tag"
                    {...getFieldProps("tag")}
                    error={Boolean(touched?.tag && errors?.tag)}
                    helperText={touched.tag && errors.tag}
                    variant="outlined"
                  />
                  <TextField
                    size="small"
                    fullWidth
                    label="Tax ID"
                    {...getFieldProps("taxId")}
                    error={Boolean(touched?.taxId && errors?.taxId)}
                    helperText={touched.taxId && errors.taxId}
                    variant="outlined"
                  />
                </div>
                <div>
                  <TextField
                    size="small"
                    fullWidth
                    label="NPI"
                    {...getFieldProps("npi")}
                    error={Boolean(touched?.npi && errors?.npi)}
                    helperText={touched.npi && errors.npi}
                    variant="outlined"
                  />
                  <TextField
                    size="small"
                    fullWidth
                    label="Part Of"
                    {...getFieldProps("partOf")}
                    error={Boolean(touched?.partOf && errors?.partOf)}
                    helperText={touched.partOf && errors.partOf}
                    variant="outlined"
                  />
                </div>
                <div>
                  <TextField
                    size="small"
                    fullWidth
                    label="Description"
                    {...getFieldProps("description")}
                    error={Boolean(touched?.description && errors?.description)}
                    helperText={touched.description && errors.description}
                    variant="outlined"
                  />
                  <TextField
                    size="small"
                    fullWidth
                    label="Managing Organization"
                    {...getFieldProps("managingOrganization")}
                    error={Boolean(
                      touched?.managingOrganization &&
                        errors?.managingOrganization
                    )}
                    helperText={
                      touched.managingOrganization &&
                      errors.managingOrganization
                    }
                    variant="outlined"
                  />
                </div>
                <div>
                  <TextField
                    size="small"
                    fullWidth
                    label="Alias"
                    {...getFieldProps("alias")}
                    error={Boolean(touched?.alias && errors?.alias)}
                    helperText={touched.alias && errors.alias}
                    variant="outlined"
                  />
                  <TextField
                    size="small"
                    fullWidth
                    label="Updated At"
                    {...getFieldProps("updatedAt")}
                    error={Boolean(touched?.updatedAt && errors?.updatedAt)}
                    helperText={touched.updatedAt && errors.updatedAt}
                    variant="outlined"
                  />
                </div>
                <div>
                  {/* <TextField
                    size="small"
                    fullWidth
                    label="updatedAt"
                    {...getFieldProps("updatedAt")}
                    error={Boolean(touched?.updatedAt && errors?.updatedAt)}
                    helperText={touched.updatedAt && errors.updatedAt}
                    variant="outlined"
                  /> */}
                  {/* <TextField
                    size="small"
                    fullWidth
                    label="Status"
                    {...getFieldProps("status")}
                    error={Boolean(touched?.status && errors?.status)}
                    helperText={touched.status && errors.status}
                    variant="outlined"
                  /> */}
                </div>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </Form>
        </FormikProvider>
      </Dialog>
    </div>
  );
};

export default FormDialog;
