import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const fallbackProjects = {
    "proj1": {
        _id: "proj1",
        title: "Dental X-ray Disease Detection System",
        technologies: "React.js, Node.js, Express.js, MongoDB, Flask, Machine Learning, Docker",
        description: "Developed a healthcare web application for dental disease detection using X-ray images. Built a responsive frontend using React.js and integrated REST APIs using Node.js and Express.js. Connected a Flask-based machine learning model for real-time image classification. Implemented secure patient data management using MongoDB. Used Docker for containerization and deployment consistency.",
        gitRepoLink: "https://github.com/Shivanand8546",
        projectLink: "#",
        deployed: "No",
        projectBanner: { url: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&q=80" },
        projectSnapshots: [],
    },
    "proj2": {
        _id: "proj2",
        title: "Internet Service Provider Automation System",
        technologies: "Node.js, MongoDB, Express.js",
        description: "Developed backend modules for customer onboarding and billing automation. Improved operational efficiency by automating manual ISP workflows. Designed scalable data handling processes for better reliability.",
        gitRepoLink: "https://github.com/Shivanand8546",
        projectLink: "#",
        deployed: "No",
        projectBanner: { url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80" },
        projectSnapshots: [],
    },
    "proj3": {
        _id: "proj3",
        title: "Event Management System",
        technologies: "Python, Django, HTML, CSS",
        description: "Created a web-based event management platform with authentication functionality. Implemented CRUD operations and role-based access control. Designed user-friendly interfaces for event creation and management.",
        gitRepoLink: "https://github.com/Shivanand8546",
        projectLink: "#",
        deployed: "No",
        projectBanner: { url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80" },
        projectSnapshots: [],
    },
};

export const singleProjectSlice = createSlice({
    name: "singleProject",
    initialState: {
        loading: false,
        singleProject: {},
        error: null,
    },
    reducers: {
        loadSingleProjectRequest(state) {
            state.loading = true;
            state.singleProject = {};
        },
        loadSingleProjectSuccess(state, action) {
            state.loading = false;
            state.singleProject = action.payload;
        },
        loadSingleProjectFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        clearAllErrors(state) {
            state.error = null;
        },
    }
});

export const getSingleProject = (id) => async (dispatch) => {
    dispatch(singleProjectSlice.actions.loadSingleProjectRequest());
    try {
        const { data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}project/${id}`,
            { withCredentials: true }
        );
        dispatch(singleProjectSlice.actions.loadSingleProjectSuccess(data.project));
        dispatch(singleProjectSlice.actions.clearAllErrors());
    } catch (error) {
        // Backend se nahi mila — fallback use karo
        const fallback = fallbackProjects[id];
        if (fallback) {
            dispatch(singleProjectSlice.actions.loadSingleProjectSuccess(fallback));
        } else {
            dispatch(singleProjectSlice.actions.loadSingleProjectFailed("Project not found"));
        }
    }
}

export default singleProjectSlice.reducer;
