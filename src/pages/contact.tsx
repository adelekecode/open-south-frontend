import { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "~/components/button";
import FormField from "~/components/fields/form-field";
import Seo from "~/components/seo";
import { useSendMessage } from "~/mutations/contact";

const validationSchema = Yup.object({
  name: Yup.string().trim().required("Name field is required"),
  email: Yup.string().email("Invalid email address").required("Email field is required"),
  message: Yup.string().trim().required("Message field is required"),
});

export default function Contact() {
  const sendMessage = useSendMessage();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Seo
        title="Contact Us"
        description="Having troubles navigating through the site? send us a message"
      />

      <main className="w-full mx-auto max-w-maxAppWidth p-6 px-10 tablet:px-5 largeMobile:!px-4 pt-0 pb-12 flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl tablet:text-3xl largeMobile:!text-2xl font-semibold">
            Contact Us
          </h1>
          <p className="text-base largeMobile:text-sm">
            Do you have a question for Open South? Kindly reach out to us.
          </p>
        </div>
        <Formik
          initialValues={{
            name: "",
            email: "",
            message: "",
          }}
          validationSchema={validationSchema}
          validateOnBlur={false}
          onSubmit={async (values, { resetForm }) => {
            const response = await sendMessage.mutateAsync({
              ...values,
            });

            if (response) {
              resetForm();
            }
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-2xl mx-auto">
              <FormField label="Name" required placeholder="John Doe" name="name" />
              <FormField
                label="Email"
                required
                placeholder="example@gmail.com"
                name="email"
                type="email"
              />
              <FormField
                label="Message"
                required
                multiline
                placeholder="Type your message here..."
                name="message"
                rows={6}
                className="!p-0"
              />
              <Button className="w-full !mt-6" type="submit" loading={isSubmitting}>
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </main>
    </>
  );
}
