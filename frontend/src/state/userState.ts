import { atom } from "recoil";

export const userState = atom({
    key: "userState", 
    default: {id: "", name: "", role: "", email:"", picture:""}, 
});