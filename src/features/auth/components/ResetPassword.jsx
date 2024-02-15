import {
  Button,
  IconButton,
  InputBase,
  Stack,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { Eye, EyeClosed } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPasswordAsync, selectAuthUser, selectErrors } from "../authSlice";

//styled components
const StyledInput = styled(InputBase)`
  border: 1px solid ${(props) => props.theme.palette.border.input || "black"};
  border-radius: 10px;
  padding: 5px 10px;
`;

const ResetPassword = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const authUser = useSelector(selectAuthUser);
  const error = useSelector(selectErrors);

  useEffect(() => {
    if (authUser?.verified) {
      navigate("/");
    }
  }, [dispatch, authUser]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
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
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          dispatch(
            resetPasswordAsync({
              ...data,
              resetToken: searchParams.get("token"),
            })
          );
        })}
      >
        <Stack spacing={3}>
          <Stack>
            <Typography variant="subtitle2">New Password:</Typography>

            <StyledInput
              type={show ? "text" : "password"}
              placeholder="Password..."
              autoFocus
              endAdornment={
                <IconButton onClick={() => setShow(!show)}>
                  {show ? <Eye size={18} /> : <EyeClosed size={18} />}
                </IconButton>
              }
              {...register("password", {
                required: "password is required",
              })}
            />
            {errors.password && (
              <Typography variant="caption" color="error.main">
                {errors.password.message}
              </Typography>
            )}
          </Stack>
          <Stack>
            <Typography variant="subtitle2">Confirm Password:</Typography>
            <StyledInput
              type="password"
              placeholder="Confirm Password..."
              {...register("confirmPassword", {
                required: "confirm password is required",
                validate: (value, formValues) =>
                  value === formValues.password || "password not matching",
              })}
            />
            {errors.confirmPassword && (
              <Typography variant="caption" color="error.main">
                {errors.confirmPassword.message}
              </Typography>
            )}
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
            <Button
              variant="contained"
              color="info"
              type="submit"
              sx={{ borderRadius: "10px", padding: "15px 10px" }}
            >
              Reset Password
            </Button>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};

export default ResetPassword;
