import { useCallback, useEffect, useState } from "react";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
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
import Bunny from "~/assets/images/avatars/bunny.png";
import Panda from "~/assets/images/avatars/panda.png";
import Bee from "~/assets/images/avatars/bee.png";
import Dolphin from "~/assets/images/avatars/dolphin.png";
import Ladybug from "~/assets/images/avatars/ladybug.png";
import Octopus from "~/assets/images/avatars/octopus.png";
import Owl from "~/assets/images/avatars/owl.png";
import Penguin from "~/assets/images/avatars/penguin.png";
import Puppy from "~/assets/images/avatars/puppy.png";
import Sloth from "~/assets/images/avatars/sloth.png";

const avatarArr = [
  Lion,
  Deer,
  Bear,
  Koala,
  Elephant,
  Butterfly,
  Bunny,
  Panda,
  Bee,
  Dolphin,
  Ladybug,
  Octopus,
  Owl,
  Penguin,
  Puppy,
  Sloth,
];

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

  const { mutateAsync: uploadProfileImage } = useImageUpload();

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

  const onClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleSave = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseURL}${randomAvatar}`, {
        responseType: "blob",
      });
      const blob = new Blob([data], { type: "image/png" });
      const file = new File([blob], `avatar-${Date.now()}.png`, {
        lastModified: Date.now(),
      });

      const response = await uploadProfileImage({ image: file });

      if (response) {
        notifySuccess("Avatar successfully created");
        onClose();
      }
    } catch (error) {
      notifyError("Error uploading profile image");
    } finally {
      setLoading(false);
    }
  }, [baseURL, onClose, randomAvatar, uploadProfileImage]);

  return (
    <Modal open={open}>
      <DialogTitle>Select Avatar</DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-4 items-center">
          <figure
            id="picture"
            className="w-40 flex items-center justify-center border border-info-300 rounded-md outline-0 aspect-square overflow-hidden p-1"
          >
            <img
              src={randomAvatar}
              alt="profile picture"
              className="w-full h-full object-contain"
            />
          </figure>
          <div className="grid grid-cols-4 gap-4 p-4 border border-info-300 rounded w-full overflow-y-auto">
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
      </DialogContent>
      <DialogActions>
        <Button className="!py-3" size="small" onClick={handleSave} loading={loading}>
          Save
        </Button>
      </DialogActions>
    </Modal>
  );
}
