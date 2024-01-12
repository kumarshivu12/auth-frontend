import {
  Button,
  InputBase,
  Stack,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

//styled components
const StyledInput = styled(InputBase)`
  border: 1px solid ${(props) => props.theme.palette.border.input || "black"};
  border-radius: 10px;
  padding: 5px 10px;
`;

const ForgotPassword = () => {
  const theme = useTheme();

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
          console.log(data);
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
