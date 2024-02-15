import {
  Button,
  InputBase,
  Stack,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  forgotPasswordAsync,
  selectAuthUser,
  selectErrors,
} from "../authSlice";
import { toast } from "react-toastify";

//styled components
const StyledInput = styled(InputBase)`
  border: 1px solid ${(props) => props.theme.palette.border.input || "black"};
  border-radius: 10px;
  padding: 5px 10px;
`;

const ForgotPassword = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector(selectAuthUser);
  const error = useSelector(selectErrors);

  useEffect(() => {
    if (authUser.verified) {
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
          dispatch(forgotPasswordAsync(data));
          toast.success("reset link sent on email");
          navigate("/auth/login");
        })}
      >
        <Stack spacing={3}>
          <Stack>
            <Typography variant="subtitle2">Email:</Typography>
            <StyledInput
              type="email"
              placeholder="Email..."
              autoFocus
              {...register("email", {
                required: "email is required",
                pattern: {
                  value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                  message: "email not valid",
                },
              })}
            />
            {errors.email && (
              <Typography variant="caption" color="error.main">
                {errors.email.message}
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
              color="error"
              type="submit"
              sx={{ borderRadius: "10px", padding: "15px 10px" }}
            >
              Send Reset Link
            </Button>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};

export default ForgotPassword;
