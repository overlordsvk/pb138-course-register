export interface SemestersReply {
    semesters: Semester[];
}

export interface CourseReply {
    course: Course[];
}

export interface Course {
    id: number;
    capacity: number;
    code: string;
    detail: string;
    enrolment_start: string;
    enrolment_end: string;
    name: string;
    teacher: Teacher;
    semester: Semester;
    enrolments: Enrolment[];
}

export interface Enrolment {
    user: User;
}

export interface User {
    name: string;
}

export interface Semester {
    id: number;
    year: number;
    term: string;
}

export interface Teacher {
    name: string;
}
