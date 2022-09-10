import { useState } from "react";
import Select from "react-select";
const options = [{ value: "Tomato", label: "Tomato", product_id: "i3iii3434343409343ewpewopie3" }];

export default function Search() {
  const [selectedOption, setSelectedOption] = useState("Apple");

  return (
    <Select
      placeholder="Type here..."
      defaultValue={selectedOption}
      onChange={setSelectedOption}
      options={options}
    />
  );
}
