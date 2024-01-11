import Seo from "~/components/seo";

export default function PrivacyPolicy() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description={`Thank you for using Open South ("Platform"). Open South is committed to protecting your privacy and safeguarding your personal information. This privacy policy explains how we collect, use, and disclose your personal data when you access and use the Platform. By using the platform, you consent to the collection and processing of your personal information as described in this privacy policy.`}
      />
      <main className="w-full mx-auto max-w-maxAppWidth p-6 px-10 tablet:px-6 largeMobile:!px-4 pb-16 flex flex-col gap-6">
        <h1 className="text-4xl tablet:text-3xl largeMobile:!text-2xl font-semibold">
          Privacy Policy
        </h1>
        <p>
          Thank you for using Open South ("Platform"). Open South is committed to protecting your
          privacy and safeguarding your personal information. This privacy policy explains how we
          collect, use, and disclose your personal data when you access and use the Platform. By
          using the platform, you consent to the collection and processing of your personal
          information as described in this privacy policy.
        </p>
        <div className="flex flex-col gap-8 pt-2 [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&>div]:px-2 largeMobile:[&>div]:px-0 [&>div>h3]:font-bold [&>div>ol]:pl-8 [&>div>ol]:flex [&>div>ol]:flex-col [&>div>ol]:gap-2 [&>div>ol_span]:font-medium">
          <div>
            <h3>Information We Collect</h3>
            <ol
              className="order-list"
              style={{
                counterReset: "item 1",
              }}
            >
              <li>
                <span>Personal Information:</span> When you create an account or interact with the
                platform, we may collect personal information such as your name, email address,
                username, and any other information you voluntarily provide.
              </li>
              <li>
                <span>Usage Data:</span> We collect information about your interactions with the
                platform, including your IP address, browser type, device information, pages
                visited, and actions taken. This information helps us analyze usage patterns,
                improve the platform, and enhance user experience.
              </li>
              <li>
                <span>Cookies and Similar Technologies:</span> We may use cookies, beacons, and
                other tracking technologies to collect information about your usage of the platform.
                You can control the use of cookies through your browser settings.
              </li>
            </ol>
          </div>
          <div>
            <h3>Use of Information</h3>
            <ol
              className="order-list"
              style={{
                counterReset: "item 2",
              }}
            >
              <li>
                <span>Provide and Improve the Platform:</span> We use the collected information to
                provide, maintain, and improve the Platform's functionality and performance,
                personalize your experience, and develop new features and services.
              </li>
              <li>
                <span>Communication:</span> We may use your contact information to communicate with
                you, respond to inquiries, provide support, and send important updates or
                notifications related to the Platform.
              </li>
              <li>
                <span>Research and Analytics:</span> We may aggregate and anonymize user data for
                research and analytical purposes, including statistical analysis, market research,
                and trend monitoring, to enhance the Platform and better understand user needs.
              </li>
              <li>
                <span>Legal Compliance:</span> We may process your personal information to comply
                with applicable laws, regulations, or legal obligations, and to enforce our rights,
                protect our property, or ensure the safety and security of the Platform and its
                users.
              </li>
            </ol>
          </div>
          <div>
            <h3>Data Sharing and Disclosure</h3>
            <ol
              className="order-list"
              style={{
                counterReset: "item 3",
              }}
            >
              <li>
                <span>Service Providers:</span> We may engage trusted third-party service providers
                to perform certain functions on our behalf, such as hosting, data analysis, customer
                support, and marketing. These providers will have access to your personal
                information only to the extent necessary to perform their respective tasks and are
                obligated to maintain its confidentiality.
              </li>
              <li>
                <span>Legal Requirements:</span> We may disclose your personal information if
                required to do so by law, or if we believe in good faith that such disclosure is
                necessary to comply with legal obligations, protect our rights or safety,
                investigate fraud, or respond to a government request.
              </li>
              <li>
                <span>Consent:</span> We may share your personal information with your consent or at
                your direction.
              </li>
            </ol>
          </div>
          <div>
            <h3>Data Retention</h3>
            <p>
              We will retain your personal information for as long as necessary to fulfill the
              purposes outlined in this Privacy Policy, unless a longer retention period is required
              or permitted by law. When personal information is no longer needed, we will securely
              dispose of or anonymize it.
            </p>
          </div>
          <div>
            <h3>Data Security</h3>
            <p>
              We take reasonable measures to protect your personal information from unauthorized
              access, loss, misuse, alteration, or disclosure. However, no method of transmission
              over the internet or electronic storage is entirely secure, and we cannot guarantee
              absolute security.
            </p>
          </div>
          <div>
            <h3>Third-Party Links</h3>
            <p>
              The Platform may contain links to third-party websites or services that are not
              controlled or operated by Open South. This Privacy Policy does not apply to those
              third-party sites. We encourage you to review the privacy policies of any third-party
              sites or services before providing any personal information.
            </p>
          </div>
          <div>
            <h3>Changes to this Privacy Policy</h3>
            <p>
              We may update this Privacy Policy from time to time, and any changes will be effective
              when we post the revised version. We encourage you to review this Privacy Policy
              periodically for any updates. Your continued use of the Platform after the posting of
              changes constitutes your acceptance of the revised Privacy Policy.
            </p>
          </div>
          <div>
            <h3>Contact Us</h3>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or the
              handling of your personal information, please contact us at feedback@opensouth.io. We
              will strive to address your inquiries in a timely and appropriate manner.
            </p>
          </div>
        </div>
        <p className="mt-4">Thank you for reading our Privacy Policy.</p>
      </main>
    </>
  );
}
