import { Link } from "react-router-dom";

const Successful = ()=>{
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="flex flex-col items-center">
          <img
            src="https://cdn.dribbble.com/users/911154/screenshots/3332845/vfmov3.gif"
            alt=""
          />
          <Link to="/">
            {" "}
            <button className="product-add-cart-button">Shop Now</button>
          </Link>
        </div>
      </div>
    );
}
export default Successful