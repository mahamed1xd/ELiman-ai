export default function settings() {
    return (
        <>
        <div className="w-[85%] p-4 flex bg-base-200 shadow-2xl rounded">
  <div id="theme" className="flex flex-row-reverse items-center justify-between w-full">
      <p className="text-base-content">اختار الشكل</p>

     <div className="dropdown">
  <div tabIndex={0} role="button" className="btn m-1">
    Theme
  </div>
  <ul tabIndex="0" className="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl">
     <input
        type="radio"
        name="theme-dropdown"
        className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
        aria-label="Default"
        value="default" />
  </ul>
</div>
  </div>
</div>

        </>
    )
}