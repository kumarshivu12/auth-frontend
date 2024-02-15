import { Stack, Typography, useTheme, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutUserAsync,
  selectAuthUser,
  selectErrors,
} from "../../auth/authSlice";
import { getCurrentUserAsync, selectUserInfo } from "../userslice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const error = useSelector(selectErrors);
  const userInfo = useSelector(selectUserInfo);
  const authUser = useSelector(selectAuthUser);
  console.log(authUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(getCurrentUserAsync());
  }, []);

  useEffect(() => {
    if (!authUser?.verified) {
      navigate("/");
    }
  }, [dispatch, authUser]);

  return (
    <>
      <Stack
        minWidth={{ xs: "100%", md: "40%" }}
        sx={{
          background: theme.palette.background.paper,
          borderRadius: "20px",
        }}
        p={3}
        spacing={3}
      >
        <Stack textAlign={"center"}>
          <Typography variant="h3" fontFamily={"Playfair Display"}>
            Talkie !
          </Typography>
        </Stack>
        <Stack>
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              console.log(data);
            })}
          >
            <Stack spacing={3}>
              <Stack direction={"row"} alignItems={"center"} spacing={2}>
                <Typography variant="subtitle2">Username:</Typography>
                <TextField
                  type="text"
                  name="username"
                  variant="standard"
                  disabled={!edit}
                  placeholder="username..."
                  value={userInfo.username}
                  autoFocus
                  {...register("username", {
                    required: "username is required",
                  })}
                  fullWidth
                />
              </Stack>
              <Stack direction={"row"} alignItems={"center"} spacing={2}>
                <Typography variant="subtitle2">Name:</Typography>
                <TextField
                  type="text"
                  variant="standard"
                  disabled={!edit}
                  placeholder="fullame..."
                  value={userInfo.fullName}
                  {...register("fullName", {
                    required: "fullname is required",
                  })}
                  fullWidth
                />
              </Stack>
              <Stack direction={"row"} alignItems={"center"} spacing={2}>
                <Typography variant="subtitle2">Email:</Typography>
                <TextField
                  type="email"
                  variant="standard"
                  disabled={true}
                  placeholder="email..."
                  value={userInfo.email}
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: "email not valid",
                    },
                  })}
                  fullWidth
                />
              </Stack>
              <Stack>
                {error && (
                  <Typography
                    variant="caption"
                    color="error.main"
                    textAlign={"center"}
                    gutterBottom
                  >
                    {error}
                  </Typography>
                )}
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  spacing={2}
                >
                  <Button
                    variant="outlined"
                    color={edit ? "info" : "error"}
                    type="submit"
                    sx={{ borderRadius: "10px", padding: "10px 25px" }}
                    onClick={() => {
                      setEdit((prev) => !prev);
                    }}
                  >
                    {edit ? "Save" : "Edit"}
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ borderRadius: "10px", padding: "10px 25px" }}
                    onClick={() => {
                      navigate("/auth/login");
                      dispatch(logoutUserAsync());
                    }}
                  >
                    Logout
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Stack>
    </>
  );
};

export default Profile;
