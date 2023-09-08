import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./form.module.css";
import axios from "axios";
import { useState } from "react";
import CustomModal from "../customModal/CustomModal";

const Form = () => {
  const [postalCodeErrorMessage, setPostalCodeErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    // reset();
  };

  type FormData = {
    applicant: string;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    postalCode: string;
    city: string;
  };

  const schema: ZodType<FormData> = z.object({
    applicant: z.string(),
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(30)
      .trim(),
    lastName: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(30)
      .trim(),
    email: z
      .string()
      .email({ message: "Please enter a valid email" })
      .min(5)
      .trim(),
    phone: z.string().refine((value) => /^[0-9]{8}$/.test(value), {
      message: "Please enter a valid phone number",
    }),
    address: z
      .string()
      .min(2, { message: "Must be 2 characters or longer" })
      .trim(),
    postalCode: z
      .string()
      .min(4, { message: "Postal code must be 4 numbers" })
      .max(9999, { message: "Postal code must be 4 numbers" })
      .trim(),
    city: z
      .string()
      .min(2, { message: "Must be 2 characters or longer" })
      .max(50)
      .trim(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submitData = async (data: FormData) => {
    console.log("Entering submitData");
    try {
      const response = await axios.post(
        // "https://case.nettbureau.no/submit",
        "http://localhost:8080/api/addData",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message === "Data has been successfully inserted") {
        console.log("Response data:", response);
        reset();
        setIsModalOpen(true);
      } else {
        console.log(response);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("An error occurred:", error.response.data.error);

      if (error.response.data.error === "Invalid postal code") {
        setPostalCodeErrorMessage("Invalid postal code");
      } else {
        setPostalCodeErrorMessage("");
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(submitData)}
        className={styles.form}
        method="post"
      >
        <input type="hidden" value={"Renate"} {...register("applicant")} />
        <label htmlFor="">Name:*</label>
        <input type="text" {...register("name")} />
        {errors.name && <span>{errors.name.message}</span>}
        <label htmlFor="">Lastname:*</label>
        <input type="text" {...register("lastName")} />
        {errors.lastName && <span>{errors.lastName.message}</span>}
        <label htmlFor="">Email*:</label>
        <input type="text" {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}
        <label htmlFor="">Phone:*</label>
        <input type="text" {...register("phone")} />
        {errors.phone && <span>{errors.phone.message}</span>}
        <label htmlFor="">Address:*</label>
        <input type="text" {...register("address")} />
        {errors.address && <span>{errors.address.message}</span>}
        <label htmlFor="">Postal Code:*</label>
        <input
          type="text"
          {...register("postalCode", { pattern: /^[0-9]{4}$/ })}
          // onChange={() => setPostalCodeErrorMessage("")}
        />
        {errors.postalCode && <span>{errors.postalCode.message}</span>}
        {postalCodeErrorMessage && <span>{postalCodeErrorMessage}</span>}
        <label htmlFor="">City:*</label>
        <input type="text" {...register("city")} />
        {errors.city && <span>{errors.city.message}</span>}
        <button type="submit">Submit</button>
      </form>

      <div className={styles[isModalOpen ? `show-modal` : "modal-container"]}>
        <CustomModal
          onClose={() => {
            closeModal();
            reset();
          }}
        />
      </div>
    </div>
  );
};

export default Form;
