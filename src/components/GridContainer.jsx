const GridContainer = ({ children }) => {
    return (
      <div className="sm:grid sm:grid-cols-4 gap-5 px-5  lg:grid-cols-12 lg:col-start-2 lg:col-end-12">
        {children}
      </div>
    );
  };
  
  export default GridContainer;