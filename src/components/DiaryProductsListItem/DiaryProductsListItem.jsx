import React from 'react';

export const DiaryProductsListItem = ({grams, name, calories}) => {
    return (
      <>
        <li className='flex gap-5'>
                <p>{name}</p>
                <p>{grams}</p>
                <p>{calories}</p>
                <button>X</button>
        </li>
      </>
    );
};
