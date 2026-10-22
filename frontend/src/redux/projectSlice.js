import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name:"user",
    initialState: {
        projects: [],
        starredProjects: []
    },
    reducers:{
        setProjects:(state, action )=>{
            state.projects= action.payload
        },

        addNewProject:(state,action)=>{
            state.projects.unshift(action.payload)
        },
        setStarredProjects:(state, action )=>{
            state.starredProjects = action.payload
        },

    }
})

export const { setProjects, addNewProject, setStarredProjects } = projectSlice.actions

export default projectSlice.reducer