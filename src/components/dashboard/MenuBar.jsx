// eslint-disable-next-line react/prop-types
const Menubar = ({ onMenuClick, onProductClick }) => {
  return (
    <>
      <div className="h-20 flex items-center justify-center shrink mt-5">
        <h3 className="text-xl sm:text-4xl md:text-3xl font-extrabold shrink tracking-widest">
          MENU
        </h3>
      </div>

      {/* Sidebar content */}
      <div className="flex flex-col shrink gap-2">
        {/* Home Menu */}
        <div
          className="flex flex-row gap-2 text-xl h-10 lg:p-5 ml-2 border-2 rounded border-black items-center shrink lg:justify-start justify-center 
            transition-all duration-300 ease-in-out hover:bg-blue-400 hover:text-white hover:scale-105 hover:border-0"
          onClick={() => {
            if (window.innerWidth < 1024) {
              onMenuClick(); // Toggle sidebar on small screens
            }
            onProductClick(0); // Set view to Home
          }}
        >
          <i className="fa-solid fa-house mt-1"></i>
          <span className="hidden sm:block md:block font-bold">Home</span>
        </div>

        {/* Product Menu */}
        <div
          className="flex flex-row gap-2 text-xl h-10 lg:p-5 ml-2 border-2 rounded border-black items-center shrink lg:justify-start justify-center 
            transition-all duration-300 ease-in-out hover:bg-blue-400 hover:text-white hover:scale-105 hover:border-0"
          onClick={() => {
            if (window.innerWidth < 1024) {
              onMenuClick(); // Toggle sidebar on small screens
            }
            onProductClick(1); // Set view to Product
          }}
        >
          <i className="fa-solid fa-shirt mt-1"></i>
          <span className="hidden sm:block md:block font-bold">Product</span>
        </div>
        {/* Product Menu */}
        <div
          className="flex flex-row gap-2 text-xl h-10 lg:p-5 ml-2 border-2 rounded border-black items-center shrink lg:justify-start justify-center 
            transition-all duration-300 ease-in-out hover:bg-blue-400 hover:text-white hover:scale-105 hover:border-0"
          onClick={() => {
            if (window.innerWidth < 1024) {
              onMenuClick(); // Toggle sidebar on small screens
            }
            onProductClick(2); // Set view to Product
          }}
        >
          <i className="fa-solid fa-arrow-right-arrow-left"></i>
          <span className="hidden sm:block md:block font-bold">
            Transaction
          </span>
        </div>
        {/* Saleable Products */}
        <div
          className="flex flex-row gap-2 h-10 lg:p-5 ml-2 border-2 rounded border-black items-center shrink lg:justify-start justify-center 
            transition-all duration-300 ease-in-out hover:bg-blue-400 hover:text-white hover:scale-105 hover:border-0"
          onClick={() => {
            if (window.innerWidth < 1024) {
              onMenuClick(); // Toggle sidebar on small screens
            }
            onProductClick(3); // Set view to Product
          }}
        >
          {/* <i className="fa-solid fa-arrow-right-arrow-left text-xl"></i> */}
          <i className="fa-solid fa-shirt text-xl"></i>
          <span className="hidden sm:block md:block font-bold text-lg">
            Saleable Products
          </span>
        </div>
      </div>
    </>
  );
};

export default Menubar;
