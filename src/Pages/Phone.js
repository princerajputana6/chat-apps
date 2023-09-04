import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useUserAuth } from "../context/UserAuthContext";
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme();

const Phone = () => {
    const [error, setError] = useState("");
    const [number, setNumber] = useState("");
    const [flag, setFlag] = useState(false);
    const [otp, setOtp] = useState("");
    const [result, setResult] = useState("");
    const { setUpRecaptha } = useUserAuth();
    const navigate = useNavigate();

    const getOtp = async (e) => {
        e.preventDefault();
        console.log(number);
        setError("");
        if (number === "" || number === undefined)
            return setError("Please enter a valid phone number!");
        try {
            const response = await setUpRecaptha(number);
            setResult(response);
            setFlag(true);
        } catch (err) {
            setError(err.message);
        }
    };

    const verifyOtp = async (e) => {
        e.preventDefault();
        setError("");
        if (otp === "" || otp === null) return;
        try {
            await result.confirm(otp);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <div className="p-4 box">
                {error && <TextField variant="danger">{error}</TextField>}
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        {error && <TextField variant="danger">{error}</TextField>}
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in With Mobile Number
                            </Typography>
                            <Box component="form" noValidate onSubmit={getOtp} sx={{ mt: 3, display: !flag ? "block" : "none" }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <PhoneInput
                                            defaultCountry="IN"
                                            value={number}
                                            onChange={setNumber}
                                            placeholder="Enter Phone Number"
                                        />
                                        <Grid id="recaptcha-container"></Grid>
                                    </Grid>
                                    <Grid container sx={{ display: "flex", margin: "0px 20px", justifyContent: "space-between" }} >
                                        <Link href="/">

                                            Cancel

                                        </Link>

                                        <Button
                                            type="submit"
                                            variant="outlined"
                                        >
                                            Send Otp
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box component="form" noValidate onSubmit={verifyOtp} sx={{ mt: 3, display: flag ? "block" : "none" }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sx={{ marginBottom: "20px" }}>
                                        <TextField
                                            label="Enter your OTP"
                                            variant="filled"
                                            onChange={(e) => setOtp(e.target.value)}
                                            type="number"
                                            sx={{ width: "100%" }}
                                        />
                                    </Grid>
                                    <Grid container sx={{ display: "flex", margin: "px 20px", justifyContent: "space-between" }} >
                                        <Link href="/">

                                            Cancel

                                        </Link>

                                        <Button
                                            type="submit"
                                            variant="outlined"
                                        >
                                            Confirm Otp
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>

            </div>
        </>
    );
};

export default Phone;
