// import { ReactComponent as LogoDark } from "../assets/images/logos/xtremelogo.svg";
// import { Link } from "react-router-dom";

// const Logo = () => {
//   return (
//     <Link to="/">
//        <LogoDark /> 
//     </Link>
//   );
// };

// export default Logo;
import { Link } from "react-router-dom";
import SuperLogo from "../assets/images/logos/image.png";

const Logo = () => {
  return (
    <Link to="/">
      <img src={SuperLogo} alt="logo" width="80" height="70"/>
    </Link>
  );
};

export default Logo;
