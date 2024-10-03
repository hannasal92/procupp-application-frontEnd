import { useCallback, useEffect, useState } from "react";
import s from "./profile.module.scss";
import { useDropzone } from "react-dropzone";
import { Drop } from "./Icons";
import Image from "next/image";
import Button from "../Common/Button";
import Input from "./Input";
import axios from "axios";
import { useSnapshot } from "valtio";
import { store } from "@/store";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

const Personal = () => {
  const t = useTranslations("Profile.Personal");
  const tb = useTranslations("Profile.Buttons");
  const { user } = useSnapshot(store);

  const { push } = useRouter();

  const [password, setPassword] = useState<string>("");

  const [preview, setPreview] = useState<ArrayBuffer | string | null>(null);

  const onDrop: any = useCallback(async (acceptedFiles: FileList) => {
    try {
      const file = new FileReader();

      file.onload = () => {
        setPreview(file.result);
      };

      file.readAsDataURL(acceptedFiles[0]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
    maxSize: 6000000,
  });

  const handeSave = async () => {
    try {
      if (acceptedFiles) {
        const formdata = new FormData();
        formdata.append("file", acceptedFiles[0]);
        formdata.append("alt", `${user?.name}-profile`);

        //checking is profile

        if (user?.profile) {
          //profile update

          await axios({
            method: "patch",
            url: `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER!}/api/media/${
              user?.profile.id
            }`,
            data: formdata,
          });
          if (user.pictureURL) {
            let response = await axios.get(
              `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER}/api/googleUsers/${user.id}`
            );
            store.user = response.data;
          } else {
            let response = await axios.get(
              `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER}/api/users/${user.id}`
            );
            store.user = response.data;
          }
        } else {
          //create new media and add to profile
          if (formdata.append.length > 0) {
            let uploadImage = await axios({
              method: "post",
              url: `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER!}/api/media`,
              data: formdata,
            });
            if (user?.pictureURL) {
              let res = await axios({
                method: "patch",
                url: `${process.env
                  .NEXT_PUBLIC_PAYLOAD_SERVER!}/api/googleUsers/${user?.id}`,
                data: { profile: uploadImage.data.doc.id },
              });
              store.user = res.data.doc;
            } else {
              let res = await axios({
                method: "patch",
                url: `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER!}/api/users/${
                  user?.id
                }`,
                data: { profile: uploadImage.data.doc.id },
              });
              store.user = res.data.doc;
            }
          }
        }
      }

      if (password) {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER!}/api/users/${user?.id}`,
          { password }
        );
      }
      toast.success("Profile Saved", { theme: "dark" });
      push("/profile");
    } catch (error) {
      toast.error("Something is wrong...!", { theme: "dark" });
    }
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className={s.details} {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={s.details_icon}>
          <Drop />
        </div>
        <div className={s.details_preview}>
          <div className={s.details_preview_head}>
            <Image
              src={
                preview
                  ? (preview as string)
                  : user?.profile
                  ? `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER}${user.profile.url}`
                  : user?.pictureURL
                  ? user.pictureURL
                  : "/profile-placeholder.jpg"
              }
              height={300}
              width={300}
              alt="profile"
            />
            {acceptedFiles[0] ? (
              <p>{t("DropPicture.Uplaod-Tag")}</p>
            ) : (
              <p>{t("DropPicture.Tag")}</p>
            )}
          </div>
          <div className={s.details_preview_body}>
            <div>
              <h2>{t("DropPicture.Heading")}</h2>
              <p>{t("DropPicture.Paragraph")}</p>
            </div>
            <Button varients="secondary">{t("DropPicture.Button")}</Button>
          </div>
        </div>
      </div>
      <div className={s.detailForm}>
        <Input
          id="personal-name"
          type="text"
          name="name"
          placeholder={user?.name}
        >
          {t("Inputs.Name")}
        </Input>
        <Input
          id="personal-email"
          type="email"
          name="email"
          placeholder={user?.email}
        >
          {t("Inputs.Email")}
        </Input>
        <Input
          onChange={handlePassword}
          value={password}
          id="personal-password"
          type="password"
          name="password"
          placeholder="********"
          isEdit
          isEdittext={tb("Change-Password")}
        >
          {t("Inputs.Password")}
        </Input>
        {/* <div className={s.checkbox}>
          <input type="checkbox" id="react-checkbox-privacy" />
          <div className={s.checkbox_circle}>
            <div />
          </div>
          <label htmlFor="react-checkbox-privacy">
            Send you promotional mails in your inbox. Don&apos;t worry we
            won&apos;t spam your inbox
          </label>
        </div> */}
        <div className={s.detailButtonGroup}>
          <Button varients="secondary">{tb("Back")}</Button>
          <Button onClick={() => handeSave()}>{tb("Save")}</Button>
        </div>
      </div>
    </>
  );
};

export default Personal;
