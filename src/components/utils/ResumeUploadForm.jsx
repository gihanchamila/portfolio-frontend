import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Button from './Button'

const ResumeUploadForm = ({ onSubmit, onCancel }) => (
  <Formik
    initialValues={{ file: null }}
    validationSchema={Yup.object({
      file: Yup.mixed()
        .required('Resume is required')
        .test(
          'fileFormat',
          'Only PDF files are allowed',
          (value) => value && value.type === 'application/pdf',
        ),
    })}
    onSubmit={onSubmit}
  >
    {({ setFieldValue, isSubmitting }) => (
      <Form className="space-y-4">
        <div>
          <label className="formLable">Resume (PDF)</label>
          <input
            name="file"
            type="file"
            accept="application/pdf"
            className="formInput"
            onChange={(e) => setFieldValue('file', e.currentTarget.files[0])}
          />
          <ErrorMessage name="file" component="div" className="formError" />
        </div>
        <div className="flex gap-2">
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Uploading...' : 'Upload'}
          </Button>
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    )}
  </Formik>
)

export default ResumeUploadForm
