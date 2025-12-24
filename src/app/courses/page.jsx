"use client"
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/context/authContext";
import ReactPlayer from 'react-player'
import Loader from "@/components/loader";
// Render a YouTube video player
export default function courses() {
  const playerRef = useRef()
  const [catagories, setCatagories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState([]);
  const [courses, setCourses] = useState([]);
  const [currentLink, setCurrentLink] = useState(null);
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    document.getElementById("showVideoModal")?.close();
  };
  useEffect(() => {
    const loadAll = async () => {
    setLoading(true)
      await Promise.all([
        getCatagories(),
        getSections(),
        getCourses()
      ])
    setLoading(false)
    }
    loadAll()
  }, [])


  const getCourses = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/courses')
      const data = await res.json()
            console.log(data);

      setCourses(data.courses)
      setLoading(false)
    }
    catch (error) {
      setLoading(false)
      console.error(error)
    }
  }
  const getSections = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/courses/section')
      const data = await res.json()
      setSections(data)
      setLoading(false)
    }
    catch (error) {
      setLoading(false)
      console.error(error)
    }
  }
  const getCatagories = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/courses/catagory')
      const data = await res.json()
      setCatagories(data)
      setLoading(false)
    }
    catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  useEffect(() => {
    if (open && playerRef.current && currentLink) {
      console.log(currentLink);
    }
  }, [open, currentLink]);


  const showVideo = (link) => {
    setCurrentLink(link)
    setOpen(true)
    requestAnimationFrame(() => {
      document.getElementById('showVideoModal')?.showModal()
    })
  }



    return (
        <div className="min-h-[90vh] w-full">
            <h1 className="text-center text-primary text-2xl font-[ar3] font-black mb-5 mt-3 md:text-4xl">الدروس</h1>
        <div className="grid w-[95%] gap-3 m-auto">

          {loading ? (
            <div className="w-full h-[90vh] flex items-center justify-center">
              <Loader />
            </div>
          ) : null}
          {catagories && catagories.map((cat, i) => {
            return (
              <div key={i} className="collapse collapse-arrow bg-base-200 border-base-300 border">
                <input type="checkbox" />
                <div className="collapse-title font-semibold text-primary text-center direction-rtl md:text-xl font-[ar3]">دروس {cat.nameAr} </div>
                <div className="collapse-content grid grid-cols-1 gap-2 text-md text-base-content">
                  {sections && sections.map((sec, i) => {
                    if (sec.catagory == cat.name) {
                      return (
                        <div key={i} className="collapse collapse-arrow w-full bg-base-100 border-base-300 border">

                          <input type="checkbox" />
                          <div className="collapse-title font-semibold text-primary text-center direction-rtl md:text-lg font-[ar3]">دروس {sec.nameAr}</div>
                          <div className="collapse-content grid md:grid-cols-5 justify-center md:justify-around gap-5 text-md text-base-content">
                            {courses && courses.map((course, i) => {
                              if (course.section == sec.name) {
                                return (
                                  <div onClick={() => showVideo(course.link)} key={i} className="bg-base-300 text-lg text-primary font-[ar3] font-semibold p-5 rounded-2xl w-fit cursor-pointer">
                                    <span className="direction-rtl text-center">{course.name}</span>
                                  </div>
                                )
                              }
                            })}
                          </div>
                        </div>
                      )
                    }
                  })}
                </div>
              </div> 
            )
          })}

        </div>{
          user.role === "admin" && (
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

        <dialog id="showVideoModal" className="modal">

          <div className="modal-box w-[95%] p-0 m-auto">
            <form method="dialog" className="relative z-50">
              {/* if there is a button in form, it will close the modal */}
              <button onClick={() => {
                handleClose()
              }} className="btn btn-sm btn-circle btn-soft opacity-30 hover:opacity-100 duration-300 active:opacity-100 absolute left-2 top-2">✕</button>
            </form>
            <div className="w-[100%] min-h-[26vh] md:min-h-[44vh] lg:min-h-[44vh]">
              {open && currentLink && (
                <ReactPlayer
                  ref={playerRef}
                  src={currentLink}
                  controls
                  width="100%"
                  className="min-h-[26vh] md:min-h-[44vh] lg:min-h-[44vh]"
                  config={{
                    youtube: {
                      playerVars: {
                        modestbranding: 1,
                        rel: 0,
                        fs: 1,
                        playsinline: 1,
                      },
                    },
                  }}
                />
              )}

            </div>
          </div>
        </dialog>

        </div>
    );
}