import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-20 bg-[#0F172A]/80 backdrop-blur-sm">
      <div className="flex justify-between items-center w-[80%] mx-auto text-gray-200 py-3 px-5 lg:px-16 xl:px-20 ">
        <div className="flex items-center flex-1">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="inline-flex h-7 w-7 items-center justify-center font-bold rounded-md bg-gradient-to-tr from-indigo-500 to-cyan-400">
              T
            </span>
            <span className="text-lg tracking-tight">TravelAI</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/search"
            className="hidden md:inline text-white/75 hover:text-white text-sm px-2 py-1"
          >
            Find Places
          </Link>
          <Link
            href="/chat"
            className="hidden md:inline text-white/75 hover:text-white text-sm px-2 py-1"
          >
            Get Suggestions
          </Link>
          <Link
            href="/favorites"
            className="hidden md:inline text-white/75 hover:text-white text-sm px-2 py-1"
          >
            Favorites
          </Link>
          <Link href="/login">
            <button className="px-3.5 py-2 rounded-md bg-blue-600 hover:bg-blue-500 transition text-sm">
              Start
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
