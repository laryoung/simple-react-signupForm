import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

//import syled component
import { StyledTitle, StyledSubTitle } from "../components/Style";
// const validate = (values) => {
//   let errors = {};
//   if (!values.name || values.name < 5) {
//     errors.name = "name is required";
//   }
//   return errors;
// };
const validationSchema = Yup.object({
  name: Yup.string()
    .max(5, "Username must be more than 5 characters")
    .min(2, "Username must not be more than two characters")
    .required("Username field is required"),
});
export default function Signup() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div>
      <div></div>
      <StyledTitle size={65} color={"black"}>
        Welcome to Login Demo
      </StyledTitle>
      <StyledSubTitle size={27} color={"black"}>
        Feel free to explore our page
      </StyledSubTitle>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name</label>
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}
        <input
          id="name"
          type="text"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  );
}
