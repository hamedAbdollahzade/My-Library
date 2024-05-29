import * as Yup from "yup";

export const formSchema = Yup.object({
  name: Yup.string().required("name is required !"),
  author: Yup.string().required("auther is required !"),
  price: Yup.number().required("price is required !"),
  description: Yup.string().required("description is required !"),
  image: Yup.string().url("url not valid").required("image is required"),
});
// Yup is Promise Based and Us must used Async function ...
