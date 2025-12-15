"use client"
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/context/authContext";

export default function courses() {
    const [courses, setCourses] = useState([]);
    const { user } = useAuth();
    useEffect(() => {
        const getCourses = async () => {
            const res = await fetch("/api/courses");
            const data = await res.json();
            setCourses(data);
            console.log(data);
        }
        getCourses();
    }, []);
    return (
        <div className="min-h-[90vh] w-full">
            <h1 className="text-center text-primary text-2xl font-[ar3] font-black mb-5 mt-3 md:text-4xl">الدروس</h1>
            <div className="grid w-[95%] m-auto">
                <div className="collapse collapse-arrow bg-base-200 border-base-300 border">
  <input type="checkbox" />
  <div className="collapse-title font-semibold text-primary text-center direction-rtl md:text-xl font-[ar3]">دروس الفقه</div>
  <div className="collapse-content grid md:grid-cols-5 justify-center md:justify-around gap-5 text-md text-base-content">
    <div className="p-5 bg-base-100 rounded-2xl shadow-lg text-center cursor-pointer duration-300 hover:scale-110">
        <span className="text-center text-primary font-[ar3] cursor-pointer">فقه الصلاة</span>
    </div>
    <div className="p-5 bg-base-100 rounded-2xl shadow-lg text-center cursor-pointer duration-300 hover:scale-110">
        <span className="text-center text-primary font-[ar3] cursor-pointer">فقه الصلاة</span>
    </div>
    <div className="p-5 bg-base-100 rounded-2xl shadow-lg text-center cursor-pointer duration-300 hover:scale-110">
        <span className="text-center text-primary font-[ar3] cursor-pointer">فقه الصلاة</span>
    </div>
    <div className="p-5 bg-base-100 rounded-2xl shadow-lg text-center cursor-pointer duration-300 hover:scale-110">
        <span className="text-center text-primary font-[ar3] cursor-pointer">فقه الصلاة</span>
    </div>
    <div className="p-5 bg-base-100 rounded-2xl shadow-lg text-center cursor-pointer duration-300 hover:scale-105 hover:bg-base-300">
        <span className="text-center text-primary font-[ar3] cursor-pointer">فقه الصلاة</span>
    </div>
    <div className="p-5 bg-base-100 rounded-2xl shadow-lg text-center cursor-pointer duration-300 hover:scale-105 hover:bg-base-300">
        <span className="text-center text-primary font-[ar3] cursor-pointer">فقه الصلاة</span>
    </div>
  </div>
</div>        
         </div>       
         {user.role === "admin" && (
         <div className="fab">
  <button className="btn btn-lg btn-circle btn-primary" onClick={()=>document.getElementById('editCoursesModal').showModal()}><FontAwesomeIcon icon={faPlus}/></button>
</div>
                )}


<dialog id="editCoursesModal" className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg text-center">إضافة درس</h3>
<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-[95%] my-3 m-auto border p-4">
  <legend className="fieldset-legend">معلومات الدرس</legend>

  <label className="label">Name</label>
  <input type="text" className="input input-bordered w-[100%]" placeholder="name" />

  <label className="label">Link</label>
  <input type="text" className="input input-bordered w-[100%]" placeholder="link" />

  <label className="label">Description</label>
  <input type="text" className="input input-bordered w-[100%]" placeholder="description" />

  <label className="label">Catagory</label>
  <input type="text" className="input input-bordered w-[100%]" placeholder="catagory" />

  <label className="label">Section</label>
  <input type="text" className="input input-bordered w-[100%]" placeholder="section" />
</fieldset>
    <button className="btn btn-primary mr-4">حفظ</button>
    <button className="btn btn-ghost" onClick={()=>document.getElementById('editCoursesModal').close()}>إلغاء</button>
  </div>
</dialog>

        </div>
    );
}