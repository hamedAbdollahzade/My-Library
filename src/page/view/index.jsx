import { useNavigate, useParams } from "react-router-dom";
import Cart from "../../Components/Cart";
import { useEffect, useState } from "react";
import axios from "axios";
import { PATHS, fetchData } from "../../constants/path";
import toast from "react-hot-toast";

const View = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState();
  const navigate = useNavigate();

  const deleteBookHandler = async (id) => {
    try {
      const result = await axios.delete(fetchData.URL_BOOKS_id + id);
      console.log(result);

      if (result) {
        toast.remove("Book deleted successfully");
        navigate(PATHS.HOME);
        location.reload();
      } else {
        toast.error("Error ...");
      }
    } catch (error) {
      toast.error("serverError ");

      error.message;
    }
  };

  useEffect(() => {
    const fetchBook = async () => {
      const result = await axios.get(`${fetchData.URL_BOOKS}/${bookId}`);
      setBook(result?.data);
    };
    fetchBook();
  }, [bookId]);

  return (
    <div className=" shadow-red-700  shadow-2xl m-4 p-4 flex justify-between items-center w-full rounded-2xl ">
      <div>
        <Cart
          key={book?.id}
          name={book?.name}
          author={book?.author}
          image={book?.image}
          price={book?.price}
        />
      </div>
      <div className="flex flex-col gap-4 m-4">
        <button type="button">Add to my library</button>
        <button type="button" onClick={() => deleteBookHandler(book.id)}>
          Delete
        </button>
        <button type="button">Edit</button>
        <button type="button">button</button>
      </div>
      <div className="flex-1 p-2 m-2">{book?.description}</div>
    </div>
  );
};

export default View;
