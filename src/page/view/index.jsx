import { useParams } from "react-router-dom";
import Cart from "../../Components/Cart";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchData } from "../../constants/path";

const View = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState();

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
        <button type="button">button</button>
        <button type="button">button</button>
        <button type="button">button</button>
      </div>
      <div className="flex-1 p-2 m-2">{book?.description}</div>
    </div>
  );
};

export default View;
