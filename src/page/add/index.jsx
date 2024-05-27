import axios from "axios";
import { useState } from "react";
import { fetchData } from "../../constants/path";
import { ERROR_MESSAGES } from "../../constants/messages";
import toast from "react-hot-toast";

const Add = () => {
  const [book, setBook] = useState({
    name: "",
    author: "",
    price: "",
    description: "",
    image: "",
  });
  const [error, setError] = useState(false);

  const formHandler = async (e) => {
    e.preventDefault();
    console.log(book);

    const values = Object.values(book);
    const valid = values.every((item) => item.length > 3);

    if (valid) {
      try {
        const result = await axios.post(fetchData.URL_BOOKS, book);
        if (result.status == "201") {
          toast.success("The book has been successfully added ...");
          setError("");
          setBook({
            name: "",
            author: "",
            price: "",
            description: "",
            image: "",
          });
          setTimeout(() => {
            location.reload();
          }, 1000);
        } else {
          toast.error("Error");
        }
      } catch (error) {
        error.message;
      }
    } else {
      setError(ERROR_MESSAGES.INVALID_FIELDS);
    }
  };

  return (
    <div className=" p-6 w-full flex justify-center items-center  ">
      <form
        onSubmit={(e) => formHandler(e)}
        className="flex flex-col gap-2 w-3/4"
      >
        {/* <label htmlFor="name">name</label> */}
        <input
          value={book.name}
          onChange={(e) =>
            setBook({ ...book, [e.target.name]: e.target.value })
          }
          placeholder="name Book"
          type="text"
          name="name"
          id="name"
          className="p-2 bg-transparent border  border-red-500 "
          autoFocus
        />

        {/* <label htmlFor="author">author</label> */}
        <input
          value={book.author}
          onChange={(e) =>
            setBook({ ...book, [e.target.name]: e.target.value })
          }
          placeholder="author"
          type="text"
          name="author"
          id="author"
          className="p-2 bg-transparent border  border-red-500 "
        />

        {/* <label htmlFor="price">price</label> */}
        <input
          value={book.price}
          onChange={(e) =>
            setBook({ ...book, [e.target.name]: e.target.value })
          }
          placeholder="price"
          type="number"
          name="price"
          id="price"
          className="p-2 bg-transparent border  border-red-500 "
        />

        {/* <label htmlFor="description">description</label> */}
        <textarea
          value={book.description}
          onChange={(e) =>
            setBook({ ...book, [e.target.name]: e.target.value })
          }
          name="description"
          id="description"
          placeholder="description"
          className="p-2 bg-transparent border  border-red-500 "
        ></textarea>

        {/* <label htmlFor="image">image</label> */}
        <input
          value={book.image}
          onChange={(e) =>
            setBook({ ...book, [e.target.name]: e.target.value })
          }
          placeholder="image"
          type="text"
          name="image"
          id="image"
          className="p-2 bg-transparent border  border-red-500 "
        />

        <button type="submit">Add Book </button>
      </form>
      {error && (
        <div className="shadow-2xl shadow-red-400 text-2xl rounded-lg m-4 p-4 w-full text-center">
          {error}{" "}
        </div>
      )}
    </div>
  );
};

export default Add;
