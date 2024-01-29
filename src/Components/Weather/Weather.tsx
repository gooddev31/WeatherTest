'use client';
import Image from 'next/image';
import { useState } from 'react';
import Cloud from '@/assets/img/cloud.png';
import Rain from '@/assets/img/rain.png';
import Sun from '@/assets/img/sunny.png';
import Snow from '@/assets/img/snow.png';
import { RootInterface } from '@/types/types';
import WeatherUI from '../WeatherUI/WeatherUI';

const API_KEY = 'b68486ac08c55ff45e1d88a01e3e1248';
const KEY_IMAGE = '36746776-e64b35908dc0b8143507a4db3';

export default function Weather() {
  const [input, setInput] = useState<string>('');
  const [data, setData] = useState<RootInterface | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${input}&cnt=5&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => setData(res));

    fetch(
      `https://pixabay.com/api/?q=${input}&key=${KEY_IMAGE}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then((res) => res.json())
      .then((res) => setImage(res?.hits[0]?.largeImageURL));
  };

  const handlerIconWeather = (name: string) => {
    switch (name) {
      case 'Clouds':
        return <Image src={Cloud} alt="Cloud" width={80} />;
      case 'Rain':
        return <Image src={Rain} alt="Rain" width={60} />;
      case 'Sun':
        return <Image src={Sun} alt="Sun" width={80} />;

      case 'Snow':
        return <Image src={Snow} alt="Snow" width={80} />;

      default:
        return <></>;
    }
  };

  const handlerGetDay = (dt_txt: string) => {
    const day = new Date(dt_txt).getDay().toString();

    if (day === '1') {
      return 'Today';
    } else if (day === '2') {
      return 'Tomorrow';
    }

    return '';
  };

  const handlerGetHour = (dt_txt: string) => {
    return new Date(dt_txt).getHours().toString();
  };

  return (
    <main>
      <form
        className="flex justify-center items-center mt-[50px] mb-[100px]"
        onSubmit={handleSubmit}
      >
        <label htmlFor="" className="flex items-center justify-center">
          <input
            type="text"
            className="  border-[2px] border-black mr-[15px] p-[10px] rounded-xl"
            value={input}
            onChange={(e) => {
              setData(null);
              setInput(e.target.value);
            }}
          />
        </label>
        <button
          type="submit"
          className="bg-orange-300 w-[120px] p-[10px] rounded-xl"
        >
          Search
        </button>
      </form>
      {image !== null && (
        <div className="absolute top-0 opacity-20 rounded-3xl -z-10">
          <img src={image} alt={input} className="w-screen" />
        </div>
      )}
      {data !== null && (
        <WeatherUI
          data={data}
          input={input}
          handlerGetDay={handlerGetDay}
          handlerGetHour={handlerGetHour}
          handlerIconWeather={handlerIconWeather}
        />
      )}
    </main>
  );
}
