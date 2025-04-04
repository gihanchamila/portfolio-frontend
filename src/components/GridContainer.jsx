const GridContainer = ({ children }) => {
  return (
    <div className="sm:grid sm:grid-cols-4 sm:gap-5 px-5 sm:col-span-4 sm:col-start-1 sm:col-end-5 lg:grid-cols-12 lg:col-start-2 lg:col-end-13">
      {children}
    </div>
  );
};

export default GridContainer;
