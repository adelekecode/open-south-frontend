import { useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import Button from "~/components/button";

const choicesArr = [
  {
    label: "I wish to leave the data I created and all data related to my account",
    name: "leave_data",
  },
  {
    label: "I wish to delete all data I created and every data related to my account",
    name: "delete_data",
  },
];

export default function DeleteAccount() {
  const [choice, setChoice] = useState<string | null>(null);

  return (
    <div className="bg-white w-full border border-info-100 p-6 largeMobile:px-4 rounded-md">
      <div className="max-w-[800px] mx-auto flex flex-col gap-8">
        <p className="text-sm">
          This action will delete your account. Below, you can choose what happens to the data
          you've created:
        </p>
        <div className="flex flex-col gap-2 largeMobile:gap-4">
          {choicesArr.map(({ name, label }, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  onChange={() => {
                    setChoice(name);
                  }}
                  checked={choice === name}
                  color="primary"
                  name={name}
                  size="small"
                />
              }
              label={label}
              slotProps={{
                typography: {
                  className: "!text-xs",
                },
              }}
            />
          ))}
        </div>
        <Button disabled={!choice} size="small" className="!w-fit !ml-auto">
          Delete Account
        </Button>
      </div>
    </div>
  );
}
