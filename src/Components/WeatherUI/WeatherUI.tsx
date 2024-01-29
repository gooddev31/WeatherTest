import { RootInterface } from '@/types/types';

interface IProps {
  data: RootInterface;
  input: string;
  handlerGetDay: (dt_txt: string) => string;
  handlerGetHour: (data: string) => string;
  handlerIconWeather: (name: string) => JSX.Element;
}

export default function WeatherUI({
  data,
  input,
  handlerGetDay,
  handlerGetHour,
  handlerIconWeather,
}: IProps) {
  return (
    <>
      <h1 className="text-center text-3xl font-semibold mb-[25px]">{input}</h1>
      <div className=" flex justify-center gap-[15px] mr-[5%] ml-[5%]">
        {data?.list?.map(({ weather, main, wind, dt_txt }, indx) => {
          return (
            <div
              key={indx}
              className="flex flex-col justify-center items-center bg-orange-300 p-[10px] rounded-xl w-1/5"
            >
              <span className="text-2xl">{handlerGetDay(dt_txt)}</span>
              <span className="text-2xl">{handlerGetHour(dt_txt)}:00</span>
              <div className="flex items-center gap-[15px] mt-[10px]">
                {handlerIconWeather(weather[0].main)}
                <div className="flex flex-col">
                  <span>Min: {(main.temp_min - 273.15).toFixed()} ℃</span>
                  <span>Max: {(main.temp_max - 273.15).toFixed()} ℃</span>
                </div>
              </div>

              <p className="mt-[10px]">Wind: {wind.speed} m/s</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
