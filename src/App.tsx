import "./App.css";
import DropDownMenus from "./components/DropdownMenus";
import useData from "./hooks/useFetchData";

function App() {
  const { filteredTacha, filterTecha, handleSetfileters } = useData();
  console.log(filteredTacha);
  return (
    <div className="flex ">
      <div className="w-1/4 bg-gray-200 p-4 ">
        <DropDownMenus onChange={handleSetfileters} />
      </div>
      <div className="w-3/4 bg-gray-300 p-4 ">Right Side Content Goes Here</div>
    </div>
  );
}
export default App;
