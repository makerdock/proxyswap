import { useState, useEffect, useCallback, ChangeEvent } from "react";

export const useCSVData = (initialCSVData: string | null) => {
  const [csvData, setCSVData] = useState<string | null>(initialCSVData);
  const [editedCSVData, setEditedCSVData] = useState<string[][] | null>(null);
  const [totalPercentage, setTotalPercentage] = useState<number>(0);

  const handleCSVChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setCSVData(result);
        setEditedCSVData(
          result
            .trim()
            .split("\n")
            .map((row) => row.split(",")),
        );
      };
      reader.readAsText(file);
    }
  }, []);

  useEffect(() => {
    if (csvData) {
      const parsedData = csvData
        .trim()
        .split("\n")
        .map((row) => row.split(","));
      setEditedCSVData(parsedData);
    }
  }, [csvData]);

  useEffect(() => {
    if (editedCSVData) {
      const total = editedCSVData.reduce((total, rowData) => {
        const percentage = parseFloat(rowData[1]);
        if (!isNaN(percentage)) {
          return total + percentage;
        }
        return total;
      }, 0);
      setTotalPercentage(total);
    }
  }, [editedCSVData]);

  return {
    csvData,
    editedCSVData,
    totalPercentage,
    handleCSVChange,
    setEditedCSVData,
    setCSVData,
  };
};
