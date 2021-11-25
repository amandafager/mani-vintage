import Head from "next/head";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "@styles/Form.module.css";
import RadioField from "@components/RadioField";
import InputField from "@components/InputField";
import Modal from "@components/Modal";
import Button from "@components/Button";
import PageWrapper from "@components/PageWrapper";
import { getNavigation } from "@lib/queries";
import { sanityClient } from "@lib/sanity.server";

import { categories, sizes, needInTime, measures } from "@utils/data";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function Form() {
  const [selectedCategory, setSelectedCategory] = useState("Other");
  const [selectedSize, setSelectedSize] = useState("All sizes");
  const [selectedTime, setSelectedTime] = useState("In no hurry");
  const [hasDescription, setHasDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const schema = yup
    .object({
      description: yup.string().required("Description is required"),
      email: yup
        .string()
        .required("Email is required")
        .email("Email is invalid"),
      acceptTerms: yup.bool().oneOf([true], "Accept Ts & Cs is required"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange" | "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    console.log("Sending");
    setSubmitted(false);

    fetch("/api/looking-for", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log("Response received");
      console.log("Fetch: ", res);

      if (res.status === 200) {
        console.log("Response succeeded!");
        setSubmitted(true);
        reset();
      }
    });
  };

  return (
    <PageWrapper addStyles={styles.center}>
      <Head>
        <title>Looking for? - MANI Vintage</title>
      </Head>

      {submitted && (
        <Modal
          styles={styles}
          title='Succsess!'
          message='You request has been sent.'
        />
      )}

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.intro}>
          <h1 className={styles.heading}>Looking for something special?</h1>
          <p>Welcome to send us your special request.</p>
        </div>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>I'm searching for</legend>
          {categories.map((categoryOption, index) => (
            <RadioField
              key={index}
              styles={styles}
              value={categoryOption}
              label={categoryOption}
              registerLabel={"category"}
              register={register}
              checked={categoryOption === selectedCategory}
              onClick={(e) => {
                setSelectedCategory(e.target.value);
              }}
            />
          ))}
        </fieldset>
        <div className={styles.textareaFormGroup}>
          <textarea
            id='description'
            className={styles.textarea}
            {...register("description")}
            onChange={(e) => {
              setHasDescription(e.target.value);
            }}
          />
          <label
            className={`${styles.descriptionLabel}  ${
              hasDescription ? styles.hasDescription : ""
            }`}
            htmlFor='description'
          >
            Description: decade, style, color
            <span> (required)</span>
          </label>
          <p className={styles.errorMessages}>{errors.description?.message}</p>
        </div>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>In size</legend>
          {sizes.map((sizeOption, index) => (
            <RadioField
              key={index}
              styles={styles}
              value={sizeOption}
              label={sizeOption}
              registerLabel={"size"}
              register={register}
              checked={sizeOption === selectedSize}
              onClick={(e) => {
                setSelectedSize(e.target.value);
              }}
            />
          ))}
        </fieldset>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>And my measurements are</legend>
          {measures.map((measure, index) => (
            <InputField
              key={index}
              styles={styles}
              label={measure}
              registerLabel={measure.toLowerCase()}
              register={register}
              required
              type='number'
              placeholder='cm'
            />
          ))}
        </fieldset>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>I need this</legend>
          {needInTime.map((timeOption, index) => (
            <RadioField
              key={index}
              styles={styles}
              value={timeOption}
              label={timeOption}
              registerLabel={"time"}
              register={register}
              checked={timeOption === selectedTime}
              onClick={(e) => {
                setSelectedTime(e.target.value);
              }}
            />
          ))}
        </fieldset>

        <h2 className={styles.emailHeading}>
          Please send me an e-mail when you have found it
        </h2>
        <div className={styles.emailWrapper}>
          <InputField
            styles={styles}
            label={"Email"}
            registerLabel={"email"}
            register={register}
            required
            type='email'
            error={errors.email?.message}
          />
        </div>

        <Button text='Send request' type='submit' />
      </form>
    </PageWrapper>
  );
}

export async function getStaticProps() {
  const navigation = await sanityClient.fetch(getNavigation);

  return {
    props: {
      navigation,
    },
  };
}
