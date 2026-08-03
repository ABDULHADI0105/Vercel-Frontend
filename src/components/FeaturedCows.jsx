import loginBg from "../assets/images/login-bg.jpg";


// ================= Featured Cows Section START =================

export default function FeaturedCows(){


const cows = [

{
id:"#102",
breed:"SAHIWAL CROSS",
name:"Snowfield",
desc:"A healthy Sahiwal cross cow with excellent milk production and calm nature.",
age:"3 years",
weight:"420 kg",
price:"$2,450"
},


{
id:"#104",
breed:"HOLSTEIN FRIESIAN",
name:"Duchess",
desc:"Premium dairy cow known for high milk yield and strong health.",
age:"4 years",
weight:"560 kg",
price:"$3,900"
},


{
id:"#107",
breed:"PURE SAHIWAL",
name:"Amber",
desc:"Pure Sahiwal breed with heat resistance and quality A2 milk.",
age:"5 years",
weight:"480 kg",
price:"$2,980"
}

];


return(

<section className="bg-[#FAF9F5] py-14 sm:py-20 px-4 sm:px-6 lg:px-12">


<div className="text-center max-w-3xl mx-auto mb-10">


<p className="text-[#A36A1F] tracking-[4px] uppercase text-xs font-semibold mb-3">
Our Collection
</p>


<h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#0B3B2E]">
Featured Cows
</h2>


<p className="text-gray-500 mt-4 text-sm sm:text-base">
Explore our carefully selected healthy cattle raised with quality care and natural farming practices.
</p>


</div>



<div className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-6
max-w-7xl
mx-auto
">


{
cows.map((cow,index)=>(


<div
key={index}
className="
bg-white
rounded-3xl
overflow-hidden
border
border-gray-200
group
hover:shadow-xl
transition
duration-500
"
>


<div className="relative h-64 overflow-hidden">


<img
src={loginBg}
alt={cow.name}
className="
w-full
h-full
object-cover
group-hover:scale-110
transition-transform
duration-700
"
/>


<span className="
absolute top-4 left-4
bg-white
text-[#0B3B2E]
text-xs
font-semibold
px-3 py-1
rounded-full
">
{cow.id}
</span>


<span className="
absolute top-4 right-4
bg-[#E6B84A]
px-4 py-1.5
rounded-full
text-xs
font-semibold
">
{cow.price}
</span>


</div>




<div className="p-6">


<p className="text-[#A36A1F] text-xs tracking-[3px] font-semibold mb-3">
{cow.breed}
</p>


<h3 className="text-2xl font-serif text-[#0B3B2E] mb-3">
{cow.name}
</h3>


<p className="text-gray-500 text-sm leading-6">
{cow.desc}
</p>


<hr className="my-5"/>


<div className="flex justify-between text-sm">


<div>
<p className="text-gray-400">Age</p>
<p className="font-semibold">{cow.age}</p>
</div>


<div>
<p className="text-gray-400">Weight</p>
<p className="font-semibold">{cow.weight}</p>
</div>


</div>



<button className="
mt-6
w-full
bg-[#236B36]
text-white
py-3
rounded-full
text-sm
font-semibold
hover:bg-[#0B3B2E]
transition
">
View Details →
</button>



</div>


</div>


))

}


</div>


</section>

)

}


// ================= Featured Cows Section END =================