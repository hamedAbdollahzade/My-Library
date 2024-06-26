import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Cart = ({ name, author, image, price, path, bookId, children }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={path && bookId ? () => navigate(`${path}/${bookId}`) : ""}
      className=" overflow-hidden w-52  text-center hover:mx-4  shadow-black transition-all duration-500 shadow-sm hover:shadow-red-500 hover:shadow-2xl  cursor-pointer rounded-md  flex flex-col justify-between items-center "
    >
      {image && <img className="w-full h-52 p-2 " src={image}></img>}
      {name && (
        <div className=" font-extrabold   text-lg p-2 w-full">{name} </div>
      )}
      {author && (
        <div className="text-xs p-2 text-slate-400">
          {"author"} : {author}{" "}
        </div>
      )}

      {price && (
        <div className="text-sm font-extrabold p-2 text-black">
          {"price"} : {price}{" "}
        </div>
      )}

      {children}
    </div>
  );
};

export default Cart;

Cart.prototype = {
  children: PropTypes.element,
  bookId: PropTypes.number,
  path: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
  author: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};
