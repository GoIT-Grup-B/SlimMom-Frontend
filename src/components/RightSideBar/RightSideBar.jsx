import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
// 5- Burada reduxu import ettim - METE!!
import { useSelector } from 'react-redux';

// 1- Buraya benim gönderdiğim date değişkenini prop olarak getirmesini sağladım - METE!!
const RightSideBar = ({ selectedDate, date, products }) => {
  const [dailyRate, setDailyRate] = useState(0);
  const [notAllowedFoods, setNotAllowedFoods] = useState([]);
  const [consumedCalories, setConsumedCalories] = useState(0);
  const [status, setStatus] = useState('idle');
  const [fetchedDate, setFetchedDate] = useState('');
  // 6- Burada tokeni çağırdım ve artık bu değişken token olarak kullanılmaya hazır - METE!!
  const { token } = useSelector((state) => state.auth);

  const leftCalories = dailyRate - consumedCalories;
  // 2- Burada gönderdiğim date değerini doğru ve kullanılabilir bir formata çevirmesini sağladım - METE!!
  //2a- Gelen date değeri Mon Mar 24 2025 15:22:26 GMT+0300 (GMT+03:00) - METE!!

  try {
    date = new Date(date).toISOString().split('T')[0];
  } catch (err) {
    console.log(err);
  }
  // 2b- Çevrilmiş date değeri 2025-03-24 - METE!!

  // Günlük kalori ihtiyacı ve yasaklı yiyecekleri çek
  useEffect(() => {
    const fetchDailyInfo = async () => {
      setStatus('loading');
      try {
        const tokenData = localStorage.getItem('persist:auth');
        const token = tokenData
          ? JSON.parse(JSON.parse(tokenData).token)
          : null;

        const res = await axios.get(
          `https://slimmom-backend-s8n8.onrender.com/user/my-daily-calory-needs?`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setDailyRate(res.data.data.dailyRate || 0);
        setNotAllowedFoods(res.data.data.notAllowedFoods || []);
        setStatus('succeeded');
      } catch (err) {
        console.log(
          'Daily Info Error:',
          err.response?.data?.message || 'Error',
        );
        setStatus('failed');
      }
    };

    fetchDailyInfo();
  }, []);

  // Günlük tüketilen kalori ve tarihi çek
  useEffect(() => {
    const fetchDailyCalories = async () => {
      try {
        const res = await axios.get(
          //3- Burada benim gönderdiğim date değerini doğru bir şekilde almasını sağladım - METE!!
          `https://slimmom-backend-s8n8.onrender.com/user/my-daily-calories?date=${date}`,
          {
            headers: {
              // 4- Burada verilen token değerinin doğru alınmasını sağlamak için redux kullandum. Bu commentin devamı sayfanın en yukarısında - METE!!
              Authorization: `Bearer ${token}`,
            },
          },
        );
        //7- Buradaki console.log yardımıyla gelen cevaptan hangi verilerin alınması gerektiğini gördüm - METE!!
        console.log('RES:', res.data);
        //   8- Burada dönen cevaptan almak istediğim verileri seçtim - METE!!
        setConsumedCalories(res.data.totalCalories || 0);
        setFetchedDate(res.data.date);
      } catch (err) {
        console.log('Daily Calories Error:', err);
      }
    };
    // 9- Hiçbir koşula bağlı kalmadan her useEffect kullanımında bu fonksiyonun çalışması gerektiğini belirttim - METE!!
    fetchDailyCalories();
    //   10- Aşağıdaki verilenden herhangi biri değiştiğinde fonksiyonun tekrar çalışmasını sağladım böylelikle consumed calories her zaman güncel kalacak - METE!!
  }, [selectedDate, date, token, products]);

  return (
    <aside
      className="
        relative
        flex flex-col 
        items-start 
        justify-center 
        gap-8
        w-full
        md:w-[600px]
        min-h-[400px] md:min-h-screen
        p-6 md:p-10
        bg-gray-50
        rounded-lg
        shadow-md
        bg-[url('yapraklar.png')]
        bg-no-repeat
        bg-[position:70%_top]
        md:bg-[position:12px_35px]
        md:bg-[length:auto_100%]
      "
    >
      {/* Summary */}
      <div className="flex flex-col items-start gap-4 mb-12 w-full">
        <h3 className="font-verdana font-bold text-sm tracking-wider">
          Summary for{' '}
          {fetchedDate ||
            (selectedDate ? format(selectedDate, 'dd.MM.yyyy') : '')}
        </h3>
        {status === 'loading' ? (
          <p>Loading...</p>
        ) : (
          <ul className="text-[#9B9FAA] font-[Verdana] text-[14px] leading-[18px] tracking-[0.04em] space-y-4 w-full">
            <li className="flex justify-between gap-4">
              <span>Left</span>
              <span>{leftCalories >= 0 ? leftCalories : 0} kcal</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>Consumed</span>
              <span>{consumedCalories ?? 0} kcal</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>Daily rate</span>
              <span>{dailyRate ?? 0} kcal</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>% of normal</span>
              <span>
                {dailyRate
                  ? `${Math.round((consumedCalories / dailyRate) * 100)}%`
                  : '0%'}
              </span>
            </li>
          </ul>
        )}
      </div>

      {/* Yasaklı yiyecekler */}
      <div className="flex flex-col items-start gap-4 w-full">
        <h3 className="text-md font-bold">Food not recommended</h3>
        {notAllowedFoods?.length > 0 ? (
          <ul className="text-[#9B9FAA] font-[Verdana] text-[14px] list-decimal list-inside space-y-2">
            {notAllowedFoods.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No food restrictions</p>
        )}
      </div>
    </aside>
  );
};

export default RightSideBar;
