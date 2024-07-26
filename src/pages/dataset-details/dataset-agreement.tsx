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
      <header>
        <DialogTitle>Data Use Agreement</DialogTitle>
        <small>
          For use of data from the Open South Data Project by researchers in the Global South
        </small>
      </header>
      <DialogContent className="text-sm flex flex-col gap-4">
        <p>
          The Open South Data Project (“Repository”) is an online data platform powered and
          developed by EAAMO (Equity and Access in Algorithms, Mechanisms, and Optimization) to
          provide a single point where researchers, policy-makers, students, data practitioners,
          non-governmental organizations, and related entities in the Global South can access,
          share, and freely explore non-sensitive, fully anonymized research datasets.
        </p>
        <p>
          The Repository provides a place where Global South researchers can access existing data
          that is available in the Repository (as a “Data Accessor”). Data Accessors can search for
          data to support their research areas, and that data shall be freely available to download
          and use once a Data Accessor has signed this “Data Use Agreement.” Once a Data Accessor
          consents to this agreement for the first time, they will be granted access to utilize the
          Open South system. Continued use of the system requires adherence to the terms and
          conditions stipulated in this agreement.
        </p>
        <p>
          This Data Use Agreement sets forth the terms under which data from the Repository may be
          accessed and used by a Data Accessor.
        </p>
        <div className="flex flex-col gap-3">
          <p className="font-semibold">DATA TO BE ACCESSED</p>
          <p>
            Data Accessor agrees to access the dataset(s) described in the Schedule attached hereto
            (hereinafter called “Data”).
          </p>
          <p>
            The Data Accessor acknowledges that the Data is provided by Data Providers who warrant
            that the Data does not include any personal identifiers or any information collected
            from human subjects.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-semibold">TERMS OF DATA USE</p>
          <p>
            The Data Accessor is granted a non-exclusive, worldwide, and free license to the Data
            to:
          </p>
          <ul className="list-disc list-inside">
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
                Make copies of, create derivative works of, publicly display, and/or publish the
                Data under the condition that the source of the Data be acknowledged in any
                published work.
              </span>
            </li>
          </ul>
          <p>
            Open South does not seek to assert any IP rights over any Data provided by the Data
            Provider that are made available through the Repository.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-semibold">DATA ACCESSOR RIGHTS AND OBLIGATIONS</p>
          <p>The Data Accessor agrees to:</p>
          <ul className="list-disc list-inside">
            <li>
              <span>Use the Data in accordance with the terms of this Agreement</span>
            </li>
            <li>
              <span>Acknowledge the source of the Data in any published work.</span>
            </li>
            <li>
              <span>
                Not attempt to re-identify any anonymized data or use the Data in any way that could
                lead to the identification of individuals.
              </span>
            </li>
          </ul>
          <p>
            The Data Accessor may use the Data for any research, academic, or other non-commercial
            purposes and share the Data with others within their organization who need to access the
            Data.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-semibold">OPEN SOUTH RIGHTS AND OBLIGATIONS</p>
          <p>Open South will:</p>
          <ul className="list-disc list-inside">
            <li>
              <span>
                Include appropriate attribution to the Data Provider within the Repository.
              </span>
            </li>
            <li>
              <span>
                Make the Data available in accordance with the terms of this Agreement and the terms
                of the Data Provider Agreement, which are available at:{" "}
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
                Make reasonable efforts to check the identity of all applicants prior to granting
                access to the Repository.
              </span>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-semibold">LIMITATION OF LIABILITY</p>
          <p>
            To the fullest extent permitted by applicable law, Open South disclaims any and all
            liability to any person for any consequences, including but not limited to losses,
            damages, costs, expenses, and any other compensation arising from this Data Use
            Agreement or the use of the Data.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-semibold">TERMINATION</p>
          <p>Either party may terminate this Agreement:</p>
          <ul className="list-disc list-inside">
            <li>
              <span>By giving 3 months' written notice to the other.</span>
            </li>
            <li>
              <span>
                With immediate effect, if the other party has breached the Agreement and that breach
                is not remedied within 30 days after written notice is received requiring
                rectification of that breach.
              </span>
            </li>
          </ul>
          <p>
            On termination of this Agreement, or following a request of the Data Provider, Open
            South will take all reasonable steps to remove the Data from the Repository.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-semibold">GENERAL</p>
          <p>
            This Agreement shall be governed by federal laws of the United States and shall be
            subject to the exclusive jurisdiction of the courts in California.
          </p>
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
