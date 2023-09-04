import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
 apiKey: "AIzaSyCpR5-dE6XVS1yHOUWCT_QVT2iB3YR3SbM",
  authDomain: "react-otp-574fd.firebaseapp.com",
  projectId: "react-otp-574fd",
  storageBucket: "react-otp-574fd.appspot.com",
  messagingSenderId: "476673683001",
  appId: "1:476673683001:web:520445d1de5f6f98d867e8",
  measurementId: "G-HG0011KTNF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
