import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  FaInstagram,
  FaTiktok,
  FaWhatsapp
} from "react-icons/fa";

import loginBg from "../assets/images/login-bg.jpg";


export default function Login() {


const navigate = useNavigate();


const [form,setForm] = useState({
    email:"",
    password:""
});



const change = (e)=>{

setForm({
    ...form,
    [e.target.name]:e.target.value
});

};



const login = async(e)=>{

e.preventDefault();


try{

const res = await API.post("/auth/login",form);



localStorage.setItem(
"token",
res.data.token
);



localStorage.setItem(
"user",
JSON.stringify(res.data.user)
);



if(res.data.user.role === "admin"){

navigate("/admin/dashboard");

}
else{

navigate("/home");

}



}
catch(err){

alert(
err.response?.data?.message || "Login Failed"
);

}


};



return(

<div

className="
min-h-screen
bg-cover
bg-center
bg-no-repeat
relative
"

style={{

backgroundImage:

`linear-gradient(
rgba(11,59,46,0.65),
rgba(11,59,46,0.65)
), url(${loginBg})`

}}

>


{/* Navbar */}

<Navbar />




<div

className="
min-h-screen
flex
items-center
justify-center
px-4
sm:px-6
lg:px-8
pt-24
pb-10
"

>


<div

className="
bg-white/95
backdrop-blur-sm
w-full
max-w-md
p-6
sm:p-8
md:p-10
rounded-3xl
shadow-2xl
border
border-gray-100
"

>


<h1

className="
text-3xl
sm:text-4xl
font-serif
text-[#0B3B2E]
mb-6
sm:mb-8
text-center
"

>

Welcome Back

</h1>





<form

onSubmit={login}

className="
space-y-4
sm:space-y-5
"

>



<input


name="email"

type="email"

placeholder="Email"

value={form.email}

onChange={change}


className="

w-full

border

border-gray-300

p-3

sm:p-3.5

rounded-lg

text-sm
sm:text-base

outline-none

focus:border-[#0B3B2E]

transition

"

/>




<input


type="password"

name="password"

placeholder="Password"

value={form.password}

onChange={change}


className="

w-full

border

border-gray-300

p-3

sm:p-3.5

rounded-lg

text-sm
sm:text-base

outline-none

focus:border-[#0B3B2E]

transition

"

/>





<button


type="submit"


className="

bg-[#0B3B2E]

text-white

w-full

py-3

rounded-lg

hover:bg-[#145642]

transition

font-semibold

text-sm
sm:text-base

"

>

Login

</button>



</form>






<p

className="

text-center

mt-5

sm:mt-6

text-sm
sm:text-base

text-gray-600

"

>

Don't have an account?


<Link

to="/register"

className="

text-[#0B3B2E]

font-semibold

ml-2

hover:underline

"

>

Register

</Link>


</p>







<div

className="

flex

justify-center

gap-5

sm:gap-6

mt-6

sm:mt-8

"

>



<a href="#">

<FaInstagram

size={24}

className="

sm:w-7
sm:h-7

text-pink-600

hover:scale-110

transition

"

/>

</a>





<a href="#">

<FaTiktok

size={24}

className="

sm:w-7
sm:h-7

text-black

hover:scale-110

transition

"

/>

</a>





<a href="#">

<FaWhatsapp

size={24}

className="

sm:w-7
sm:h-7

text-green-600

hover:scale-110

transition

"

/>

</a>



</div>



</div>



</div>


</div>


);

}