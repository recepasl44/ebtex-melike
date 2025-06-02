import  { useState, useEffect } from 'react';
import loaderimg from "../../assets/images/media/loader.svg"

const Loader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoadingState = () => {
      setLoading(false);
    };
    handleLoadingState();
  }, []);

  return loading ? (
    <div id="loader" className="loader">
      <img src={loaderimg} alt="Loading..." />
    </div>
  ) : null;
};

export default Loader;
