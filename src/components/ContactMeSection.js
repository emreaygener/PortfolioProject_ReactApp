import React, { useEffect } from "react";
import { Form, useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

const LandingSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "hireMe",
      comment: "",
    },
    onSubmit: (values) => {
      submit("/api/contact", values);
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      type: Yup.string(),
      comment: Yup.string()
        .required("Required")
        .min(25, "Must be 25 characters"),
    }),
  });

  useEffect(() => {
    if (response && !isLoading) {
      onOpen(response.type, response.message);
      if (response.type === "success") {
        formik.resetForm();
      }
    }
  }, [response, isLoading]);

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit(e);
            }}
          >
            <VStack spacing={4}>
              <FormControl
                isInvalid={formik.errors.firstName && formik.touched.firstName}
              >
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={(e) => {
                    formik.handleChange(e);
                    formik.touched.firstName = true;
                  }}
                />
                {formik.errors.firstName && formik.touched.firstName ? (
                  <FormErrorMessage>Required</FormErrorMessage>
                ) : null}
              </FormControl>
              <FormControl
                isInvalid={formik.errors.email && formik.touched.email}
              >
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={(e) => {
                    formik.handleChange(e);
                    formik.touched.email = true;
                  }}
                />
                {formik.errors.firstName && formik.touched.firstName ? (
                  <FormErrorMessage>Invalid Email Address</FormErrorMessage>
                ) : null}
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select id="type" name="type">
                  <option style={{ color: "#512DA8" }} value="hireMe">
                    Freelance project proposal
                  </option>
                  <option style={{ color: "#512DA8" }} value="openSource">
                    Open source consultancy session
                  </option>
                  <option style={{ color: "#512DA8" }} value="other">
                    Other
                  </option>
                </Select>
              </FormControl>
              <FormControl
                isInvalid={formik.errors.comment && formik.touched.comment}
              >
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  value={formik.values.comment}
                  onChange={(e) => {
                    formik.handleChange(e);
                    formik.touched.comment = true;
                  }}
                />
                {formik.errors.comment && formik.touched.comment ? (
                  <FormErrorMessage>
                    Minimum 25 characters required
                  </FormErrorMessage>
                ) : null}
              </FormControl>
              <Button
                type="submit"
                colorScheme="purple"
                width="full"
                isDisabled={
                  (formik.touched.email && formik.errors.email) ||
                  (formik.touched.firstName && formik.errors.firstName) ||
                  (formik.touched.comment && formik.errors.comment)
                }
                isLoading={isLoading}
              >
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
