import { useContext, useState } from "react";
import { AuthContext } from '../contexts/authContext';

// Import Material-UI components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

const LoginPage = () => {
    const context = useContext(AuthContext);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        context.authenticate(userName, password);
        // In a real app without react-router-dom, you might manually
        // check isAuthenticated here after the async authenticate call
        // and then redirect, or handle it via a side effect.
        // For this example, assuming context.isAuthenticated updates
        // and triggers the redirect below.
    };

    // --- No useLocation or Navigate from react-router-dom ---
    // If authenticated, redirect by changing the window's location.
    // This will cause a full page reload.
    if (context.isAuthenticated === true) {
        // You'll need to decide where to redirect.
        // For simplicity, redirecting to the root path.
        // In a more complex app, you might pass a 'redirectPath' prop.
        window.location.href = "/";
        return null; // Return null to prevent rendering the login form
    }

    const handleSignUpClick = () => {
        window.location.href = "/signup"; // Redirect to the signup page
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                padding: 2,
            }}
        >
            <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: '100%' }}>
                <Typography variant="h4" component="h2" gutterBottom align="center">
                    Login Page
                </Typography>
                <Typography variant="body1" paragraph align="center">
                    You must log in to view the protected pages.
                </Typography>

                <Stack spacing={2} sx={{ mt: 3 }}>
                    <TextField
                        id="username"
                        label="User Name"
                        variant="outlined"
                        fullWidth
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={login}
                        sx={{ mt: 2 }}
                    >
                        Log In
                    </Button>
                </Stack>

                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    Not Registered?{' '}
                    {/* Replaced Link with a Button that changes window.location.href */}
                    <Button
                        variant="text"
                        size="small"
                        onClick={handleSignUpClick}
                        sx={{ textTransform: 'none' }} // Prevents all caps for "Sign Up!"
                    >
                        Sign Up!
                    </Button>
                </Typography>
            </Paper>
        </Box>
    );
};

export default LoginPage;