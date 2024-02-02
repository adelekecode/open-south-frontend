import { useEffect, useState } from "react";
import axios from "axios";
import useAppStore from "~/store/app";
import { useImageUpload } from "~/mutations/auth/profile";
import { useCurrentUser } from "~/queries/user";
import Modal from "./modal";
import Button from "./button";
import { notifyError, notifySuccess } from "~/utils/toast";

// Avatars
import Lion from "~/assets/images/avatars/lion.png";
import Deer from "~/assets/images/avatars/deer.png";
import Bear from "~/assets/images/avatars/bear.png";
import Koala from "~/assets/images/avatars/koala.png";
import Elephant from "~/assets/images/avatars/elephant.png";
import Butterfly from "~/assets/images/avatars/butterfly.png";

const avatarArr = [Lion, Deer, Bear, Koala, Elephant, Butterfly];

function getRandomAvatar(): string {
  const arr: string[] = avatarArr;
  const randomIndex: number = Math.floor(Math.random() * arr.length);
  const randomValue: string = arr[randomIndex];

  return randomValue;
}

export default function SelectAvatarModal() {
  const { displaySelectAvatarModal: open, setDisplaySelectAvatarModal: setOpen } = useAppStore();

  const baseURL = `${window.location.protocol}//${window.location.host}`;

  const [randomAvatar, setRandomAvatar] = useState(getRandomAvatar());
  const [loading, setLoading] = useState(false);

  const uploadProfileImage = useImageUpload();

  const { data: currentUser } = useCurrentUser(undefined, {
    enabled: false,
  });

  useEffect(() => {
    if (currentUser) {
      if (currentUser.image_url === null) {
        setOpen(true);
      }
    }
  }, [currentUser, setOpen]);

  function onClose() {
    setOpen(false);
  }

  return (
    <Modal
      muiModal={{
        open,
      }}
      displayExitButton={false}
      innerContainer={{
        className: "pt-[2rem]",
      }}
    >
      <div className="flex flex-col gap-6 w-full">
        <h1 className="text-xl font-semibold">Select Avatar</h1>
        <div className="flex flex-col gap-4 items-center">
          <figure
            id="picture"
            className="w-36 flex items-center justify-center border border-info-300 rounded-md outline-0 aspect-square overflow-hidden p-1"
          >
            <img
              src={randomAvatar}
              alt="profile picture"
              className="w-full h-full object-contain"
            />
          </figure>
          <div className="grid grid-cols-3 gap-4 p-4 border border-info-300 rounded w-full overflow-y-auto">
            {avatarArr.map((item, index) => (
              <button
                key={index + 1}
                id="picture"
                className={`w-full flex items-center justify-center border border-info-200 rounded outline-0 aspect-square overflow-hidden p-1 ${
                  randomAvatar === item && "border-primary-600 bg-secondary-50"
                }`}
                onClick={() => {
                  setRandomAvatar(item);
                }}
              >
                <img src={item} alt="profile picture" className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>
        <Button
          className="!py-3"
          onClick={async () => {
            try {
              setLoading(true);
              const { data } = await axios.get(`${baseURL}${randomAvatar}`, {
                responseType: "blob",
              });
              const blob = new Blob([data], { type: "image/png" });
              const file = new File([blob], "avatar.png", { lastModified: Date.now() });

              const response = await uploadProfileImage.mutateAsync({ image: file });

              if (response) {
                notifySuccess("Avatar successfully created");
                onClose();
              }
            } catch (error) {
              notifyError("Error uploading profile image");
            } finally {
              setLoading(false);
            }
          }}
          loading={loading}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
}
