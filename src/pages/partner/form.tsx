import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "~/components/button";
import FormField from "~/components/fields/form-field";
import PhoneNumberField from "~/components/fields/phone-number-field";

const validationSchema = Yup.object({});

export default function Form() {
  const { t } = useTranslation("layout/partners");

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
              <h3 className="text-xl font-semibold">{t("form.title")}</h3>
              <p className="text-sm">{t("subtitle")}</p>
            </div>
            <FormField
              label={t("form.inputs.organization-name.label")}
              required
              name="organizationName"
              placeholder={t("form.inputs.organization-name.placeholder")}
            />
            <FormField
              label={t("form.inputs.contact-person.label")}
              required
              name="contactPerson"
              placeholder={t("form.inputs.contact-person.placeholder")}
            />
            <FormField
              label={t("form.inputs.email.label")}
              required
              name="email"
              type="email"
              placeholder={t("form.inputs.email.placeholder")}
            />
            <PhoneNumberField
              id="phoneNumber"
              label={t("form.inputs.phone-number.label")}
              required
              placeholder="+234 0000000000"
              name="phoneNumber"
              type="text"
            />
            <FormField
              label={t("form.inputs.organization-type.label")}
              required
              name="organizationType"
              placeholder={t("form.inputs.organization-type.placeholder")}
            />
            <FormField
              label={t("form.inputs.purpose-of-partnership.label")}
              required
              multiline
              name="purposeOfPartnership"
              placeholder={t("form.inputs.purpose-of-partnership.placeholder")}
              rows={6}
              className="!p-0"
            />
            <Button className="w-full !mt-6" type="submit" loading={isSubmitting}>
              {t("submit-btn")}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
