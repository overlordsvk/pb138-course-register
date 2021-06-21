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
            enrolments {
                user {
                    id
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
        $teacher_id: Int!
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
