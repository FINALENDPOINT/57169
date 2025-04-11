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
      <img src="https://raw.githubusercontent.com/farhandwk/UnteyoNews/8589a38408d86d794313b5bee227616ef029c515/logo%20unteyo%20hitam.png"
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
