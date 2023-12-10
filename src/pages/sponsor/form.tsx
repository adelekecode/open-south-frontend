import { Formik } from "formik";
import * as Yup from "yup";
import Button from "~/components/button";
import FormField from "~/components/form-field";

const validationSchema = Yup.object({});

export default function Form() {
  return (
    <div className="flex justify-center">
      <Formik
        initialValues={{
          email: "",
          password: "",
          rememberMe: false,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          console.error(values);
        }}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form
            action="post"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full max-w-[700px]"
          >
            <h3 className="text-xl font-semibold">Become a sponsor</h3>
            <FormField label="Company Name" required placeholder="Example" name="companyName" />
            <FormField
              label="Email"
              required
              placeholder="example@gmail.com"
              name="email"
              type="email"
            />
            <Button className="w-full !mt-6" type="submit" loading={isSubmitting}>
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
