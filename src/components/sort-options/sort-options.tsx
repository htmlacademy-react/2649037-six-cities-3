import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { changeSort } from '../../store/action';
import { selectSort } from '../../store/selectors';
import { SortType } from '../../store/reducer';

const SORT_OPTIONS: SortType[] = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];

export const SortOptions = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const currentSort = useAppSelector(selectSort);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSortChange = (sort: SortType) => {
    dispatch(changeSort(sort));
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" onSubmit={(e) => e.preventDefault()}>
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={toggleDropdown}
        onKeyDown={(e) => e.key === 'Enter' && toggleDropdown()}
      >
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {SORT_OPTIONS.map((option) => (
          <li
            key={option}
            className={`places__option ${option === currentSort ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleSortChange(option)}
            onKeyDown={(e) => e.key === 'Enter' && handleSortChange(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
};
