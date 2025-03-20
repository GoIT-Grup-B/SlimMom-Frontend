import { useEffect } from 'react';

function DailyCaloryModal({ setDailyRate, dailyRate }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setDailyRate(null);
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [setDailyRate]);

  const handleOutsideClick = (e) => {
    if (e.target.id === 'modal-overlay') {
      setDailyRate(null);
    }
  };

  return (
    <div
      id="modal-overlay"
      onClick={(e) => handleOutsideClick(e)}
      className="absolute w-full h-full bg-white md:bg-gray-500/50 flex items-center justify-center"
    >
      <div className="py-[40px] px-[20px] flex flex-col  bg-white  ">
        <h2 className="font-bold text-[18px]">
          Your recommended daily calorie intake is
        </h2>

        <h2 className="font-bold text-[48px] text-center">
          {dailyRate.dailyRate}
          <span className="font-bold text-[16px]">KCAL</span>
        </h2>

        <div className="border-t border-gray-200 pt-[20px]">
          <h2 className="font-bold text-[14px] mb-[20px]">
            Foods you should not eat
          </h2>
          <ol className="list-decimal list-inside text-[#9B9FAA]">
            {dailyRate.notAllowedFoods.map((food) => {
              food = food.split('')[0].toUpperCase() + food.slice(1);
              return <li key={food}>{food}</li>;
            })}
          </ol>
        </div>

        <button
          onClick={() => setDailyRate(null)}
          type="submit"
          className="font-bold bg-orange-500 text-white p-2 rounded-full px-[25px] py-[13px] mt-[40px]"
        >
          Start losing weight
        </button>
      </div>
    </div>
  );
}

export default DailyCaloryModal;
