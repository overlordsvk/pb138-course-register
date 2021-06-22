import { atom } from "recoil";

export const exampleState = atom({
    key: "exampleState",
    default: "test",
});

export const refetchTrigger = atom({
    key: "allCourses",
    default: false,
});

export const studentState = atom({
    key: "studentState",
    default: { id: "", name: "", role: "", email: "", picture: "" },
});
