// const globalReducer = (state, action)=>{
//     switch(action.type){
//         case GET_USER_AUTH:
//             return{
//                 ...state,
//                 authInfo:action.payload
//             }
//         default:
//             return state
//     }
// }
import { CHANGE_INPUT, GET_ALL_RESUME_DATA, GET_SINGLE_RESUME_DATA } from "./actionType";
import set from "loadsh/set";

export const builderContent = {
  resumeData: [],
  singleResumeData:[]
  // resumeInitData: {
  //   resumeID: "",
  //   profile: {
  //     heading: "Profile",
  //     photo: "",
  //     firstName: "",
  //     lastName: "",
  //     subtitle: "",
  //     address: {
  //       line1: "",
  //       line2: "",
  //       line3: "",
  //     },
  //     phone: "",
  //     website: "",
  //     email: "",
  //   },
  //   objective: {
  //     heading: "Objective",
  //     body: "",
  //   },
  //   work: {
  //     heading: "Work Experience",
  //     items: [],
  //   },
  //   education: {
  //     heading: "Education",
  //     items: [],
  //   },
  //   awards: {
  //     heading: "Honors & Awards",
  //     items: [],
  //   },
  //   certifications: {
  //     heading: "Certifications",
  //     items: [],
  //   },
  //   skills: {
  //     heading: "Skills & Hobbies",
  //     items: [],
  //   },
  //   extras: {
  //     heading: "Personal Information",
  //     items: [],
  //   },

  //   themes: {
  //     font: {
  //       family: "",
  //     },
  //     colors: {
  //       background: "",
  //       accent: "",
  //       body: "",
  //     },
  //   },
  // },
};

export const builderReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_INPUT:
      return set({ ...state }, action.payload.key, action.payload.value);
    case GET_ALL_RESUME_DATA:
      return { ...state, resumeData: action.payload };
    // case GET_RESUME_ID:
    //   return { ...state, resumeID: action.payload };
    case GET_SINGLE_RESUME_DATA: 
      return {...state, singleResumeData:action.payload}
    default:
      return { ...state };
  }
};
