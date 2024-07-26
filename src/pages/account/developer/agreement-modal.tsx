import { DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";
import Button from "~/components/button";
import Modal from "~/components/modal";
import { useEditProfile } from "~/mutations/auth/profile";
import { useEnableDeveloperFeature, useGenerateAPIKey } from "~/mutations/user";
import agreement from "~/utils/data/agreements/developer";
import { notifyError } from "~/utils/toast";

export default function AgreementModal() {
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync: generateAPIKey } = useGenerateAPIKey();
  const { mutateAsync: editProfile } = useEditProfile();
  const { mutateAsync: enableDeveloperFeature } = useEnableDeveloperFeature();

  return (
    <Modal
      open
      PaperProps={{
        className: "!max-w-[600px]",
      }}
    >
      <header className="pb-3">
        <DialogTitle>Developer Use Agreement</DialogTitle>
        <small>Please read the details below before using our API</small>
      </header>
      <DialogContent
        sx={{
          paddingTop: "0px !important",
        }}
      >
        <DialogContentText>
          <pre className="whitespace-pre-wrap break-words text-sm text-black/70">{agreement}</pre>
        </DialogContentText>
      </DialogContent>
      <DialogActions className="!flex !justify-end">
        <Button
          size="small"
          loading={isLoading}
          onClick={async () => {
            try {
              setIsLoading(true);
              await enableDeveloperFeature();
              await generateAPIKey();
              await editProfile({
                meta: {
                  developer_enabled: true,
                },
              });
            } catch (error) {
              if (error instanceof Error) {
                if (error.message === "You have already accepted the agreement") {
                  await editProfile({
                    meta: {
                      developer_enabled: true,
                    },
                  });
                }
              }
              notifyError("An error occured");
            }
          }}
        >
          I agree
        </Button>
      </DialogActions>
    </Modal>
  );
}
