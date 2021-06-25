<a href="https://www.typescriptlang.org/" title="Typescript"><img src="https://github.com/get-icon/geticon/raw/master/icons/typescript-icon.svg" alt="Typescript" width="30px" height="30px"></a>
<a href="https://reactjs.org/" title="React"><img src="https://github.com/get-icon/geticon/raw/master/icons/react.svg" alt="React" width="30px" height="30px"></a>
<a href="https://www.w3.org/TR/html5/" title="HTML5"><img src="https://github.com/get-icon/geticon/raw/master/icons/html-5.svg" alt="HTML5" width="30px" height="30px"></a>
<a href="https://www.w3.org/TR/CSS/" title="CSS3"><img src="https://github.com/get-icon/geticon/raw/master/icons/css-3.svg" alt="CSS3" width="30px" height="30px"></a>
<a href="https://ant.design/" title="Ant Design"><img src="https://github.com/get-icon/geticon/raw/master/icons/ant-design.svg" alt="Ant Design" width="30px" height="30px"></a>
<a href="https://nodejs.org/" title="Node.js"><img src="https://github.com/get-icon/geticon/raw/master/icons/nodejs-icon.svg" alt="Node.js" width="30px" height="30px"></a>
<a href="https://www.postgresql.org/" title="PostgreSQL"><img src="https://github.com/get-icon/geticon/raw/master/icons/postgresql.svg" alt="PostgreSQL" width="30px" height="30px"></a>
<a href="https://graphql.org/" title="GraphQL"><img src="https://github.com/get-icon/geticon/raw/master/icons/graphql.svg" alt="GraphQL" width="30px" height="30px"></a>
<a href="https://www.apollographql.com/" title="Apollo"><img src="https://github.com/get-icon/geticon/raw/master/icons/apollostack.svg" alt="Apollo" width="30px" height="30px"></a>
<a href="https://eslint.org/" title="ESLint"><img src="https://github.com/get-icon/geticon/raw/master/icons/eslint.svg" alt="ESLint" width="30px" height="30px"></a>
<a href="https://auth0.com/" title="Auth0"><img src="https://github.com/get-icon/geticon/raw/master/icons/auth0.svg" alt="Auth0" width="30px" height="30px"></a>
<a href="https://hasura.io/" title="Hasura"><img src="https://github.com/get-icon/geticon/raw/master/icons/hasura.svg" alt="Hasura" width="30px" height="30px"></a>

# Course registration project

## Live Demo
[https://pb138-course-register-v1.vercel.app/](https://pb138-course-register-v1.vercel.app/)
  - default role as student

## Technologies
  - React (Typescript)
  - Apollo Client
  - Recoil
  - Node.js
  - Hasura (Cloud)
  - Auth0 (SPA)
  - PostgreSQL (Heroku Cloud)
  - HTML5
  - CSS3
  - Ant.design (React UI)

## Project deployment
  1. import ```/configs/hasura_schema.sql``` to DB 
  2. import ```/configs/hasura_metadata.json``` to Hasura
  3. add authentication rule to Auth0  ```/configs/auth0/hasura-jwt-claim.js```
  4. add authentication rule to Auth0  ```/configs/auth0/hasura-user-sync.js```
  5. replace config strings in ```/frontend/src/utils/constants.ts```with yours
  6. in ```/frontend``` run ```npm start```

## Authors (name, UČO)
  - Márius Molčány, 456350  
  - Peter Baltazarovič, 456213 
  - Michal Cikatricis, 485669
  - Martin Gargalovič, 485612

Developed as project for MUNI FI: PB138 Modern markup languages

## License
[MIT][license] © Authors

