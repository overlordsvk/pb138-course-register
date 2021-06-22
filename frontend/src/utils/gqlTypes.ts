export interface SemestersReply {
    semesters: Semester[];
}

export interface CourseReply {
    course: Course[];
}

export interface Course {
    capacity: number;
    code: string;
    detail: string;
    enrolment_end: string;
    enrolment_start: string;
    id: number;
    name: string;
    semester_id: number;
    teacher_id: string;
    enrolments: Enrolment[];
    semester: Semester;
    teacher: User;
}

export interface Enrolment {
    course_id: number;
    enroled_at: string;
    user_id: string;
    user: User;
}

export interface User {
    role: string;
    name: string;
    last_seen: string;
    email: string;
    created_at: string;
    auth0_id: string;
}

export interface Semester {
    id: number;
    name: string;
    term: string;
    year: number;
}

export interface Role {
    name: string;
}

export interface UserRole {
    users: User[];
}

export interface CourseEnrollments {
    name: string;
    enrolments: EnrolledStudent[];
}

export interface EnrolledStudent {
    user: {
        id: string;
        name: string;
        email: string;
    }
}

export interface CourseStudents {
    course: CourseEnrollments[];
}