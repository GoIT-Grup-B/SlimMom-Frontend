import { useSelector } from "react-redux";
import { PuffLoader } from "react-spinners";

const Loader = () => {
  const isLoading = useSelector((state) => state.loader.isLoading);
  return isLoading ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <PuffLoader color="#36d7b7" size={80} />
    </div>
  ) : null;
};

export default Loader;
