import s from "./form.module.scss";
import Button from "@/components/Common/Button";
import { Arrow } from "@/components/Header/Icons";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";

const Forget = () => {
  const { push } = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      try {
        let response = await axios.post(
          `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER}/api/users/forgot-password`,
          { ...values }
        );
        formik.resetForm();
        toast.success(
          `Check your email we send reset link to ${values.email}`,
          { theme: "dark" }
        );
        // push("/login");
      } catch (error) {
        toast.error("Something is wrong!!", { theme: "dark" });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={s.form}>
      <div className={s.form_box}>
        <input
          name="email"
          type="email"
          placeholder="Email*"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
      </div>
      <Button type="submit">
        Reset Password <Arrow />
      </Button>
    </form>
  );
};

export default Forget;
