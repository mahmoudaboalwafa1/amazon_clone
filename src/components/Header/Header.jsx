import React, { useEffect, useState } from "react";
import { HeaderLogo, basketIcon, searchIcon } from "../../images";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./header.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../firebase";
import { SetUser } from "../../redux/actions/Action";
import { collection, onSnapshot } from "firebase/firestore";

const Header = () => {
  const dispatch = useDispatch();
  const [databaseBasket, setBasket] = useState([]);
  const dataUser = useSelector((state) => state.UserReducer.user);
  onSnapshot(collection(db, "data_basket"), (items) => {
    const dataItems = items.docs.map((item) => item.data());
    setBasket(dataItems);
  });
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) =>
      dispatch(SetUser(user))
    );

    return () => unsubscribe();
  });
  const signOutUser = () => {
    signOut(auth).then(dispatch(SetUser(null)));
  };

  return (
    <header>
      <div className="container">
        <div>
          <Link to="/">
            <img src={HeaderLogo} alt="amazon-logo" className="logo-icon" />
          </Link>
          <form>
            <input type="search" />
            <button>
              <img src={searchIcon} />
            </button>
          </form>
        </div>
        <nav>
          <ul>
            <li>Hello {dataUser ? dataUser.email : "Guest"}</li>
            <Link
              to={dataUser === null && "/signin"}
              onClick={dataUser && signOutUser}
            >
              {dataUser != null ? "Sign Out" : "Sign In"}
            </Link>
          </ul>
          <ul>
            <li>Returns</li>
            <Link>& Orders</Link>
          </ul>
          <ul>
            <li>Your</li>
            <Link>Prime</Link>
          </ul>
          <ul>
            <Link to="/basket">
              <img src={basketIcon} alt="backet-icon" />
            </Link>
            <li className="count">{databaseBasket.length}</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
