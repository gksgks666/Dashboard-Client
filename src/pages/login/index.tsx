import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import Button from "@/components/Button/Button";
import { useUserLogin } from "@/hooks";
import { LoginProps as FormInput } from "@/types/API";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [rememberMe, setRememberMe] = useState<boolean | undefined>(
    localStorage.getItem("rememberMe") ? true : false,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
    if (!rememberMe) {
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberMe");
    }
  };
  const { mutate: login } = useUserLogin();
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    login(data);
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box width="400px" color={theme.palette.secondary.main}>
        <Typography variant="h4" component="h1" gutterBottom>
          Log In
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            id="email"
            label="Email"
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
          />
          <TextField
            fullWidth
            id="password"
            label="Password"
            type="password"
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
          />
          <FormControlLabel
            control={
              <Checkbox checked={rememberMe} onChange={handleRememberMe} />
            }
            label="Remember me"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Log in
          </Button>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button component="b" sx={{ color: "black" }}>
              Forgot password
            </Button>
            <Button
              component="a"
              sx={{ color: "black" }}
              onClick={() => navigate("/register")}
            >
              Register now!
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
