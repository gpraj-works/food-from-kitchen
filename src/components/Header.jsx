import React, { useState } from 'react';
import Logo from '../assets/img/logo.png';
import Avatar from '../assets/img/avatar.png';
import { motion } from 'framer-motion';
import { RiShoppingBasketFill, RiLogoutCircleRLine, RiAddFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase.config';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const Navbar = ['Home', 'Menu', 'About', 'Services'];

const Header = () => {

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
    const [isMenu, setIsMenu] = useState(false)

    const Login = async () => {
        if (!user) {
            const {
                // eslint-disable-next-line
                user: { refreshToken, providerData },
            } = await signInWithPopup(firebaseAuth, provider);
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0]
            });
            localStorage.setItem('user', JSON.stringify(providerData[0]));
        } else {
            setIsMenu(!isMenu)
        }
    };

    const Logout = () => {
        setIsMenu(false)
        localStorage.clear()
        dispatch({
            type: actionType.SET_USER,
            user: null
        })
    }

    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        })
    }

    return (
        <header className="fixed z-50 w-full md:p-5 md:px-16 p-2 bg-primary">
            {/* desktop & tablet */}
            <div className="hidden md:flex relative w-full items-center">
                <Link to={"/"} className="">
                    <img src={Logo} className="w-[105px] top-[-15px] absolute" alt="logo" />
                </Link>
                <ul className="flex items-center gap-8 ml-auto">
                    {
                        Navbar.map((Items) => {
                            return <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer' key={Items} onClick={() => setIsMenu(false)}>{Items}</li>
                        })
                    }
                </ul>
                <div className="flex items-center justify-center" onClick={showCart}>
                    <RiShoppingBasketFill className='text-textColor text-2xl ml-7 cursor-pointer' />
                    {cartItems && cartItems.length > 0 && (
                        <div className="relative -top-2 right-2 w-5 h-5 rounded-full bg-cartNumBg flex justify-center items-center">
                            <p className="text-xs text-white font-semibold">{cartItems.length}</p>
                        </div>
                    )}
                </div>
                <div className="relative">
                    <motion.img
                        whileTap={{ scale: 0.6 }}
                        src={user ? user.photoURL : Avatar}
                        className="w-8 min-w-[20px] h-8 min-h-[20px] ml-3 drop-shadow-lg rounded-full"
                        alt="user-profile"
                        onClick={Login}
                    />

                    {
                        isMenu && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0">
                                {
                                    user && user.email === "gprajutr@gmail.com" && (
                                        <Link to={"/createItem"}>
                                            <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base" onClick={() => setIsMenu(false)}>
                                                <RiAddFill /> Add Item
                                            </p>
                                        </Link>
                                    )
                                }
                                <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base" onClick={Logout}>
                                    <RiLogoutCircleRLine /> Logout
                                </p>
                            </motion.div>
                        )
                    }
                </div>
            </div>
            {/* mobile */}
            <div className='flex md:hidden w-full h-full items-center
            justify-between'>
                <div className="flex items-center justify-center" onClick={showCart}>
                    <RiShoppingBasketFill className='text-textColor text-2xl ml-7 cursor-pointer' />
                    {cartItems && cartItems.length > 0 && (
                        <div className="relative -top-2 right-2 w-5 h-5 rounded-full bg-cartNumBg flex justify-center items-center">
                            <p className="text-xs text-white font-semibold">{cartItems.length}</p>
                        </div>
                    )}
                </div>
                <Link to={"/"} className="flex\ items-center gap-2">
                    <img src={Logo} className="w-[100px] object-cover" alt="logo" />
                </Link>
                <div className="relative">
                    <motion.img
                        whileTap={{ scale: 0.6 }}
                        src={user ? user.photoURL : Avatar}
                        className="w-8 min-w-[20px] h-8 min-h-[20px] ml-3 drop-shadow-lg rounded-full"
                        alt="user-profile"
                        onClick={Login}
                    />

                    {
                        isMenu && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0">
                                {
                                    user && user.email === "gprajutr@gmail.com" && (
                                        <Link to={"/createItem"}>
                                            <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                                                <RiAddFill /> Add Item
                                            </p>
                                        </Link>
                                    )
                                }
                                <ul className="flex flex-col">
                                    {
                                        Navbar.map((Items) => {
                                            return <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer px-4 py-2' key={Items}>{Items}</li>
                                        })
                                    }
                                </ul>
                                <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-all duration-100 ease-in-out text-textColor text-base bg-slate-200" onClick={Logout}>
                                    <RiLogoutCircleRLine /> Logout
                                </p>
                            </motion.div>
                        )
                    }
                </div>
            </div>
        </header>
    )
}

export default Header;