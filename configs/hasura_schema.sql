SET check_function_bodies = false;
CREATE TABLE public.course (
    id integer NOT NULL,
    code text NOT NULL,
    detail text NOT NULL,
    capacity integer NOT NULL,
    enrolment_start timestamp with time zone NOT NULL,
    enrolment_end timestamp with time zone NOT NULL,
    semester_id integer NOT NULL,
    name text NOT NULL,
    teacher_id text NOT NULL
);
CREATE SEQUENCE public.course_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.course_id_seq OWNED BY public.course.id;
CREATE TABLE public.enrolment (
    user_id text NOT NULL,
    course_id integer NOT NULL,
    enroled_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.users (
    name text NOT NULL,
    email text NOT NULL,
    role text DEFAULT 'student'::text NOT NULL,
    auth0_id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    last_seen timestamp with time zone DEFAULT now() NOT NULL,
    picture text DEFAULT ''::text NOT NULL
);
CREATE VIEW public.online_users AS
 SELECT users.name,
    users.last_seen
   FROM public.users
  WHERE (users.last_seen >= (now() - '00:00:30'::interval));
CREATE TABLE public.role (
    name text NOT NULL
);
CREATE TABLE public.semesters (
    id integer NOT NULL,
    year integer NOT NULL,
    term text NOT NULL
);
CREATE SEQUENCE public.semesters_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.semesters_id_seq OWNED BY public.semesters.id;
ALTER TABLE ONLY public.course ALTER COLUMN id SET DEFAULT nextval('public.course_id_seq'::regclass);
ALTER TABLE ONLY public.semesters ALTER COLUMN id SET DEFAULT nextval('public.semesters_id_seq'::regclass);
ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.enrolment
    ADD CONSTRAINT enrolment_pkey PRIMARY KEY (user_id, course_id);
ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_name_key UNIQUE (name);
ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (name);
ALTER TABLE ONLY public.semesters
    ADD CONSTRAINT semesters_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.semesters
    ADD CONSTRAINT semesters_year_term_key UNIQUE (year, term);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (auth0_id);
ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_semester_id_fkey FOREIGN KEY (semester_id) REFERENCES public.semesters(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES public.users(auth0_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.enrolment
    ADD CONSTRAINT enrolment_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.course(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.enrolment
    ADD CONSTRAINT enrolment_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(auth0_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.users
    ADD CONSTRAINT role_fkey FOREIGN KEY (role) REFERENCES public.role(name);
