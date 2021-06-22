import { gql } from "@apollo/client";

export const GET_COURSE = gql`
    query CourseDetail($id: Int!) {
        course(where: { id: { _eq: $id } }) {
            capacity
            code
            detail
            enrolment_start
            enrolment_end
            name
            teacher {
                name
            }
            semester {
                id
                year
                term
            }
            enrolments(where: { user: { role: { _eq: student } } }) {
                user_id
                user {
                    name
                }
            }
        }
    }
`;

export const GET_SEMESTERS = gql`
    {
        semesters {
            id
            term
            year
        }
    }
`;

export const CREATE_COURSE = gql`
    mutation CreateCourse(
        $code: String!
        $name: String!
        $detail: String!
        $capacity: Int!
        $enrolment_start: timestamptz!
        $enrolment_end: timestamptz!
        $semester_id: Int!
        $teacher_id: String!
    ) {
        insert_course_one(
            object: {
                code: $code
                name: $name
                detail: $detail
                capacity: $capacity
                enrolment_start: $enrolment_start
                enrolment_end: $enrolment_end
                semester_id: $semester_id
                teacher_id: $teacher_id
            }
        ) {
            id
        }
    }
`;

export const UPDATE_COURSE = gql`
    mutation UpdateCourse(
        $id: Int!
        $code: String!
        $name: String!
        $detail: String!
        $capacity: Int!
        $enrolment_start: timestamptz!
        $enrolment_end: timestamptz!
        $semester_id: Int!
    ) {
        update_course_by_pk(
            pk_columns: { id: $id }
            _set: {
                code: $code
                name: $name
                detail: $detail
                capacity: $capacity
                enrolment_start: $enrolment_start
                enrolment_end: $enrolment_end
                semester_id: $semester_id
            }
        ) {
            id
        }
    }
`;
export const GET_USER_ROLE = gql`
    query UserRole($id: String!) {
        users(where: { auth0_id: { _eq: $id } }) {
            role
        }
    }
`;

export const MY_COURSES = gql`
    query MyCourses($id: String!) {
        enrolment(where: { user: { auth0_id: { _eq: $id } } }) {
            course {
                code
                id
                name
            }
        }
    }
`;

export const CREATE_ENROLMENT = gql`
    mutation CreateEnrolment($id: Int!, $user_id: String!) {
        insert_enrolment_one(object: { course_id: $id, user_id: $user_id }) {
            course_id
        }
    }
`;

export const DELETE_ENROLMENT = gql`
    mutation UrollFromCourse($course_id: Int!, $user_id: String!) {
        delete_enrolment_by_pk(course_id: $course_id, user_id: $user_id) {
            __typename
        }
    }
`;

export const GET_COURSE_STUDENTS = gql`
    query CourseStudents($id: Int!) {
        course(where: { id: { _eq: $id } }) {
            name
            enrolments(where: { user: { role: { _eq: student } } }) {
                user {
                    auth0_id
                    name
                    email
                }
            }
        }
    }  
`;

export const GET_STUDENT = gql`
    query Student($id: String!) {
        users(where: {auth0_id: {_eq: $id}}) {
            auth0_id
            created_at
            email
            last_seen
            name
            role
        }
    }
`;


export const GET_ALL_USERS = gql`
    query getUsers {
        users {
            auth0_id
            name
            email
            role
        }
    }
`;
