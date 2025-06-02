"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 p-6">
      {/* Florecitas decorativas */}
      <div className="absolute top-8 left-8 animate-spin-slow">
        <FlowerSVG size={48} />
      </div>
      <div className="absolute bottom-8 right-8 animate-spin-reverse">
        <FlowerSVG size={64} />
      </div>

      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-10 flex flex-col items-center gap-8 border-2 border-pink-200">
        <h1 className="text-3xl sm:text-4xl font-bold text-pink-600 text-center flex items-center gap-2">
          <FlowerSVG size={32} />
          Bienvenido a{" "}
          <span className="text-pink-500 font-extrabold ml-2">
            Biblioteca Rosa
          </span>
          <FlowerSVG size={32} />
        </h1>
        <p className="text-pink-700 text-lg text-center max-w-md">
          El lugar donde los libros florecen y la lectura se vuelve mágica.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button
            onClick={() => router.push("/auth/login")}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-full shadow transition-all duration-200 text-lg"
          >
            Iniciar sesión
          </button>
          <button
            onClick={() => router.push("/auth/new-account")}
            className="bg-white border-2 border-pink-400 hover:bg-pink-100 text-pink-600 font-semibold py-3 px-8 rounded-full shadow transition-all duration-200 text-lg"
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
}

// SVG de florecita decorativa
function FlowerSVG({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className="drop-shadow"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="4" fill="#ec4899" />
      <g stroke="#f9a8d4" strokeWidth="2">
        <ellipse cx="16" cy="6" rx="3" ry="6" />
        <ellipse cx="16" cy="26" rx="3" ry="6" />
        <ellipse cx="6" cy="16" rx="6" ry="3" />
        <ellipse cx="26" cy="16" rx="6" ry="3" />
        <ellipse
          cx="8.5"
          cy="8.5"
          rx="4"
          ry="2"
          transform="rotate(-45 8.5 8.5)"
        />
        <ellipse
          cx="23.5"
          cy="23.5"
          rx="4"
          ry="2"
          transform="rotate(-45 23.5 23.5)"
        />
        <ellipse
          cx="23.5"
          cy="8.5"
          rx="4"
          ry="2"
          transform="rotate(45 23.5 8.5)"
        />
        <ellipse
          cx="8.5"
          cy="23.5"
          rx="4"
          ry="2"
          transform="rotate(45 8.5 23.5)"
        />
      </g>
    </svg>
  );
}
