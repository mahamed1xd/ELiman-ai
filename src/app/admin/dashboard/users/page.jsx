"use client"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"
import { toast } from "sonner"
import Loader from "@/components/loader"
import storage from "@/lib/storage"
export default function adminUsersPage() {
  const [Duser, setDuser] = useState({})
  const [Euser, setEuser] = useState({
    name: '',
    email: '',
    role: '',
    password: '',
    pastPassword: '',
    id: '',
    createdAt: '',
    image: ''
  })
  const [editLoading, setEditLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [loading, setloading] = useState(false)
  useEffect(() => {
    const initUsers = async () => {
      setloading(true);

      const storedUsers = await storage.getItem('users');

      if (Array.isArray(storedUsers) && storedUsers.length > 0) {
        setUsers(storedUsers);
        setloading(false);
        return;
      }

      // مفيش users في storage → هات من API
      const res = await fetch('/api/admin/users');
      const data = await res.json();

      setUsers(data.users || []);
      await storage.setItem('users', data.users || []);
      setloading(false);
    };

    initUsers();
  }, []);


  useEffect(() => {
    const clearOnClose = () => {
      storage.removeItem("users");
    };

    window.addEventListener("beforeunload", clearOnClose);

    return () => {
      window.removeEventListener("beforeunload", clearOnClose);
    };
  }, []);


  const showEditModel = async (user) => {
    setEuser({
      name: '',
      email: '',
      role: '',
      password: '',
      pastPassword: '',
      id: '',
      createdAt: '',
      image: ''
    })
    setEuser(user)
    document.getElementById('editModal').showModal()
  }

  const showDeleteModel = async (user) => {
    setDuser(user)
    document.getElementById('deleteModal').showModal()
  }

  const deleteUser = async () => {
    setEditLoading(true)
    const res = await fetch('/api/admin/users', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: Duser.id }),
    })
    const data = await res.json()
    console.log(data);
    if (data.success) {
      setUsers(users.filter((u) => u.id !== Duser.id))
      await storage.setItem('users', users.filter((u) => u.id !== Duser.id))
      toast.success('تم حذف المستخدم بنجاح')
      document.getElementById('deleteModal').close()
      setEditLoading(false)
    }
    else {
      document.getElementById('deleteModal').close()
      toast.error('لم يتم حذف المستخدم')
      setEditLoading(false)
    }
  }

  const editUser = async () => {
    setEditLoading(true)
    const res = await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Euser)
    })
    const data = await res.json()
    console.log(data);
    if (data.success) {
      toast.success('تم تعديل المستخدم بنجاح')
      setUsers(users.map((u) => u.id === Euser.id ? Euser : u))
      await storage.setItem('users', users.map((u) => u.id === Euser.id ? Euser : u))
      document.getElementById('editModal').close()

    }
    else {
      toast.error(data.message)
    }
    setEditLoading(false)

  }
  return (

    <div className="flex justify-center items-center">
      {(loading) ? <div className="min-h-[90vh] w-full flex justify-center items-center"><Loader /></div> : (
        <>
          <div className="w-[95%] mt-2 rounded-2xl mb-2 border-2 border-base-300 shadow md:shadow-2xl md:p-10 overflow-x-auto mx-auto bg-base-200">
            <table className="table table-zebra w-full">
              {/* head */}
              <thead>
                <tr>
                  <th className="hidden md:block">الرقم</th>
                  <th>الاسم</th>
                  <th>البريد الإلكتروني</th>
                  <th>تاريخ التسجيل</th>
                  <th>النوع</th>
                  <th>المعرف</th>
                </tr>
              </thead>
              <tbody>
                {users && <>
                  {users.map((user, i) => {
                      return (
                        <tr key={i} className="hover:bg-primary hover:text-primary-content duration-500">
                          <th className="hidden md:block">{i + 1}</th>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.createdAt}</td>
                          <td>{user.role}</td>
                          <td>{user.id}</td>
                          <td>
                            <FontAwesomeIcon icon={faPenToSquare} onClick={() => showEditModel(user)} className="cursor-pointer hover:scale-115 duration-300 hover:text-primary-content" />
                          </td>
                          <td>
                            <FontAwesomeIcon icon={faTrash} onClick={() => showDeleteModel(user)} className="cursor-pointer hover:scale-115 duration-300 hover:text-error" />
                          </td>
                        </tr>
                      )
                    })}
                  </>}
                </tbody>
              </table>
            </div>

            <dialog id="deleteModal" className="modal">
              <div className="modal-box direction-rtl text-right">
                <h3 className="font-bold text-lg">هل أنت متأكد من حذف هذا المستخدم؟</h3>
                <p>الاسم : {Duser.name}</p>
                <p>البريد الإلكتروني : {Duser.email}</p>
                <p>تاريخ التسجيل : {Duser.createdAt}</p>
                <p>النوع : {Duser.role}</p>
                <p>المعرف : {Duser.id}</p>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn btn-ghost mr-2 hover:scale-110 transition-all duration-300">لا</button>
                    <button className="btn btn-sm btn-circle btn-ghost absolute left-2 top-2">✕</button>
                  </form>
                  <button className="btn btn-primary hover:scale-110 transition-all duration-300" onClick={deleteUser}>{editLoading ? <Loader /> : 'نعم'}</button>

                </div>
              </div>
            </dialog>


            <dialog id="editModal" className="modal">
              <div className="modal-box direction-rtl text-right">
                <h3 className="font-bold text-lg mb-2">تعديل المستخدم</h3>
                <div className="flex flex-col gap-2">
                  <label className="floating-label">
                    <span className="label-text">الاسم</span>
                    <input type="text" className="input input-primary w-full" placeholder="الاسم" value={Euser.name} onChange={(e) => setEuser({ ...Euser, name: e.target.value })} />
                  </label>
                  <label className="floating-label">
                    <span className="label-text">البريد الإلكتروني</span>
                    <input type="email" className="input input-primary w-full" placeholder="البريد الإلكتروني" value={Euser.email} onChange={(e) => setEuser({ ...Euser, email: e.target.value })} />
                  </label>
                  <label className="floating-label">
                    <span className="label-text">النوع</span>
                    <select onChange={(e) => setEuser({ ...Euser, role: e.target.value })} name="role" defaultValue={Euser.role} className="select w-full direction-ltr text-left">
                      <option disabled={true}>Pick a role</option>
                      <option value="user">مستخدم</option>
                      <option value="admin">مشرف</option>
                    </select>
                  </label>
                  <label className="floating-label">
                    <span className="label-text">الباسورد القديم</span>
                    <input type="password" className="input input-primary w-full" placeholder="الباسورد القديم" onChange={(e) => setEuser({ ...Euser, pastPassword: e.target.value })} />
                  </label>
                  <label className="floating-label">
                    <span className="label-text">الباسورد الجديد</span>
                    <input type="password" className="input input-primary w-full" placeholder="الباسورد الجديد" onChange={(e) => setEuser({ ...Euser, password: e.target.value })} />
                  </label>
                </div>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn btn-ghost mr-2 hover:scale-110 transition-all duration-300">ٳلغاء</button>
                    <button className="btn btn-sm btn-circle btn-ghost absolute left-2 top-2">✕</button>
                  </form>
                  <button className="btn btn-primary hover:scale-110 transition-all duration-300 mr-2" onClick={editUser}>{editLoading ? <Loader /> : 'حفظ'}</button>
                </div>
              </div>
            </dialog>
          </>
        )}
      </div> 

    )

}