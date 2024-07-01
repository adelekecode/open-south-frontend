import { DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Button from "~/components/button";
import Modal from "~/components/modal";
import { useGenerateAPIKey } from "~/mutations/user";
import useAppStore from "~/store/app";

const agreement = `This Agreement ("Agreement") is entered into as of [Date], by and between [Your Company Name], located at [Your Company Address] ("Provider"), and [User's Name], residing at [User's Address] ("User").

1. Purpose
The purpose of this Agreement is to set forth the terms and conditions under which the User is granted access to and use of the datasets made available by the Provider through its open data platform.

2. Grant of License
The Provider hereby grants the User a non-exclusive, non-transferable, revocable license to access and use the datasets available on the open data platform, subject to the terms and conditions of this Agreement.

3. Use of Data
The User agrees to use the datasets solely for lawful purposes and in accordance with the following conditions:
   a. The User shall not use the data for any unlawful or malicious activities.
   b. The User shall provide attribution to the Provider when using the data.
   c. The User shall not redistribute the data without explicit permission from the Provider.

4. Data Integrity and Availability
The Provider makes no representations or warranties regarding the accuracy, completeness, or availability of the datasets. The Provider reserves the right to modify, update, or discontinue any dataset at any time without notice.

5. Intellectual Property
All intellectual property rights in the datasets remain with the Provider. The User does not acquire any rights in the datasets other than the limited license granted under this Agreement.

6. Disclaimer of Warranties
The datasets are provided "as is" without warranty of any kind, either express or implied, including, but not limited to, the implied warranties of merchantability and fitness for a particular purpose. The Provider does not warrant that the datasets will be error-free or that access will be uninterrupted.

7. Limitation of Liability
In no event shall the Provider be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with the use of or inability to use the datasets, even if the Provider has been advised of the possibility of such damages.

8. Termination
This Agreement is effective until terminated. The User may terminate this Agreement at any time by ceasing to use the datasets. The Provider may terminate this Agreement at any time, with or without cause, by providing notice to the User.

9. Governing Law
This Agreement shall be governed by and construed in accordance with the laws of [Your State/Country], without regard to its conflict of law principles.

10. Entire Agreement
This Agreement constitutes the entire agreement between the parties regarding the subject matter hereof and supersedes all prior agreements and understandings, whether written or oral, relating to such subject matter.`;

export default function AgreementModal() {
  const { setDeveloperUseAgreed } = useAppStore();

  const { mutateAsync: generateAPIKey, isLoading } = useGenerateAPIKey();

  return (
    <Modal open>
      <header>
        <DialogTitle>Developer Use Agreement</DialogTitle>
        <small>Please read the details below before using our API</small>
      </header>
      <DialogContent>
        <DialogContentText>
          <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>{agreement}</pre>
        </DialogContentText>
      </DialogContent>
      <DialogActions className="!flex !justify-end">
        <Button
          size="small"
          loading={isLoading}
          onClick={async () => {
            await generateAPIKey();
            setDeveloperUseAgreed(true);
          }}
        >
          I agree
        </Button>
      </DialogActions>
    </Modal>
  );
}
