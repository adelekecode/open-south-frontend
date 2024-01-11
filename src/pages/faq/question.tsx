import { useState } from "react";
import { IconButton } from "@mui/material";
import { FiPlus } from "react-icons/fi";
import { FaMinus } from "react-icons/fa6";

type QuestionProps = {
  question: string;
  answer: string;
};

export default function Question({ question, answer }: QuestionProps) {
  const [displayAnswer, setDisplayAnswer] = useState(false);

  return (
    <div className="flex border-b-2 border-info-700 flex-col overflow-y-hidden">
      <div className="question flex items-center justify-between p-4 largeMobile:px-0 gap-4">
        <p className="">{question}</p>
        <IconButton
          size="medium"
          onClick={() => {
            setDisplayAnswer((prev) => !prev);
          }}
        >
          {displayAnswer ? <FaMinus /> : <FiPlus />}
        </IconButton>
      </div>
      {displayAnswer && (
        <div className="answer flex items-center p-4 px-6 pt-0">
          <p className="text-sm">{answer}</p>
        </div>
      )}
    </div>
  );
}
