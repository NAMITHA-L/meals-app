import { useContext } from 'react';
import { MealsContext } from '../context/MealsContext';
import { MealsContextType } from '../lib/types';
import { MdClear } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  const { search, setSearch } = useContext(MealsContext) as MealsContextType;

  // Function to clear the search input
  const clearSearch = () => {
    setSearch('');
  };

  return (
    <div className="relative w-full md:w-3/6 lg:w-2/6 mx-auto my-3">
      <input
        className="border border-gray-300 px-12 py-3 h-16 block w-full rounded-full focus:outline-none focus:shadow-lg focus:ring-2 ring-blue-500 transition duration-200 ease-in-out"
        type="text"
        name="search"
        value={search}
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* Search Icon */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
        <FaSearch size={20} />
      </div>
      {/* Clear Button */}
      {search && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition duration-200 ease-in-out"
          aria-label="Clear search"
        >
          <MdClear size={24} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
