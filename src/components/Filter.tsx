import { useEffect, useState } from "react";

interface filterPropTypes {
  filterName: string;
  options: Array<string>;
}

const Filter: any = (props: filterPropTypes) => {
  return (
    <div className='filter-component'>
      <label>{props.filterName}</label>
      <select>
        {props.options?.length && (
          props.options.map((optionName, key) => {
            return <option key={key} value={optionName}>{optionName}</option>
          }
          ))}
      </select>
    </div>
  )
};

export default Filter;
