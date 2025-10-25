"use client";
import { toast } from "sonner";
import '@/css/main.css'

export default function HomePage() {

  return (
    <>

      <div
        id="header"
        className="p-0 hero min-h-screen"
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <button className="btn btn-primary" onClick={() => toast.success("Button clicked!")}>Get Started</button>
          </div>
        </div>
      </div>

    </>
  );
}