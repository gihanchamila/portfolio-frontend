import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../utils/Button";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  organization: Yup.string().required("Organization is required"),
  issueDate: Yup.string().required("Issue Date is required"),
  credentialURL: Yup.string()
    .required("Credential URL is required")
    .url("Invalid Credential URL"),
});

const AddCertificateForm = ({ onSubmit, onCancel }) => (
  <Formik
    initialValues={{
      title: "",
      organization: "",
      issueDate: "",
      credentialURL: "",
    }}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {({isSubmitting }) => (
      <Form className="space-y-4">
        <div>
          <label className="formLable">Title</label>
          <Field name="title" className="formInput" />
          <ErrorMessage name="title" component="div" className="formError" />
        </div>
        <div>
          <label className="formLable">Organization</label>
          <Field name="organization" className="formInput" />
          <ErrorMessage name="organization" component="div" className="formError" />
        </div>
        <div>
          <label className="formLable">Issue Date</label>
          <Field name="issueDate" type="date" className="formInput" />
          <ErrorMessage name="issueDate" component="div" className="formError" />
        </div>
        <div>
          <label className="formLable">Credential URL</label>
          <Field name="credentialURL" className="formInput" />
          <ErrorMessage name="credentialURL" component="div" className="formError" />
        </div>
        <div className="flex gap-2">
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Certificate"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    )}
  </Formik>
);

export default AddCertificateForm;