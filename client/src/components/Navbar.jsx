import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div 
    className='
    Helvetica
    bg-[white] w-[100%] h-[auto] 
    flex flex-row justify-between items-center
    pl-[15px] pr-[20px]'>
      <Link to="/">
      <img src="https://raw.githubusercontent.com/UnteyoNews/News/0c79e90fe765d9a004e0bb7122b813d3824ec842/logo%20unteyo.png"
      className='w-[100px]'
      ></img>  
      </Link>
      <div className='flex flex-row gap-[10px]'>
        <Link to="/Register">Register</Link>
        <Link to="/Login">Login</Link>
      </div>
    </div>
  );
}
