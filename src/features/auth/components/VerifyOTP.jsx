import { Button, InputBase, Stack, Typography, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { selectAuthUser, selectErrors, verifyOTPasync } from "../authSlice";

const VerifyOTP = () => {
  const length = 6;
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputs, setInputs] = useState(Array(length).fill(""));
  const inputRefs = Array.from({ length }, () => useRef());
  const authUser = useSelector(selectAuthUser);
  const error = useSelector(selectErrors);

  const toggleFocus = (idx) => {
    inputRefs[idx].current.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const clipboardData = e.clipboardData;
    const pastedData = clipboardData.getData("Text");
    if (/^\d+$/.test(pastedData) && pastedData.length <= length) {
      const newInputs = [...inputs];
      for (let i = 0; i < Math.min(length, pastedData.length); i++) {
        newInputs[i] = pastedData[i];
      }
      setInputs(newInputs);

      inputRefs[
        Math.min(pastedData.length, inputRefs.length - 1)
      ].current.focus();
    }
  };

  const handleInputChange = (idx, value) => {
    setInputs(inputs.map((prevValue, i) => (i === idx ? value : prevValue)));
  };

  const handleKeyDown = (idx, key) => {
    if (key === "Backspace") {
      if (idx > 0 && inputs[idx] === "") {
        handleInputChange(idx - 1, "");
        toggleFocus(idx - 1);
      } else if (inputs[idx]) {
        handleInputChange(idx, "");
      }
    } else if (key >= "0" && key <= "9") {
      if (inputs[idx] === "") {
        handleInputChange(idx, key);
        if (idx < inputRefs.length - 1) {
          toggleFocus(idx + 1);
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let otp = "";
    inputs.forEach((el) => (otp += el));
    setInputs(inputs.map((el, idx) => ""));
    inputRefs[0].current.focus();
    dispatch(verifyOTPasync({ email: searchParams.get("email"), otp }));
  };

  useEffect(() => {
    inputRefs[0].current.focus();
  }, []);

  useEffect(() => {
    if (authUser?.verified) {
      navigate("/");
    }
  }, [dispatch, authUser]);

  return (
    <Stack
      maxWidth={{ xs: "100%", md: "40%" }}
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
      <form noValidate onSubmit={(e) => handleSubmit(e)}>
        <Stack spacing={3}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {inputs.map((_, idx) => (
              <InputBase
                key={idx}
                size="small"
                inputRef={inputRefs[idx]}
                inputMode="numeric"
                placeholder="-"
                inputProps={{
                  maxLength: 1,
                  pattern: "[0-9]*",
                  style: {
                    textAlign: "center",
                    appearance: "text",
                  },
                }}
                sx={{
                  backgroundColor: theme.palette.background.neutral,
                  width: "15%",
                  aspectRatio: 1,
                  borderRadius: "10px",
                  fontSize: "20px",
                }}
                value={inputs[idx]}
                onKeyDown={(e) => handleKeyDown(idx, e.key)}
                onPaste={(e) => handlePaste(e)}
              />
            ))}
          </Stack>
          <Stack alignSelf={"flex-end"}>
            <Button variant="text">resend otp</Button>
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
              Verify OTP
            </Button>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};

export default VerifyOTP;
