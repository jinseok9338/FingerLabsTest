import { useCallback, useMemo, useState } from "react";
import { traitTypes } from "../consts";

import { techaData } from "../data";

const numberAddedtechaData = techaData.map((techa) => {
  return {
    ...techa,
    number: techa.name.split("#")[1],
  };
});

const useData = () => {
  const [filters, setFilters] = useState<{
    [key in traitTypes]?: string[];
  }>({} as any);

  const [index, setIndex] = useState<string>("");

  const handleSetIndex = useCallback((int: string) => {
    setIndex(int);
  }, []);

  const handleSetfileters = useCallback(
    (traitType: traitTypes, value: string[]) => {
      setFilters((prev) => {
        const existingValue = {
          ...prev,
          [traitType]: value,
        };
        // get rid of the empty array (value)
        const filtered = Object.entries(existingValue).filter(
          ([_, value]) => value.length > 0
        );
        // convert back to object
        const filteredObject = Object.fromEntries(filtered);
        return filteredObject;
      });
    },
    []
  );

  const filteredTacha = useMemo(() => {
    let data = numberAddedtechaData;
    if (index) {
      data = numberAddedtechaData.filter((techa) =>
        techa.number.includes(index)
      );
    }

    if (Object.keys(filters).length > 0) {
      Object.entries(filters).forEach(([traitType, values]) => {
        data = data.filter((techa) => {
          const attribute = techa.attributes.find(
            (attribute) => attribute.trait_type === traitType
          );
          if (!attribute) {
            return false;
          }
          return values.includes(attribute.value);
        });
      });
    }

    return data;
  }, [filters, index]);

  return {
    filteredTacha,
    handleSetIndex,
    handleSetfileters,
  };
};

export default useData;
