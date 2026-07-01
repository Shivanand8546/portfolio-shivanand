import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const skillsSlice = createSlice({
    name: "skill",
    initialState: {
        loading: false,
        skill: [],
        error: null,
    },
    reducers: {
        loadSkillRequest(state) {
            state.loading = true;
        },
        loadSkillSuccess(state, action) {
            state.loading = false;
            state.skill = action.payload;
        },
        loadSkillFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        clearAllErrors(state) {
            state.error = null;
        },
    }
});

export const getSkill = () => async (dispatch) => {
    dispatch(skillsSlice.actions.loadSkillRequest());
    try {
        const { data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}skill`,
            { withCredentials: true }
        );
        dispatch(skillsSlice.actions.loadSkillSuccess(data.skills));
        dispatch(skillsSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(skillsSlice.actions.loadSkillFailed("Failed to load skills"));
    }
}

export default skillsSlice.reducer;
