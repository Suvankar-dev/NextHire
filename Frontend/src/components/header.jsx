const Header = () => {
  return (
    <div className="h-max">
      <header className="bg-gray-800 text-white p-4 top-0 fixed w-full z-5 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Job Portal</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="/" className="hover:text-gray-400">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-gray-400">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-400">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};
export default Header;
