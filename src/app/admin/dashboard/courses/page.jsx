"use client"
import { useEffect, useState } from "react";
import Loader from "@/components/loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"
import { toast } from "sonner";
export default function AdminCourses() {
    const [selectedCat, setSelectedCat] = useState('')
    const [selectedSec, setSelectedSec] = useState('')
    const [loading, setLoading] = useState(false)
    const [catagories, setCatagories] = useState([]);
    const [sections, setSections] = useState([]);
    const [courses, setCourses] = useState([]);
    const [Ecourse, setEcourse] = useState({
        name: '',
        description: '',
        catagory: '',
        link: '',
        section: ''
    })
    const [Esection, setEsection] = useState({
        name: '',
        nameAr: '',
        description: '',
        catagory: '',
    })
    const [Ecatagory, setEcatagory] = useState({
        name: '',
        nameAr: '',
        description: '',
        catagory: '',
    })
    const [DcourseId, setDcourseId] = useState()
    const [DsectionId, setDsectionId] = useState()
    const [DcatagoryId, setDcatagoryId] = useState()


    useEffect(() => {
        getCatagories()
        getSections()
        getCourses()
    }, [])

    const getCourses = async () => {
        try {
            const res = await fetch('/api/admin/courses')
            const data = await res.json()
            console.log(data);
            
            setCourses(data.courses)
        }
        catch (error) {
            console.error(error)
        }
    }
       
    const showEditCourseModel = (course) => {
        setEcourse(course)
        document.getElementById('editCourseModal').showModal()
    }

    const editCourse = async () => {
        try {
            setLoading(true)
            const res = await fetch('/api/admin/courses', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: Ecourse.id,
                    name: Ecourse.name,
                    description: Ecourse.description,
                    catagory: Ecourse.catagory,
                    link: Ecourse.link,
                    section: Ecourse.section
                })
            })
            const data = await res.json()
            console.log(data);
            document.getElementById('editCourseModal').close()
            console.log(courses);
            setCourses(courses.map((course) => {
                if (course.id === Ecourse.id) {
                    return Ecourse
                }
                return course
            }))
            
            
            setLoading(false)
        } catch (err) {
            toast.error('هناك خطأ')
            console.error(err)
        }
    }

    const showDeleteCourseModel = (course) => {
        setDcourseId(course.id)
        document.getElementById('deleteCourseModal').showModal()
    }

    const deleteCourse = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/admin/courses', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: DcourseId
                })
            })
            const data = await res.json()
            console.log(data);
            document.getElementById('deleteCourseModal').close()
            setCourses(courses.filter((course) => course.id !== DcourseId))
            setLoading(false)
        } catch (err) {
            toast.error('هناك خطأ')
            setLoading(false)
        }
    }



    const getSections = async () => {
        try {
            const res = await fetch('/api/admin/courses/section')
            const data = await res.json()
            setSections(data)
        }
        catch (error) {
            console.error(error)
        }
    }

        const saveCourse = async () => {
        setLoading(true)
        const res = await fetch('/api/admin/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: document.getElementById('courseName').value,
                description: document.getElementById('courseDescription').value,
                catagory: selectedCat,
                link: document.getElementById('courseLink').value,
                section: selectedSec
            })
        })
        const data = await res.json()
        console.log(data);
        document.getElementById('createCourseModal').close()
        setCourses([...courses, data.course])
        
        document.getElementById('courseName').value = ''
        document.getElementById('courseDescription').value = ''
        document.getElementById('courseCatagory').value = ''
        document.getElementById('courseSection').value = ''
        document.getElementById('courseLink').value = ''
        

        setLoading(false)
    }


    const showEditSectionModel = (section) => {
        setEsection(section)
        document.getElementById('editSectionModal').showModal()
    }

   

    
    
    const editSection = async () => {
        setLoading(true)
        const res = await fetch('/api/admin/courses/section', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: Esection.id,
                name: Esection.name,
                description: Esection.description,
                catagory: Esection.catagory
            })
        })
        const data = await res.json()
        console.log(data);
        document.getElementById('editSectionModal').close()
        console.log(courses);
        setSections(sections.map((section) => {
            if (section.id === Esection.id) {
                
                return Esection
            }
            return section
        }))
        
        
        setLoading(false)
    }



    const showDeleteSectionModel = (section) => {
        setDsectionId(section.id)
        document.getElementById('deleteSectionModal').showModal()
    }
    
    const deleteSection = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/admin/courses/section', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: DsectionId
                })
            })
            const data = await res.json()
            console.log(data);
            document.getElementById('deleteSectionModal').close()
            setSections(sections.filter((section) => section.id !== DsectionId))
            setLoading(false)
        } catch (err) {
            toast.error('هناك خطأ')
            setLoading(false)
        }
    }
    
    const saveSection = async () => {
        try {
            setLoading(true)
            const res = await fetch('/api/admin/courses/section', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nameAr: document.getElementById('sectionNameAr').value,
                    name: document.getElementById('sectionNameEn').value,
                    description: document.getElementById('sectionDescription').value,
                    catagory: selectedCat
                })
            })
            const data = await res.json()
            console.log(data);
            document.getElementById('createSectionModal').close()
            setSections([...sections, data])
            
            document.getElementById('sectionNameAr').value = ''
            document.getElementById('sectionNameEn').value = ''
            document.getElementById('sectionDescription').value = ''
            document.getElementById('sectionCatagory').value = ''

            setLoading(false)
        }
        catch (error) {
            console.error(error);
            setLoading(false)
        }
    }

    

    const getCatagories = async () => {
        try {
            const res = await fetch('/api/admin/courses/catagory')
            const data = await res.json()
            setCatagories(data)
        }
        catch (error) {
            console.error(error)
        }
    }
    const saveCatagory = async () => {
        try {
         setLoading(true)
         const res = await fetch('/api/admin/courses/catagory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nameAr: document.getElementById('catagoryNameAr').value,
                    name: document.getElementById('catagoryNameEn').value,
                    description: document.getElementById('catagoryDescription').value
                })
            })
            const data = await res.json()
            console.log(data);
            document.getElementById('createCatagoryModal').close()
            setCatagories([...catagories, data])
            
            document.getElementById('catagoryNameAr').value = ''
            document.getElementById('catagoryNameEn').value = ''
            document.getElementById('catagoryDescription').value = ''

            setLoading(false)
        }
        catch (error) {
            console.error(error);
            setLoading(false)
        }
    }

     const showEditCatagoryModel = (catagory) => {
        setEcatagory(catagory)
        document.getElementById('editCatagoryModal').showModal()
    }
    
    const showDeleteCatagoryModel = (catagory) => {
        setDcatagoryId(catagory.id)
        document.getElementById('deleteCatagoryModal').showModal()
    }

    const editCatagory = async () => {
        setLoading(true)
        const res = await fetch('/api/admin/courses/catagory', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: Ecatagory.id,
                nameAr: Ecatagory.nameAr,
                name: Ecatagory.name,
                description: Ecatagory.description
            })
        })
        const data = await res.json()
        console.log(data);
        document.getElementById('editCatagoryModal').close()
        console.log(catagories);
        setCatagories(catagories.map((catagory) => {
            if (catagory.id === Ecatagory.id) {
                return Ecatagory
            }
            return catagory
        }))
        
        
        setLoading(false)
    }

    const deleteCatagory = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/admin/courses/catagory', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: DcatagoryId
                })
            })
            const data = await res.json()
            console.log(data);
            document.getElementById('deleteCatagoryModal').close()
            setCatagories(catagories.filter((catagory) => catagory.id !== DcatagoryId))
            setLoading(false)
        } catch (err) {
            toast.error('هناك خطأ')
            setLoading(false)
        }
    }





    return (
        <div>

{/* name of each tab group should be unique */}
<div className="tabs tabs-border direction-rtl">
  <input type="radio" name="my_tabs_2" className="tab text-lg text-primary" aria-label="الدروس"  defaultChecked/>
  <div className="tab-content border-base-300 bg-base-200 p-10">
            <button className="btn btn-primary" onClick={()=> {document.getElementById('createCourseModal').showModal()}} disabled={loading}>{loading ? <Loader /> : "إضافة درس"}</button>
            <div className="overflow-x-auto">
  <table className="table table-xs">
    <thead>
      <tr>
        <th className="hidden md:block">الرقم</th>
        <th>الاسم</th>
        <th>الوصف</th>
        <th>القسم</th>
        <th>الفئة</th>
      </tr>
    </thead>
    <tbody>

{(courses.length > 0) && courses.map((course , index) => (
    <tr key={index} className="hover:bg-primary hover:text-primary-content duration-500">
        <th className="hidden md:block">{index + 1}</th>
        <td>{course.name}</td>
        <td>{course.description}</td>
        <td>
            {sections.find((sec) => sec.name === course.section)?.nameAr || "—"}
        </td>

        <td>
            {catagories.find((cat) => cat.name === course.catagory)?.nameAr || "—"}
        </td>
   <td>
                            <FontAwesomeIcon icon={faPenToSquare} onClick={() => showEditCourseModel(course)} className="cursor-pointer hover:scale-115 duration-300 hover:text-primary-content" />
                          </td>
                          <td>
                            <FontAwesomeIcon icon={faTrash} onClick={() => showDeleteCourseModel(course)} className="cursor-pointer hover:scale-115 duration-300 hover:text-error" />
                          </td>
    </tr>
))}



    </tbody>
  </table>
</div>
  </div>

  <input type="radio" name="my_tabs_2" className="tab text-lg text-primary" aria-label="الأقسام"/>
  <div className="tab-content border-base-300 bg-base-200 p-10">
            <button className="btn btn-primary" onClick={()=> {document.getElementById('createSectionModal').showModal()}} disabled={loading}>{loading ? <Loader /> : "إضافة قسم"}</button>
            <div className="overflow-x-auto">
  <table className="table">
    <thead>
      <tr>
        <th className="hidden md:block">الرقم</th>
        <th>الاسم عربي</th>
        <th>الاسم انجليزي</th>
        <th>الوصف</th>
        <th>الفئة</th>
      </tr>
    </thead>
    <tbody>

{(sections.length > 0) && sections.map((section , index) => (
    <tr key={index} className="hover:bg-primary hover:text-primary-content duration-500">
        <th className="hidden md:block">{index + 1}</th>
        <td>{section.nameAr}</td>
        <td>{section.name}</td>
        <td>{section.description}</td>
        <td>
            {catagories.find((cat) => cat.name === section.catagory)?.nameAr || "—"}
        </td>

           <td>
                            <FontAwesomeIcon icon={faPenToSquare} onClick={() => showEditSectionModel(section)} className="cursor-pointer hover:scale-115 duration-300 hover:text-primary-content" />
                          </td>
                          <td>
                            <FontAwesomeIcon icon={faTrash} onClick={() => showDeleteSectionModel(section)} className="cursor-pointer hover:scale-115 duration-300 hover:text-error" />
                          </td>
   </tr>
))}

    </tbody>
  </table>
</div>
            

  </div>

  <input type="radio" name="my_tabs_2" className="tab text-lg text-primary" aria-label="الفئات"/>
  <div className="tab-content border-base-300 bg-base-200 p-10">
            <button className="btn btn-primary" onClick={()=> {document.getElementById('createCatagoryModal').showModal()}} disabled={loading}>{loading ? <Loader /> : "إضافة فئة"}</button>
            <div className="overflow-x-auto">
  <table className="table">
    <thead>
      <tr>
        <th className="hidden md:block">الرقم</th>
        <th>الاسم عربي</th>
        <th>الاسم انجليزي</th>
        <th>الوصف</th>
      </tr>
    </thead>
    <tbody>

{(catagories.length > 0) && catagories.map((catagory , index) => (
    <tr key={index} className="hover:bg-primary hover:text-primary-content duration-500">
        <td className="hidden md:block">{index + 1}</td>
        <td>{catagory.nameAr}</td>
        <td>{catagory.name}</td>
        <td>{catagory.description}</td>
           <td>
                            <FontAwesomeIcon icon={faPenToSquare} onClick={() => showEditCatagoryModel(catagory)} className="cursor-pointer hover:scale-115 duration-300 hover:text-primary-content" />
                          </td>
                          <td>
                            <FontAwesomeIcon icon={faTrash} onClick={() => showDeleteCatagoryModel(catagory)} className="cursor-pointer hover:scale-115 duration-300 hover:text-error" />
                          </td>
   </tr>
))}

    </tbody>
  </table>
</div>
            

  </div>
</div>




{/* edit course model */}

        <dialog className="modal" id="editCourseModal">
           <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg text-center">تعديل الدرس</h3>
<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-[95%] my-3 m-auto border p-4">
  <legend className="fieldset-legend">معلومات الدرس الجديدة</legend>

  <label className="label">اسم الدرس</label>
  <input type="text" className="input input-bordered w-[100%]" placeholder="name" value={Ecourse.name} onChange={(e) => setEcourse({ ...Ecourse, name: e.target.value })} />

  <label className="label">الرابط</label>
  <input type="text" className="input input-bordered w-[100%]" placeholder="link" value={Ecourse.link} onChange={(e) => setEcourse({ ...Ecourse, link: e.target.value })} />

  <label className="label">الوصف</label>
  <input type="text" className="input input-bordered w-[100%]" placeholder="description" value={Ecourse.description} onChange={(e) => setEcourse({ ...Ecourse, description: e.target.value })} />

  <label className="label">الفئة</label>
  <select className="select select-bordered w-[100%]" id="courseCatagory" onChange={(e) => setEcourse({ ...Ecourse, catagory: e.target.value })}>
    <option>اختر الفئة</option>
    {catagories.map((catagory) => (
      <option key={catagory.id} value={catagory.name}>{catagory.nameAr}</option>
    ))}
  </select>

  <label className="label">القسم</label>
  <select className="select select-bordered w-[100%]" id="courseSection" onChange={(e) => setEcourse({ ...Ecourse, section: e.target.value })}>
    <option>اختر القسم</option>
    {sections.filter((section) => section.catagory == Ecourse.catagory).map((section) => (
      <option key={section.id} value={section.name}>{section.nameAr}</option>
    ))}
  </select>
</fieldset>
    <button className="btn btn-primary mr-4" onClick={() => editCourse()} disabled={loading}>{loading ? <Loader /> : "حفظ"}</button>
    <button className="btn btn-ghost" onClick={()=>document.getElementById('editCourseModal').close() } disabled={loading}>إلغاء</button>
  </div>
        </dialog>


{/* editSectionModal */}
        <dialog className="modal" id="editSectionModal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('editSectionModal').close()}>✕</button>
                </form>
                <h3 className="font-bold text-lg text-center">تعديل القسم</h3>
<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-[95%] my-3 m-auto border p-4">
  <legend className="fieldset-legend">معلومات القسم الجديدة</legend>

  <label className="label">اسم القسم</label>
  <input type="text" className="input input-bordered w-[100%]" placeholder="name" value={Esection.name} onChange={(e) => setEsection({ ...Esection, name: e.target.value })} />

  <label className="label">اسم القسم عربي</label>
  <input type="text" className="input input-bordered w-[100%]" placeholder="nameAr" value={Esection.nameAr} onChange={(e) => setEsection({ ...Esection, nameAr: e.target.value })} />

  <label className="label">الوصف</label>
  <input type="text" className="input input-bordered w-[100%]" placeholder="description" value={Esection.description} onChange={(e) => setEsection({ ...Esection, description: e.target.value })} />

  <label className="label">الفئة</label>
  <select className="select select-bordered w-[100%]" id="sectionCatagory" onChange={(e) => setEsection({ ...Esection, catagory: e.target.value })}>
    <option>اختر الفئة</option>
    {catagories.map((catagory) => (
      <option key={catagory.id} value={catagory.name}>{catagory.nameAr}</option>
    ))}
  </select>
</fieldset>
    <button className="btn btn-primary mr-4" onClick={() => editSection()} disabled={loading}>{loading ? <Loader /> : "حفظ"}</button>
    <button className="btn btn-ghost" onClick={()=>document.getElementById('editSectionModal').close() } disabled={loading}>إلغاء</button>
  </div>
        </dialog>


{/* editCatagoryModal */}
        <dialog className="modal" id="editCatagoryModal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('editCatagoryModal').close()}>✕</button>
                </form>
                <h3 className="font-bold text-lg text-center">تعديل الفئة</h3>
<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-[95%] my-3 m-auto border p-4">
  <legend className="fieldset-legend">معلومات الفئة الجديدة</legend>

  <label className="label">اسم الفئة</label>
  <input type="text" className="input input-bordered w-[100%]" placeholder="name" value={Ecatagory.name} onChange={(e) => setEcatagory({ ...Ecatagory, name: e.target.value })} />

  <label className="label">اسم الفئة عربي</label>
  <input type="text" className="input input-bordered w-[100%]" placeholder="nameAr" value={Ecatagory.nameAr} onChange={(e) => setEcatagory({ ...Ecatagory, nameAr: e.target.value })} />

  <label className="label">الوصف</label>
  <input type="text" className="input input-bordered w-[100%]" placeholder="description" value={Ecatagory.description} onChange={(e) => setEcatagory({ ...Ecatagory, description: e.target.value })} />
</fieldset>
    <button className="btn btn-primary mr-4" onClick={() => editCatagory()} disabled={loading}>{loading ? <Loader /> : "حفظ"}</button>
    <button className="btn btn-ghost" onClick={()=>document.getElementById('editCatagoryModal').close() } disabled={loading}>إلغاء</button>
  </div>
        </dialog>






{/* deleteCourseModal */}
        <dialog className="modal" id="deleteCourseModal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('deleteCourseModal').close()}>✕</button>
                </form>
                <h3 className="font-bold text-lg">حذف الدرس</h3>
                <label className="block mt-4">
                    <span className="text-base-content">هل أنت متأكد من حذف هذا الدرس؟</span>
                </label>
                <div className="modal-action">
                    <button className="btn btn-primary" onClick={() => deleteCourse()} disabled={loading}>{loading ? <Loader /> : "حذف"}</button>
                    <button className="btn btn-ghost" onClick={() => document.getElementById('deleteCourseModal').close()}>إلغاء</button>
                </div>
            </div>
        </dialog>

{/* deleteSectionModal */}
        <dialog className="modal" id="deleteSectionModal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('deleteSectionModal').close()}>✕</button>
                </form>
                <h3 className="font-bold text-lg">حذف القسم</h3>
                <label className="block mt-4">
                    <span className="text-base-content">هل أنت متأكد من حذف هذا القسم؟</span>
                </label>
                <div className="modal-action">
                    <button className="btn btn-primary" onClick={() => deleteSection()} disabled={loading}>{loading ? <Loader /> : "حذف"}</button>
                    <button className="btn btn-ghost" onClick={() => document.getElementById('deleteSectionModal').close()}>إلغاء</button>
                </div>
            </div>
        </dialog>

{/* deleteCatagoryModal */}
        <dialog className="modal" id="deleteCatagoryModal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('deleteCatagoryModal').close()}>✕</button>
                </form>
                <h3 className="font-bold text-lg">حذف الفئة</h3>
                <label className="block mt-4">
                    <span className="text-base-content">هل أنت متأكد من حذف هذه الفئة؟</span>
                </label>
                <div className="modal-action">
                    <button className="btn btn-primary" onClick={() => deleteCatagory()} disabled={loading}>{loading ? <Loader /> : "حذف"}</button>
                    <button className="btn btn-ghost" onClick={() => document.getElementById('deleteCatagoryModal').close()}>إلغاء</button>
                </div>
            </div>
        </dialog>



 {/* Course Modal */}
        <dialog className="modal" id="createCourseModal">
           <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg text-center">إضافة درس</h3>
<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-[95%] my-3 m-auto border p-4">
  <legend className="fieldset-legend">معلومات الدرس</legend>

  <label className="label">اسم الدرس</label>
  <input type="text" className="input input-bordered w-[100%]" placeholder="name" id="courseName" />

  <label className="label">الرابط</label>
  <input type="text" className="input input-bordered w-[100%]" placeholder="link" id="courseLink" />

  <label className="label">الوصف</label>
  <input type="text" className="input input-bordered w-[100%]" placeholder="description" id="courseDescription" />

  <label className="label">الفئة</label>
  <select className="select select-bordered w-[100%]" id="courseCatagory" onChange={(e) => setSelectedCat(e.target.value)}>
    <option>اختر الفئة</option>
    {catagories.map((catagory) => (
      <option key={catagory.id} value={catagory.name}>{catagory.nameAr}</option>
    ))}
  </select>

  <label className="label">القسم</label>
  <select className="select select-bordered w-[100%]" id="courseSection" onChange={(e) => setSelectedSec(e.target.value)}>
    <option>اختر القسم</option>
    {sections.filter((section) => section.catagory == selectedCat).map((section) => (
      <option key={section.id} value={section.name}>{section.nameAr}</option>
    ))}
  </select>
</fieldset>
    <button className="btn btn-primary mr-4" onClick={() => saveCourse()} disabled={loading}>{loading ? <Loader /> : "حفظ"}</button>
    <button className="btn btn-ghost" onClick={()=>document.getElementById('createCourseModal').close() } disabled={loading}>إلغاء</button>
  </div>
        </dialog>

 {/* Section Modal */}
        <dialog className="modal" id="createSectionModal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('createSectionModal').close()}>✕</button>
                </form>
                <h3 className="font-bold text-lg">إضافة قسم</h3>
                <label className="block mt-4">
                    <span className="text-base-content">اسم القسم (عربي)</span>
                    <input className="input input-primary mt-1 block w-full" placeholder="اسم القسم" id="sectionNameAr" />
                </label>
                <label className="block mt-4">
                    <span className="text-base-content">اسم القسم (انجليزي)</span>
                    <input className="input input-primary mt-1 block w-full" placeholder="اسم القسم" id="sectionNameEn" />
                </label>
                <label className="block mt-4">
                    <span className="text-base-content">وصف القسم</span>
                    <input className="input input-primary mt-1 block w-full" placeholder="وصف القسم" id="sectionDescription" />
                </label>
                <label className="block mt-4">
                    <span className="text-base-content">الفئة</span>
                    <select className="select select-bordered w-[100%]" id="sectionCatagory" onChange={(e) => setSelectedCat(e.target.value)}>
                        <option>اختر الفئة</option>
                        {catagories.map((catagory) => (
                            <option key={catagory.id} value={catagory.name}>{catagory.nameAr}</option>
                        ))}
                    </select>
                </label>


                <div className="modal-action">
                    <button className="btn btn-primary" onClick={() => saveSection()} disabled={loading}>{loading ? <Loader /> : "إضافة"}</button>
                    <button className="btn" onClick={() => document.getElementById('createSectionModal').close()}>إلغاء</button>
                </div>
            </div>
        </dialog>

 {/* catagory Modal */}
        <dialog className="modal" id="createCatagoryModal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('createCatagoryModal').close()}>✕</button>
                </form>
                <h3 className="font-bold text-lg">إضافة فئة</h3>
                <label className="block mt-4">
                    <span className="text-base-content">اسم الفئة (عربي)</span>
                    <input className="input input-primary mt-1 block w-full" placeholder="اسم الفئة" id="catagoryNameAr" />
                </label>
                <label className="block mt-4">
                    <span className="text-base-content">اسم الفئة (انجليزي)</span>
                    <input className="input input-primary mt-1 block w-full" placeholder="اسم الفئة" id="catagoryNameEn" />
                </label>
                <label className="block mt-4">
                    <span className="text-base-content">وصف الفئة</span>
                    <input className="input input-primary mt-1 block w-full" placeholder="وصف الفئة" id="catagoryDescription" />
                </label>
                <div className="modal-action">
                    <button className="btn btn-primary" onClick={() => saveCatagory()} disabled={loading}>{loading ? <Loader /> : "إضافة"}</button>
                    <button className="btn" onClick={() => document.getElementById('createCatagoryModal').close()}>إلغاء</button>
                </div>
            </div>
        </dialog>


        </div>
    )
}