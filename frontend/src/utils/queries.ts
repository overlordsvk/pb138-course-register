import { gql } from "@apollo/client";

export function getCourse(id: number) {
    return gql`
        query CourseDetail {
            course(where: {id: {_eq: ${id}}}) {
              id
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
}

export function getSemesters() {
    return gql`
        {
            semesters {
                id
                term
                year
            }
        }
    `;
}
