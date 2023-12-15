import { Formik } from "formik";
import * as Yup from "yup";
import Button from "~/components/button";
import FormField from "~/components/form-field";
import PhoneNumberField from "~/components/phone-number-field";

const validationSchema = Yup.object({});

export default function Form() {
  return (
    <div className="flex justify-center">
      <Formik
        initialValues={{
          organizationName: "",
          contactPerson: "",
          email: "",
          organizationType: "",
          purposeOfPartnership: "",
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
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold">Become a partner</h3>
              <p className="text-sm">Please fill the form below</p>
            </div>
            <FormField
              label="Organization Name"
              required
              placeholder="Example"
              name="organizationName"
            />
            <FormField
              label="Contact Person"
              required
              placeholder="Enter contact person's name"
              name="contactPerson"
            />
            <FormField
              label="Email"
              required
              placeholder="example@gmail.com"
              name="email"
              type="email"
            />
            <PhoneNumberField
              id="phoneNumber"
              label="Phone Number"
              required
              placeholder="+234 0000000000"
              name="phoneNumber"
              type="text"
            />
            <FormField
              label="Organization Type"
              required
              placeholder="Specify if you are a company, nonprofit, government entity, etc."
              name="organizationType"
            />
            <FormField
              label="Purpose of Partnership"
              required
              multiline
              placeholder="Briefly describe why you want to be our partner."
              name="purposeOfPartnership"
              rows={6}
              className="!p-0"
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
