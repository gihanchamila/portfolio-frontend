import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "./Button";
import DOMPurify from 'dompurify'

// --- MODIFICATION 1: Update Validation Schema ---
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  subtitle: Yup.string().required("Subtitle is required"),
  description: Yup.string().required("Description is required"),
  projectUrl: Yup.string()
    .url("Invalid URL").nullable(),
    githubUrl: Yup.string()
    .url("Invalid GitHub URL")
    .matches(/^https:\/\/github\.com\//, "GitHub URL must start with 'https://github.com/'"),
  techStack: Yup.string(), // Tech stack is optional
  file: Yup.mixed().required("A cover photo is required"),
  // Add validation for the new 'images' field
  images: Yup.array()
    .of(Yup.mixed()) // The array should contain files
    .max(5, "You can upload a maximum of 5 additional images"),
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
      techStack: initialValues?.techStack ? initialValues.techStack.join(", ") : "",
      file: null,
      images: [],
    }}
    validationSchema={validationSchema}
    onSubmit={(values, helpers) => {
      const sanitizedValues = Object.fromEntries(
        Object.entries(values).map(([key, value]) => {
          if (typeof value === 'string') {
            return [key, DOMPurify.sanitize(value)];
          }
          return [key, value];
        })
      );

      const finalValues = {
        ...sanitizedValues,
        techStack: sanitizedValues.techStack
          ? sanitizedValues.techStack.split(',').map(item => DOMPurify.sanitize(item.trim()))
          : []
      };

      onSubmit(finalValues, helpers);
    }}

  >
    {({ setFieldValue, isSubmitting }) => (
      <Form className="space-y-4">
        {/* All existing fields remain the same */}
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
        
        {/* --- MODIFICATION 3: Add Tech Stack Field --- */}
        <div>
          <label className="formLable">Tech Stack (comma separated)</label>
          <Field name="techStack" className="formInput" placeholder="e.g. React, Node.js, AWS S3" />
          <ErrorMessage name="techStack" component="div" className="formError" />
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
          <label className="formLable">Cover Photo</label>
          <input
            name="file"
            type="file"
            className="formInput"
            onChange={e => setFieldValue("file", e.currentTarget.files[0])}
          />
          <ErrorMessage name="file" component="div" className="formError" />
        </div>

        {/* --- MODIFICATION 4: Add Multiple Images Field --- */}
        <div>
          <label className="formLable">Additional Images (up to 5)</label>
          <input
            name="images"
            type="file"
            multiple // This attribute allows multiple file selection
            className="formInput"
            onChange={e => {
              // e.currentTarget.files is a FileList, convert it to an array
              const files = Array.from(e.currentTarget.files);
              setFieldValue("images", files);
            }}
          />
          <ErrorMessage name="images" component="div" className="formError" />
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