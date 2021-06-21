import { gql } from "@apollo/client";

export const GET_COURSE = gql`
    query CourseDetailnew($id: Int!) {
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

export const GET_USER_ROLE = gql`
    query UserRole ($id: String!) {
        users( where: { auth0_id: { _eq: $id } } ) {
            role
        }
    }
`;

export const MY_COURSES = gql`
query MyCourses($id: String!) {
    enrolment(where: {user: {auth0_id: {_eq: $id}}}) {
      course {
        code
        id
        name
      }
    }
  }        
`;
