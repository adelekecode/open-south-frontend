import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Button from "~/components/button";
import Modal from "~/components/modal";
import useAppStore from "~/store/app";

export default function DatasetAgreement() {
  const { setAgreeTerms } = useAppStore();

  return (
    <Modal
      open
      PaperProps={{
        className: "!max-w-[700px]",
        sx: {
          "li > span": {
            paddingLeft: "6px",
          },
          "ol, ul": {
            paddingLeft: "16px",
          },
        },
      }}
    >
      <header className="pb-3">
        <DialogTitle>Data Provider Agreement</DialogTitle>
        <small>
          For supply of data to the Open South Data Project for future use by researchers in the
          Global South
        </small>
      </header>
      <DialogContent className="text-sm flex flex-col gap-4">
        <p>
          The Open South Data Project (“Repository”) is an online data platform powered and
          developed by{" "}
          <a
            href="https://www.eaamo.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 underline"
          >
            EAAMO (Equity and Access in Algorithms, Mechanisms, and Optimization)
          </a>{" "}
          to provide a single point where researchers, policy-makers, students, data practitioners,
          non-governmental organizations and related entities in the Global South can access, share,
          and freely explore non-sensitive, fully anonymized research datasets.
        </p>
        <p>
          The Repository provides a place where Global South researchers can both share data they
          have generated (as a “Data Provider”) and access existing data that is available in the
          Repository (as a “Data Accessor”). Data Providers shall be required to sign this “Data
          Provider Agreement” prior to sharing data. Data Accessors can search for data to support
          their research areas, and that data shall be freely available to download and use once a
          Data Accessor has signed to accept the required “Data Access Agreement.” Once a Data
          Accessor consents to this agreement for the first time, they will be granted access to
          utilize the Open South system. Continued use of the system requires adherence to the terms
          and conditions stipulated in this agreement.
        </p>
        <div className="flex flex-col gap-4">
          <p className="font-semibold">
            This Data Provider Agreement sets forth the terms under which data are supplied to the
            Repository by a Data Provider.
          </p>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">DATA TO BE PROVIDED</p>
            <ol className="list-decimal list-inside">
              <li>
                <span>
                  Data Provider agrees to provide to the Repository a dataset described in the
                  Schedule attached hereto (hereinafter called “Data”).
                </span>
              </li>
              <li>
                <span>
                  The Data Provider warrants that it is the owner of the Data to be shared or that
                  it has the legal authority, necessary rights, licenses or permissions to make the
                  Data available in accordance with this Data Provider Agreement.
                </span>
              </li>
              <li>
                <span>
                  Data Provider warrants that the Data does not include any personal identifiers or
                  any information collected from human subjects, where a human subject is defined as
                  “a living individual about whom an investigator conducting research obtains (1)
                  data through intervention or interaction with the individual, or (2) identifiable
                  private information.”
                </span>
              </li>
            </ol>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">THE DATA LICENCE</p>
            <ol className="list-decimal list-inside">
              <li>
                <span>
                  The Data Provider grants to each Data Accessor a non-exclusive, worldwide, and
                  free license to the Data to:
                </span>
                <ul
                  style={{
                    listStyleType: "lower-alpha",
                  }}
                >
                  <li>
                    <span>
                      Use and disseminate the Data for the purpose of research, academic, or other
                      non-commercial purposes.
                    </span>
                  </li>
                  <li>
                    <span>
                      Share the Data with others within the Data Assessor's organization who need to
                      access the Data.
                    </span>
                  </li>
                  <li>
                    <span>
                      Make copies of, creative derivative works of, publicly display, and/or publish
                      the Data under the condition that the source of the Data be acknowledged in
                      any published work.
                    </span>
                  </li>
                </ul>
              </li>
              <li>
                <span>
                  Open South will not seek to assert any IP rights over any Data provided by the
                  Data Provider that are made available through the Repository.
                </span>
              </li>
            </ol>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">DATA PROVIDER RIGHTS AND UNDERTAKINGS</p>
            <ol className="list-decimal list-inside">
              <li>
                <span>
                  The Data Provider is free to make available, use, or publish the Data elsewhere.
                </span>
              </li>
              <li>
                <span>
                  The Data Provider will make reasonable efforts to ensure that the Data are
                  accurate at the time of its submission and will provide updated versions of the
                  Data whenever relevant and possible. The Data Provider will not be liable for any
                  omissions or inaccuracies in the Data.
                </span>
              </li>
              <li>
                <span>
                  The Data Provider will include a contact in the Schedule to assist with liaison
                  and queries with respect to the Data.
                </span>
              </li>
              <li>
                <span>
                  The Data Provider will provide the Data to Open South in open source formats but
                  preferably raw file formats. We prefer remain flexible to accommodate other
                  formats as necessary.
                </span>
              </li>
              <li>
                <span>
                  Where the Data Provider requires specific attribution text for the Data, it will
                  include that attribution in the Schedule.
                </span>
              </li>
              <li>
                <span>
                  The Data Provider warrants that, other than any restrictions stated by the Data
                  Provider in the Schedule, the Data does not contain any confidential information,
                  private/personal information, sensitive data, or include anything restricted that
                  would affect the use of the Data as permitted under this Agreement.
                </span>
              </li>
              <li>
                <span>
                  The Data Provider warrants that its supply of Data under this Agreement does not
                  contravene any relevant laws or obligations to others.
                </span>
              </li>
            </ol>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">OPEN SOUTH RIGHTS AND UNDERTAKINGS</p>
            <ol className="list-decimal list-inside">
              <li>
                <span>
                  Data shall be made available in accordance with the terms of this Agreement and
                  the terms of the Data Access Agreement, which are available at:{" "}
                  <a
                    href="https://data.opensouth.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 underline"
                  >
                    https://data.opensouth.io
                  </a>
                </span>
              </li>
              <li>
                <span>
                  Open South will include appropriate attribution to the Data Provider within the
                  Repository in alignment with the Schedule.
                </span>
              </li>
              <li>
                <span>
                  Access to Data from the Repository is only made available to users who have
                  registered and signed the Data Access Agreement, through the site maintained at{" "}
                  <a
                    href="https://data.opensouth.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 underline"
                  >
                    https://data.opensouth.io
                  </a>{" "}
                  or replacement URL as communicated to users. Open South will make reasonable
                  efforts to check the identity of all applicants prior to granting access to the
                  Repository, but will not be held responsible for any unauthorized access to the
                  site.
                </span>
              </li>
            </ol>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">LIMITATION OF LIABILITY</p>
            <ol className="list-decimal list-inside">
              <li>
                <span>
                  Data Provider agrees to defend, indemnify, and hold harmless Open South from and
                  against any and all loss, claim, damages, expenses, or costs that result or arise
                  from the acts of omissions or Data Provider, its officers, employees, agents or
                  affiliates related to the provision of Data under this Data Provider Agreement.
                </span>
              </li>
              <li>
                <span>
                  To the fullest extent permitted by applicable law, Open South disclaim any and all
                  liability to any person for any consequences, including but not limited to losses,
                  damages, costs, expenses, and any other compensation arising from this Data
                  Provider Agreement, the use of the Data or, inability to access the Repository.
                </span>
              </li>
              <li>
                <span>
                  Each party will promptly notify the other party of any actual or suspected
                  infringement of the Data that it becomes aware of. The parties will consult on an
                  appropriate course of action, however, Open South are not under any obligation to
                  take legal or other action on behalf of the Data Provider or other rights holders
                  in the event of the breach of any rights in the Data or the Data Access Agreement;
                </span>
              </li>
              <li>
                <span>
                  Termination of this Agreement does not operate to terminate any licenses already
                  granted to others under this Agreement. Those licenses continue notwithstanding
                  termination. Neither Open South will be responsible for notifying any third party
                  or recovering any Data provided to others prior to the termination of this
                  Agreement.
                </span>
              </li>
              <li>
                <span>
                  This Agreement shall be governed by federal laws of the United States and shall be
                  subject to the exclusive jurisdiction of the courts in California.
                </span>
              </li>
            </ol>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">GENERAL</p>
            <ol className="list-decimal list-inside">
              <li>
                <span>Either party may terminate this Agreement:</span>
                <ul>
                  <li>
                    <span>Either by giving 3 months' written notice to the other</span>
                  </li>
                  <li>
                    <span>
                      Or with immediate effect, if the other party has breached the Agreement and
                      that breach is not remedied within 30 days after written notice is received
                      requiring rectification of that breach;
                    </span>
                  </li>
                </ul>
              </li>
              <li>
                <span>
                  On termination of this Agreement, or following a request of the Data Provider,
                  Open South will take all reasonable steps to remove the Data from the Repository.
                </span>
              </li>
            </ol>
          </div>
        </div>
      </DialogContent>
      <DialogActions className="flex flex-col !gap-4 !items-start">
        <small>Clicking the button below means that you agree to our Terms of Use.</small>
        <Button onClick={() => setAgreeTerms(true)} size="small" className="!w-fit !ml-auto">
          I Agree to the Terms of Use
        </Button>
      </DialogActions>
    </Modal>
  );
}
