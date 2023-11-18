import { logout } from '@/reduxSlices/authSlice'
import { createSelector } from '@reduxjs/toolkit'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const authSelector = (state) => state.auth;
const userInfoSelector = createSelector(authSelector, (auth) => auth.userInfo);

const Header = () => {

  const navigate = useRouter()
  const [loggedin, setLoggedin] = useState(false)
  const dispatch =useDispatch()

  // const {  userInfo } = useSelector((state) => state.auth)
  const userInfo = useSelector(userInfoSelector);

  // const userToken = localStorage.getItem('userToken');
  const userToken = useSelector(userInfoSelector);

  useEffect(()=>{
    if(userInfo){
      setLoggedin(true);
    }else{
      setLoggedin(false);
    }
  })

  
  return (
    <div className="navbar bg-white">
    <div className="flex-1">
      <a className="btn btn-ghost normal-case text-xl text-black" onClick={()=>{navigate.push("/")}}>2B-STORE</a>
    </div>
    <div className="flex-none gap-2">
      {/* <div className="form-control">
        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
      </div> */}
      <div className="dropdown dropdown-end">
        {loggedin ?  
        <>      
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full bg-red-400 text-xl">
            {/* <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
            {userToken && userInfo.email[0]}
          </div>
        </label>
        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
          <li>
            <a className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><Link href={`/`} onClick={()=>{dispatch(logout())}}>Logout</Link></li>
        </ul>
        </>
        :  <Link href={`/login`}><button className="btn glass btn-outline btn-primary w-64 place-self-center m-5">Sign in</button></Link>
    }
      </div>
    </div>
  </div>
  )
}

export default Header