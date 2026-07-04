import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const shivanandData = {
    fullName: "Shivanand Shukla",
    email: "shivanand2124@gmail.com",
    phone: "8795503507",
    aboutMe: "I am a passionate Computer Science Engineering student at KIET Group of Institutions with a strong foundation in full-stack web development.\n\nI specialize in the MERN Stack and have hands-on experience building real-world applications including a healthcare AI system for dental disease detection using machine learning.\n\nI am proficient in Java, Python, JavaScript, and frameworks like Django. I also have experience with DevOps tools like Docker, Jenkins, and Linux environments.\n\nI hold certifications from AWS, Cisco, Oracle, and Palo Alto Networks, and I am actively expanding my expertise in cloud technologies and machine learning.",
    avatar: { url: "/ME2.png" },
    resume: "",
    githubURL: "https://github.com/",
    linkedInURL: "https://linkedin.com/in/",
    twitterURL: "",
    instagramURL: "",
    facebookURL: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState:{
        loading: false,
        user: shivanandData,
        error: null,
    },
    reducers:{
        loadUserRequest(state){
            state.loading = true;
        },
        loadUserSuccess(state, action){
            state.loading = false;
            state.user = action.payload;
        },
        loadUserFailed(state, action){
            state.loading = false;
            state.error = action.payload;
            // Don't wipe out real data with the hardcoded fallback.
            // Only use the fallback if we never loaded real data before.
            if (!state.user || state.user === shivanandData) {
                state.user = shivanandData;
            }
        },
        clearAllErrors(state) {
            state.error = null;
        },
    }
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getUser = ()=> async (dispatch)=>{
    dispatch(userSlice.actions.loadUserRequest());

    const maxAttempts = 3;
    // Render free-tier backends can take 30-50s to wake up from sleep,
    // so we retry a few times with an increasing wait instead of giving up instantly.
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            const {data} = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}user/portfolio`
                , {
                withCredentials: true,
                timeout: 20000, // 20s per attempt
            });
            dispatch(userSlice.actions.loadUserSuccess(data.user));
            dispatch(userSlice.actions.clearAllErrors());
            return;
        } catch (error) {
            const isLastAttempt = attempt === maxAttempts;
            if (isLastAttempt) {
                dispatch(userSlice.actions.loadUserFailed("Failed to load user"));
            } else {
                await sleep(attempt * 3000); // 3s, then 6s before retrying
            }
        }
    }
}

export default userSlice.reducer
