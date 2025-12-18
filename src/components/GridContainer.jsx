const GridContainer = ({ children, className = '' }) => {
  return (
    <div
      className={`px-5 sm:col-span-4 sm:col-start-1 sm:col-end-5 sm:grid sm:grid-cols-4 sm:gap-5 lg:col-start-2 lg:col-end-13 lg:grid-cols-12 ${className}`}
    >
      {children}
    </div>
  );
};

export default GridContainer;
