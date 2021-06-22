/* eslint-disable no-unused-vars */
import { useRecoilValue } from "recoil";
import { userState } from "../state/userState";
import { Semester } from "./gqlTypes";

const groupBy = <T, K extends keyof T>(array: T[], key: K) => {
    let map = new Map<T[K], T[]>();
    array.forEach((item) => {
        let itemKey = item[key];
        if (!map.has(itemKey)) {
            map.set(
                itemKey,
                array.filter((i) => i[key] === item[key])
            );
        }
    });
    return map;
};

export const getSemestersAsCascaderOptions = (array: Semester[]) => {
    const grouppedSemesters = groupBy(array, "year");
    let options: any[] = [];
    grouppedSemesters.forEach((year) => {
        let terms: any[] = [];
        year.forEach((term) => {
            terms.push({ value: term.id, label: term.term });
        });
        options.push({
            value: year[0].year,
            label: year[0].year,
            children: terms,
        });
    });
    return options;
};

export enum UserRole {
    student = "student",
    teacher = "teacher",
    admin = "admin"
}

const isStudent = () => {
    const user = useRecoilValue(userState);
    return user.role.includes(UserRole.student);
};

export const isTeacher = () => {
    const user = useRecoilValue(userState);
    return user.role.includes(UserRole.teacher);
};

export const isAdmin = () => {
    const user = useRecoilValue(userState);
    return user.role.includes(UserRole.admin);
};

export type { Semester };
export default isStudent;