import { useContext, useState } from 'react';
import { MealsContext } from '../context/MealsContext';
import { MealsContextType } from '../lib/types';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import clsx from 'clsx';

const MealsDisplay = () => {
  const { meals, favorites, handleFavorites, search } = useContext(
    MealsContext
  ) as MealsContextType;

  const [doubleClickTime, setDoubleClickTime] = useState<number | null>(null);
  const [mealToDelete, setMealToDelete] = useState<string | null>(null); // Popup control

  // Handle double-tap to mark as favorite
  const handleDoubleTap = (idMeal: string) => {
    const now = Date.now();
    if (doubleClickTime && now - doubleClickTime < 300) {
      handleFavorites(idMeal);
    }
    setDoubleClickTime(now);
  };

  const filteredMeals = meals.filter((meal) =>
    Object.values(meal).join('').toLowerCase().includes(search.toLowerCase())
  );

  // Confirm deletion
  const confirmDelete = (idMeal: string) => {
    handleFavorites(idMeal); // Perform the deletion
    setMealToDelete(null); // Close the popup
  };

  // Scroll to the specific meal element
  const scrollToMeal = (idMeal: string) => {
    const element = document.getElementById(idMeal);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Toggle favorite status with deletion confirmation
  const handleFavoriteToggle = (idMeal: string) => {
    if (favorites.includes(idMeal)) {
      setMealToDelete(idMeal); // Show popup for deletion
    } else {
      handleFavorites(idMeal); // Add to favorites directly
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-20 relative">
      {mealToDelete && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="mb-4">Are you sure you want to delete this favorite dish?</p>
            <div className="flex justify-end gap-3">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => confirmDelete(mealToDelete)}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded-md"
                onClick={() => setMealToDelete(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {meals.length === 0 || filteredMeals.length === 0 ? (
        <p
          className={clsx(
            'text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 mx-auto',
            filteredMeals.length === 0 ? 'text-5xl' : 'text-8xl'
          )}
        >
          {meals.length === 0 ? 'Loading...' : 'No meals for this search'}
        </p>
      ) : (
        <div className="max-sm:w-10/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {filteredMeals.length > 0 &&
            filteredMeals.map(
              ({
                idMeal,
                strMeal,
                strMealThumb,
                strIngredient1,
                strIngredient2,
                strIngredient3,
              }) => (
                <section
                  key={idMeal}
                  id={idMeal}
                  className="relative flex flex-col gap-3 p-3 my-3 pb-1 bg-white rounded-md shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
                  onDoubleClick={() => handleDoubleTap(idMeal)}
                >
                  <img
                    src={strMealThumb}
                    alt={strMeal}
                    width={300}
                    height={300}
                    className="w-full h-[300px] rounded-md transition-transform"
                    onClick={() => scrollToMeal(idMeal)}
                  />
                  <button
                    type="button"
                    onClick={() => handleFavoriteToggle(idMeal)} // Toggle with popup for deletion
                    className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-lg transition-transform duration-300 hover:scale-125 text-2xl"
                  >
                    {favorites.includes(idMeal) ? (
                      <MdOutlineFavorite className="fill-red-500" />
                    ) : (
                      <MdOutlineFavoriteBorder className="fill-blue-500" />
                    )}
                  </button>
                  <div className="p-3">
                    <h4 className="text-xl font-semibold text-center cursor-pointer" onClick={() => scrollToMeal(idMeal)}>
                      {strMeal}
                    </h4>
                    <div className="flex justify-between mt-3">
                      <small className="flex-1 text-center bg-red-200 px-2 py-1 rounded-md mx-1">
                        {strIngredient1}
                      </small>
                      <small className="flex-1 text-center bg-green-200 px-2 py-1 rounded-md mx-1">
                        {strIngredient2}
                      </small>
                      <small className="flex-1 text-center bg-yellow-200 px-2 py-1 rounded-md mx-1">
                        {strIngredient3}
                      </small>
                    </div>
                  </div>
                </section>
              )
            )}
        </div>
      )}
    </div>
  );
};

export default MealsDisplay;
