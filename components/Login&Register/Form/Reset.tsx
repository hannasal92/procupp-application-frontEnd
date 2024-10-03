import s from "./form.module.scss";
import Button from "@/components/Common/Button";
import { Arrow } from "@/components/Header/Icons";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";

const Reset = () => {
  const { push, query } = useRouter();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      try {
        if (values.password === values.confirmPassword) {
          let response = await axios.post(
            `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER}/api/users/reset-password`,
            { token: query.token, password: values.password }
          );
          formik.resetForm();
          toast.success("Password Reset Successfully", { theme: "dark" });
          push("/login");
        } else {
          toast.error("Password not match..!", { theme: "dark" });
        }
      } catch (error) {
        toast.error("Something is wrong!!", { theme: "dark" });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={s.form}>
      <div className={s.form_box}>
        <input
          name="password"
          type="password"
          placeholder="Password*"
          required
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password*"
          required
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
        />
      </div>
      <Button type="submit">
        Reset Password <Arrow />
      </Button>
    </form>
  );
};

export default Reset;
