import AdminSidebar from "@/app/components/adminsSidebar"


export default function adminLayout({ children }) {
    return (    
    <div className="w-full grid grid-cols-5"> 

        <div className="col-span-4">
        {children} 
        </div>
            <div className="col-span-1 justify-end">   
        <AdminSidebar />
        </div>
</div>
    )
}