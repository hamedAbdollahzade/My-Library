import axios from "axios";
// import { useState } from "react";
import { fetchData } from "../../constants/path";
import toast from "react-hot-toast";
import { formSchema } from "../../validations/formValidation";
import { useFormik } from "formik";

const Add = () => {
  // const [book, setBook] = useState({
  //   name: "",
  //   author: "",
  //   price: null,
  //   description: "",
  //   image: "",
  // });
  // const [error, setError] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      author: "",
      price: null,
      description: "",
      image: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      try {
        const result = await axios.post(fetchData.URL_BOOKS, values);
        if (result.status == "201") {
          toast.success("The book has been successfully added ...");
          location.reload();
        } else {
          toast.error("Error");
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  // const formHandler = async (e) => {
  //   e.preventDefault();
  //   console.log(book);

  //   // const values = Object.values(book);
  //   // const valid = values.every((item) => item.length > 3);

  //   // if (valid) {
  //   try {
  //     // Because we are in the try catch , if it is not valid, the rest of the code will not be executed ...
  //     // await formSchema.validate(book);

  //     const result = await axios.post(fetchData.URL_BOOKS, book);
  //     if (result.status == "201") {
  //       toast.success("The book has been successfully added ...");
  //       setError("");
  //       setBook({
  //         name: "",
  //         author: "",
  //         price: "",
  //         description: "",
  //         image: "",
  //       });
  //       setTimeout(() => {
  //         location.reload();
  //       }, 1000);
  //     } else {
  //       toast.error("Error");
  //     }
  //   } catch (error) {
  //     setError(error.message);
  //   }
  //   // } else {
  //   //   setError(ERROR_MESSAGES.INVALID_FIELDS);
  //   // }
  // };

  return (
    <div className=" p-6 w-full flex justify-center items-center  ">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-2 w-3/4"
      >
        {/* <label htmlFor="name">name</label> */}
        <input
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder="name Book"
          type="text"
          name="name"
          className="p-2 bg-transparent border  border-red-500 "
          autoFocus
        />
        {formik.errors.name ? (
          <div className="text-red-500">{formik.errors.name}</div>
        ) : null}

        {/* <label htmlFor="author">author</label> */}
        <input
          id="author"
          value={formik.values.author}
          onChange={formik.handleChange}
          placeholder="author"
          type="text"
          name="author"
          className="p-2 bg-transparent border  border-red-500 "
        />
        {formik.errors.author ? (
          <div className="text-red-500">{formik.errors.author}</div>
        ) : null}

        {/* <label htmlFor="price">price</label> */}
        <input
          id="price"
          value={formik.values.price}
          onChange={formik.handleChange}
          placeholder="price"
          type="number"
          name="price"
          className="p-2 bg-transparent border  border-red-500 "
        />
        {formik.errors.price ? (
          <div className="text-red-500">{formik.errors.price}</div>
        ) : null}

        {/* <label htmlFor="description">description</label> */}
        <textarea
          id="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          name="description"
          placeholder="description"
          className="p-2 bg-transparent border  border-red-500 "
        ></textarea>
        {formik.errors.description ? (
          <div className="text-red-500">{formik.errors.description}</div>
        ) : null}

        {/* <label htmlFor="image">image</label> */}
        <input
          id="image"
          value={formik.values.image}
          onChange={formik.handleChange}
          placeholder="image"
          type="text"
          name="image"
          className="p-2 bg-transparent border  border-red-500 "
        />
        {formik.errors.image ? (
          <div className="text-red-500">{formik.errors.image}</div>
        ) : null}

        <button type="submit">Add Book </button>
      </form>
      {/* {error && (
        <div className="shadow-2xl shadow-red-400 text-2xl rounded-lg m-4 p-4 w-full text-center">
          {error}{" "}
        </div>
      )} */}
    </div>
  );
};

export default Add;
