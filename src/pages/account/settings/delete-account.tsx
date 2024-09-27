import { useCallback, useState } from "react";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import Button from "~/components/button";
import usePrompt from "~/hooks/usePrompt";
import { useDeleteAccount } from "~/mutations/auth/profile";

const choicesArr = [
  {
    label: "I wish to retain the data I created and all data related to my account.",
    name: "leave_data",
  },
  {
    label: "I wish to delete all the data I created and any data related to my account.",
    name: "delete_data",
  },
];

export default function DeleteAccount() {
  const [choice, setChoice] = useState<"leave_data" | "delete_data" | null>(null);

  const { mutateAsync: deleteAccount, isLoading } = useDeleteAccount();

  const queryClient = useQueryClient();

  const currentUser = queryClient.getQueryData<CurrentUser>(["/auth/users/me/"]);

  const prompt = usePrompt();

  const handleDelete = useCallback(async () => {
    const confirmed = await prompt({
      title: "Please confirm",
      description: "Are you sure you want to delete your account?",
      isLoading,
      confirmationText: `${currentUser?.first_name?.toLowerCase()}-${currentUser?.last_name?.toLowerCase()}`,
    });

    if (confirmed && choice) {
      await deleteAccount({ choice });
    }
  }, [choice, currentUser?.first_name, currentUser?.last_name, deleteAccount, isLoading, prompt]);

  return (
    <div className="bg-white w-full border border-info-100 p-6 largeMobile:px-4 rounded-md">
      <div className="max-w-[800px] mx-auto flex flex-col gap-8">
        <p className="text-sm">
          This action will delete your account. Below, you can choose what happens to the data
          you've created:
        </p>
        <div className="flex flex-col gap-2 largeMobile:gap-4">
          <FormControl>
            <RadioGroup
              onChange={(e) => {
                setChoice(e.target.value as typeof choice);
              }}
            >
              {choicesArr.map(({ name, label }, index) => (
                <FormControlLabel
                  key={index}
                  value={name}
                  control={<Radio size="small" />}
                  label={label}
                  slotProps={{
                    typography: {
                      className: "!text-xs",
                    },
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
        <Button disabled={!choice} onClick={handleDelete} size="small" className="!w-fit !ml-auto">
          Delete Account
        </Button>
      </div>
    </div>
  );
}
