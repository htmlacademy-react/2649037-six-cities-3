import { CityName } from '../../store/reducer';

type Props = {
  cities: CityName[];
  activeCity: CityName;
  onCityChange: (city: CityName) => void;
};

export function CitiesList({ cities, activeCity, onCityChange }: Props) {
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li key={city} className="locations__item">
          <a
            href="#"
            className={
              city === activeCity
                ? 'locations__item-link tabs__item tabs__item--active'
                : 'locations__item-link tabs__item'
            }
            onClick={(evt) => {
              evt.preventDefault();
              onCityChange(city);
            }}
          >
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
