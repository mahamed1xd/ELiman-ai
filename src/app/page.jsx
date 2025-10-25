"use client";
import { toast } from "sonner";

export default function HomePage() {
  const headerImg = "/header.jpg"
  return (
    <>

      <div
<<<<<<< HEAD
        className="p-0 hero min-h-screen"
        style={{
          backgroundImage:
            `url(${headerImg})`,
=======
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
>>>>>>> 4755500f58d06b2fabcdb5246c1e3bdff89a35ef
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
<<<<<<< HEAD
            <button className="btn btn-primary" onClick={() => toast.success("Button clicked!")}>Get Started</button>
=======
            <button className="btn btn-primary">Get Started</button>
>>>>>>> 4755500f58d06b2fabcdb5246c1e3bdff89a35ef
          </div>
        </div>
      </div>
    </>
  );
}