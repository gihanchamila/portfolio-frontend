import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "./Button";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  subtitle: Yup.string().required("Subtitle is required"),
  description: Yup.string().required("Description is required"),
  projectUrl: Yup.string()
    .required("ProjectUrl is required")
    .url("Invalid project URL"),
  githubUrl: Yup.string()
    .required("GithubUrl is required")
    .url("Invalid GitHub URL")
    .matches(/^https:\/\/github\.com\//, "GitHub URL must start with 'https://github.com/'"),
  file: Yup.mixed().required("File is required"),
});

const ProjectForm = ({ onSubmit, onCancel, initialValues, isUpdate }) => (
  <Formik
    enableReinitialize={true}
    initialValues={initialValues || {
      title: "",
      subtitle: "",
      description: "",
      projectUrl: "",
      githubUrl: "",
      file: null,
    }}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {({ setFieldValue, isSubmitting }) => (
      <Form className="space-y-4">
        <div>
          <label className="formLable">Title</label>
          <Field name="title" className="formInput" />
          <ErrorMessage name="title" component="div" className="formError" />
        </div>
        <div>
          <label className="formLable">Subtitle</label>
          <Field name="subtitle" className="formInput" />
          <ErrorMessage name="subtitle" component="div" className="formError" />
        </div>
        <div>
          <label className="formLable">Description</label>
          <Field as="textarea" name="description" className="formInput" />
          <ErrorMessage name="description" component="div" className="formError" />
        </div>
        <div>
          <label className="formLable">Project URL</label>
          <Field name="projectUrl" className="formInput" />
          <ErrorMessage name="projectUrl" component="div" className="formError" />
        </div>
        <div>
          <label className="formLable">GitHub URL</label>
          <Field name="githubUrl" className="formInput" />
          <ErrorMessage name="githubUrl" component="div" className="formError" />
        </div>
        <div>
          <label className="formLable">File</label>
          <input
            name="file"
            type="file"
            className="formInput"
            onChange={e => setFieldValue("file", e.currentTarget.files[0])}
          />
          <ErrorMessage name="file" component="div" className="formError" />
        </div>
        <div className="flex gap-2">
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? (isUpdate ? "Updating..." : "Adding...") : isUpdate ? "Update Project" : "Add Project"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    )}
  </Formik>
);

export default ProjectForm;