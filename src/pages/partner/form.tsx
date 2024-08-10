import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "~/components/button";
import FormField from "~/components/fields/form-field";
import PhoneNumberField from "~/components/fields/phone-number-field";
import { useSendPartnerRequest } from "~/mutations/partner";
import { notifySuccess } from "~/utils/toast";

const validationSchema = Yup.object({
  organizationName: Yup.string().required("Organization name is required"),
  contactPerson: Yup.string().required("Contact person is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  organizationType: Yup.string().required("Organization type is required"),
  purposeOfPartnership: Yup.string().required("Purpose of partnership is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
});

export default function Form() {
  const { t } = useTranslation("layout/partners");

  const { mutateAsync: sendPartnerRequest } = useSendPartnerRequest();

  return (
    <div className="flex justify-center">
      <Formik
        initialValues={{
          organizationName: "",
          contactPerson: "",
          email: "",
          organizationType: "",
          phoneNumber: "",
          purposeOfPartnership: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (
          {
            contactPerson,
            email,
            organizationName,
            organizationType,
            purposeOfPartnership,
            phoneNumber,
          },
          { resetForm }
        ) => {
          const response = await sendPartnerRequest({
            organisation_name: organizationName,
            contact_person: contactPerson,
            email,
            description: purposeOfPartnership,
            organisation_type: organizationType,
            phone: phoneNumber,
          });

          if (response) {
            notifySuccess("Partner request sent");
            resetForm();
          }
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
              <p className="text-sm">{t("form.subtitle")}</p>
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
              {t("form.submit-btn")}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
