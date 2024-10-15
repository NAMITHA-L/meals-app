import { useContext, useEffect, useState } from 'react';
import { MealsContext } from '../context/MealsContext';
import { MealsContextType, MealType } from '../lib/types';
import clsx from 'clsx';
import { FaTrash } from 'react-icons/fa';

const Toast = ({ message, onClose }: { message: string; onClose: () => void }) => (
  <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-2 rounded-lg shadow-lg animate-fade-in-out hover:bg-blue-500 transition-colors">
    {message}
    <button onClick={onClose} className="ml-2 bg-transparent hover:text-red-300">
      ✕
    </button>
  </div>
);

const ConfirmModal = ({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105">
        <p className="mb-3 text-lg">{message}</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition-colors duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const Favorites = () => {
  const { favorites, meals, handleFavorites } = useContext(
    MealsContext
  ) as MealsContextType;
  const [isScroll, setIsScroll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [mealToDelete, setMealToDelete] = useState<string | null>(null);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setIsScroll(window.scrollY > 2);
    });

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handleFavoriteToggle = (mealId: string) => {
    setMealToDelete(mealId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (mealToDelete) {
      handleFavorites(mealToDelete);
      setShowModal(false);
      const isFavorite = favorites.includes(mealToDelete);
      setToastMessage(isFavorite ? 'Removed from favorites' : 'Added to favorites');
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  const scrollToMeal = (mealId: string) => {
    const element = document.getElementById(mealId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
<<<<<<< HEAD
      <div className="flex items-center justify-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
=======
      <div
        className={clsx(
          'bg-blue-100 py-0 sticky top-0 z-10',
          isScroll ? 'bg-opacity-50' : 'bg-opacity-80'
        )}
      >
        <section className="w-full mx-auto overflow-auto">
          {/* {!isScroll && (
            <h2 className="text-2xl font-semibold mb-2">Favorites</h2>
          )} */}
          <div className="flex py-3 md:p-5 gap-0 md:gap-5 justify-center text-center overflow-auto first-of-type:pl-12">
            {meals
              .filter((meal: MealType) => favorites.includes(meal.idMeal))
              .map((meal) => (
                <div key={meal.idMeal} className="group relative">
                  <div className="text-center gap-2 flex-col relative">
                    <div className="hidden group-hover:flex rounded-full w-16 h-16 md:w-20 md:h-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -inset-10 bg-red-200 bg-opacity-70 z-10 justify-center items-center font-bold">
                      <h4 className="text-sm md:text-md ">{meal.strMeal}</h4>
                    </div>
                    <div className="p-2 rounded-full bg-red- w-20 h-20 md:w-24 md:h-24">
                      <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        width={30}
                        height={30}
                        className="rounded-full w-full h-full"
                      />
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleFavorites(e, meal.idMeal)}
                    type="button"
                    className="mt-2 hidden group-hover:block mx-auto absolute right-3 bottom-3 z-40"
                  >
                    <small>
                      <FaTrash className="fill-red-500" />
                    </small>
                  </button>
                </div>
              ))}
          </div>
        </section>
>>>>>>> myfork/main
      </div>
    );
  }

  const containerClass = clsx(
    'sticky top-0 z-10 py-1 transition-all duration-300',
    isScroll ? 'bg-blue-100 bg-opacity-70 shadow-lg' : 'bg-blue-100 bg-opacity-90'
  );

  return (
    <div className={containerClass}>
      <section className="w-full sm:w-4/5 lg:w-3/5 mx-auto grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        <h2 className="col-span-full text-xl font-bold uppercase mb-1 text-center relative group">
          Your Favorite Meals
          <span className="block w-full transition-all duration-500 h-1 bg-blue-500 mt-1"></span>
        </h2>

        {favorites.length > 0 ? (
          meals
            .filter((meal: MealType) => favorites.includes(meal.idMeal))
            .map((meal) => (
              <div
                key={meal.idMeal}
                className="group relative p-2 transition-transform animate-fade-in flex flex-col items-center justify-center"
              >
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg bg-blue-50 flex-shrink-0 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  <img
                    src={meal.strMealThumb}
                    alt={`${meal.strMeal} image`}
                    className="object-cover w-full h-full"
                    onClick={() => scrollToMeal(meal.idMeal)}
                  />
                  <button
                    onClick={() => handleFavoriteToggle(meal.idMeal)}
                    type="button"
                    className="absolute top-1 right-1 p-1 rounded-full bg-white shadow-lg text-lg transition-transform duration-300 hover:scale-125 hover:bg-red-100"
                  >
                    <FaTrash className="text-red-500" />
                  </button>
                </div>

                <h4
                  className="mt-1 text-sm font-medium text-center text-gray-700 cursor-pointer transform transition-colors duration-300 hover:text-blue-600 hover:underline"
                  onClick={() => scrollToMeal(meal.idMeal)}
                >
                  {meal.strMeal}
                </h4>
              </div>
            ))
        ) : (
          <div className="py-4 col-span-full text-center">
            <h2 className="text-xl font-semibold w-full">No favorites yet!</h2>
            <p className="mt-1 text-gray-500 w-full">
              Add some meals to your favorites to see them here.
            </p>
          </div>
        )}

        {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}

        {showModal && (
          <ConfirmModal
            message="Are you sure you want to delete this meal from favorites?"
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
        )}
      </section>
    </div>
  );
};

export default Favorites;
