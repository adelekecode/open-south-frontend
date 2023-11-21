import Seo from "~/components/seo";

//counters(subsection, ".") "." counters(subsection, ".") " "

export default function Terms() {
  return (
    <>
      <Seo
        title="Terms of services"
        description="See what are terms of services are before you agree to it"
      />
      <main className="w-full mx-auto max-w-maxAppWidth p-6 largeMobile:px-4 pb-16 flex flex-col gap-6 [&>article>div]:flex [&>article>div]:flex-col [&>article>div]:gap-2 [&>article>div]:px-2 largeMobile:[&>article>div]:px-0 [&>article>div>h3]:font-bold [&>article>div>ol]:pl-8 [&>article>div>ol]:flex [&>article>div>ol]:flex-col [&>article>div>ol]:gap-2 [&>article>div>ol_strong]:font-semibold">
        <h1 className="text-2xl font-semibold">Terms of Service</h1>
        <p>
          Welcome to Open South! These terms and conditions ("Terms") govern your use of the Open
          South open data platform ("Platform"). By accessing or using the Platform, you agree to
          comply with these Terms. If you do not agree with any part of these Terms, please do not
          use the Platform.
        </p>
        <article className="flex flex-col gap-8 pt-2">
          <div>
            <h3>Use of Platform</h3>
            <ol
              className="order-list"
              style={{
                counterReset: "item 1",
              }}
            >
              <li>
                <strong>Access and Use:</strong> Open South grants you a non-exclusive,
                non-transferable, revocable license to access and use the Platform for personal,
                research, and non-commercial purposes, subject to these Terms.
              </li>
              <li>
                <strong>User Account:</strong> Some features of the Platform may require you to
                create a user account. You are responsible for maintaining the confidentiality of
                your account information and are fully responsible for all activities that occur
                under your account. You agree to notify Open South immediately of any unauthorized
                use of your account.
              </li>
              <li>
                <strong>Acceptable Use:</strong> You agree to use the Platform in compliance with
                all applicable laws, regulations, and these Terms. You shall not engage in any
                activity that may disrupt or interfere with the functioning of the Platform or
                infringe upon the rights of others.
              </li>
            </ol>
          </div>
          <div>
            <h3>Intellectual Property</h3>
            <ol
              className="order-list"
              style={{
                counterIncrement: "item 2",
              }}
            >
              <li>
                <strong>Ownership:</strong> The Platform, including all content, datasets, software,
                graphics, and design elements, are owned or licensed by Open South and are protected
                by intellectual property laws. All rights not expressly granted herein are reserved
                to Open South.
              </li>
              <li>
                <strong>License to User Contributions:</strong> By submitting or uploading any
                content, data, or materials to the Platform ("User Contributions"), you grant Open
                South a non-exclusive, royalty-free, worldwide license to use, reproduce,
                distribute, modify, display, and create derivative works of your User Contributions
                solely for the purposes of operating and improving the Platform.
              </li>
            </ol>
          </div>
          <div>
            <h3>Data Usage and Attribution</h3>
            <ol
              className="order-list"
              style={{
                counterIncrement: "item 3",
              }}
            >
              <li>
                <strong>Open Data License:</strong> Open South aims to provide data under open
                licenses whenever possible. Each dataset on the Platform may have its own specific
                license terms. Please review the associated license for each dataset to understand
                the permitted uses and any attribution requirements.
              </li>
              <li>
                <strong>Attribution:</strong> When using data from the Platform, you agree to
                provide proper attribution to the data source as indicated in the dataset
                documentation or metadata.
              </li>
            </ol>
          </div>
          <div>
            <h3>Privacy</h3>
            <ol
              className="order-list"
              style={{
                counterIncrement: "item 4",
              }}
            >
              <li>
                <strong>Privacy Policy:</strong> Open South respects your privacy and handles your
                personal information in accordance with our Privacy Policy. By using the Platform,
                you consent to the collection, use, and disclosure of your information as described
                in the Privacy Policy.
              </li>
              <li>
                <strong>Cookies:</strong> The Platform may use cookies and similar technologies to
                enhance your browsing experience. By using the Platform, you consent to the use of
                cookies in accordance with our Cookie Policy.
              </li>
            </ol>
          </div>
          <div>
            <h3>Disclaimer of Warranty and Limitation of Liability</h3>
            <ol
              className="order-list"
              style={{
                counterIncrement: "item 5",
              }}
            >
              <li>
                <strong>No Warranty:</strong> The Platform is provided on an "as is" and "as
                available" basis, without any warranties or representations, express or implied.
                Open South disclaims all warranties, including but not limited to warranties of
                merchantability, fitness for a particular purpose, and non-infringement.
              </li>
              <li>
                <strong>Limitation of Liability:</strong> To the maximum extent permitted by
                applicable law, Open South shall not be liable for any indirect, incidental,
                consequential, or punitive damages arising out of or in connection with the use or
                inability to use the Platform, even if Open South has been advised of the
                possibility of such damages.
              </li>
            </ol>
          </div>
          <div>
            <h3>Modification and Termination</h3>
            <ol
              className="order-list"
              style={{
                counterIncrement: "item 6",
              }}
            >
              <li>
                <strong>Modification:</strong> Open South reserves the right to modify or update
                these Terms at any time without prior notice. Your continued use of the Platform
                after any modifications indicates your acceptance of the modified Terms.
              </li>
              <li>
                <strong>Termination:</strong> Open South may, at its sole discretion, suspend or
                terminate your access to the Platform for any reason, including violation of these
                Terms.
              </li>
            </ol>
          </div>
          <div>
            <h3>Governing Law and Dispute Resolution</h3>
            <ol
              className="order-list"
              style={{
                counterIncrement: "item 7",
              }}
            >
              <li>
                <strong>Governing Law:</strong> These Terms shall be governed by and construed in
                accordance with the laws of [Jurisdiction], without regard to its conflict of laws
                principles.
              </li>
              <li>
                <strong>Dispute Resolution:</strong> Any disputes arising out of or relating to
                these Terms shall be resolved through good-faith negotiations. If a resolution
                cannot be reached, the dispute shall be submitted to binding arbitration in
                accordance with the rules of [Arbitration Body], with the arbitration conducted in
                [Jurisdiction].
              </li>
            </ol>
          </div>
          <div>
            <h3>General</h3>
            <ol
              className="order-list"
              style={{
                counterIncrement: "item 8",
              }}
            >
              <li>
                <strong>Entire Agreement:</strong> These Terms constitute the entire agreement
                between you and Open South regarding the use of the Platform and supersede any prior
                agreements or understandings
              </li>
              <li>
                <strong>Severability:</strong> If any provision of these Terms is deemed invalid or
                unenforceable, the remaining provisions shall remain in full force and effect.
              </li>
              <li>
                <strong>Waiver:</strong> The failure of Open South to enforce any right or provision
                of these Terms shall not constitute a waiver of such right or provision.
              </li>
            </ol>
          </div>
        </article>
        <p className="text-sm mt-2">
          Thank you for reviewing the Terms and Conditions. If you have any questions or concerns,
          please contact us at{" "}
          <a href="mailto:feedback@opensouth.io" className="text-primary-600 font-semibold">
            feedback@opensouth.io
          </a>
          .
        </p>
      </main>
    </>
  );
}
