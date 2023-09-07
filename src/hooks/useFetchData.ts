import { useCallback, useMemo, useState } from "react";
import { traitTypes } from "../consts";

import { Techa } from "../types/techa";
import { techaData } from "../data";

const useData = () => {
  const [data, setData] = useState<Techa[]>(techaData);
  const [filters, setFilters] = useState<
    {
      [key in traitTypes]: string[];
    }[]
  >([]);

  const handleSetfileters = useCallback(
    (traitType: traitTypes, value: string[]) => {
      const newFilters = [...filters];
      const index = newFilters.findIndex((filter) => filter[traitType]);
      if (index === -1) {
        newFilters.push({ [traitType]: value });
      } else {
        newFilters[index] = { [traitType]: value };
      }
      setFilters(newFilters);
    },
    [filters]
  );

  //   const filterTecha = useCallback(
  //     (traitType: traitTypes, value: string) => {
  //       const filteredTecha = data.filter((techa) =>
  //         techa.attributes.find(
  //           (attribute) =>
  //             attribute.trait_type === traitType && attribute.value === value
  //         )
  //       );
  //       return filteredTecha;
  //     },
  //     [data]
  //   );

  const filteredTacha = useMemo(() => {
    console.log("filters", filters);
    if (
      filters.length === 0 ||
      filters.every((filter) =>
        Object.values(filter).every((value) => value.length === 0)
      )
    ) {
      return data;
    }
    let filteredTecha = techaData;
    filters.forEach((filter) => {
      const traitType = Object.keys(filter)[0] as traitTypes;
      const value = filter[traitType];
      filteredTecha = filteredTecha.filter((techa) =>
        techa.attributes.find(
          (attribute) =>
            attribute.trait_type === traitType &&
            value.includes(attribute.value)
        )
      );
    });
    return filteredTecha;
  }, [filters]);

  return {
    filteredTacha,
    // filterTecha,
    handleSetfileters,
  };
};

export default useData;
