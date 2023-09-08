import "./App.css";
import DropDownMenus from "./components/DropdownMenus";
import ImageGrid from "./components/ImageGird";
import SearchInput from "./components/SearchInput";
import useData from "./hooks/useFetchData";

function App() {
  const { filteredTacha, handleSetIndex, handleSetfileters } = useData();

  return (
    <div className="flex ">
      <div className="w-1/4 bg-gray-200 p-4 ">
        <DropDownMenus onChange={handleSetfileters} />
      </div>
      <div className="w-3/4 bg-gray-300 p-4 flex flex-col ">
        <SearchInput onChange={handleSetIndex} />
        <ImageGrid techas={filteredTacha} />
      </div>
    </div>
  );
}
export default App;
