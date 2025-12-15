"use client"

import '@/css/admin.css'
import AdminSidebar from "@/components/adminsSidebar"


export default function adminLayout({ children }) {
    return (    
        <div className="w-full grid grid-cols-6"> 

            <div className="col-span-5 ">
        {children} 
        </div>
            <div className="col-span-1 justify-end">   
        <AdminSidebar />
        </div>
</div>
    )
}