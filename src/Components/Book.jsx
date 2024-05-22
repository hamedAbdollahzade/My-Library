import PropTypes from "prop-types";
import Spinner from "../assets/Spinner.gif";

const Book = ({ name, author, image, price, children }) => {
  return (
    <div className=" overflow-hidden w-52  text-center hover:mx-4  shadow-black transition-all duration-500 shadow-sm hover:shadow-red-500 hover:shadow-2xl  cursor-pointer rounded-md  flex flex-col justify-between items-center ">
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

export default Book;

Book.prototype = {
  children: PropTypes.element,
  price: PropTypes.number,
  name: PropTypes.string,
  author: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};
