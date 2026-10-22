// import { createSlice } from "@reduxjs/toolkit";

// const projectSlice = createSlice({
//     name:"user",
//     initialState: {
//         projects: [],
//     },
//     reducers:{
//         setProjects:(state, action )=>{
//             state.projects= action.payload
//         },

//         addNewProject:(state,action)=>{
//             state.projects.unshift(action.payload)
//         },

//     }
// })

// export const { setProjects, addNewProject, setStarredProjects } = projectSlice.actions

// export default projectSlice.reducer


import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "project",

  initialState: {
    projects: [],
    starredProjects: [],
  },

  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },

    setStarredProjects: (state, action) => {
      state.starredProjects = action.payload;
    },

    addNewProject: (state, action) => {
      state.projects.unshift(action.payload);
    },

    upsertProject: (state, action) => {
      const project = action.payload;

      const projectIndex = state.projects.findIndex(
        (item) => item._id === project._id
      );

      if (projectIndex !== -1) {
        state.projects[projectIndex] = project;
      }

      if (project.starred) {
        const starredIndex = state.starredProjects.findIndex(
          (item) => item._id === project._id
        );

        if (starredIndex !== -1) {
          state.starredProjects[starredIndex] = project;
        } else {
          state.starredProjects.unshift(project);
        }
      } else {
        state.starredProjects = state.starredProjects.filter(
          (item) => item._id !== project._id
        );
      }
    },

    removeProject: (state, action) => {
      const id = action.payload;

      state.projects = state.projects.filter(
        (project) => project._id !== id
      );

      state.starredProjects = state.starredProjects.filter(
        (project) => project._id !== id
      );
    },
  },
});

export const {
  setProjects,
  setStarredProjects,
  addNewProject,
  upsertProject,
  removeProject,
} = projectSlice.actions;

export default projectSlice.reducer;
