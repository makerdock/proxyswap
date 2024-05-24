import { useState, useEffect } from "react";

const useFetchLogo = (fileName: string | null) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!fileName) return;

    const fetchLogoUrl = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/token-logo?fileName=${fileName}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch logo");
        }
        const data: { publicUrl: string } = await response.json();
        setLogoUrl(data.publicUrl || null);
      } catch (error) {
        console.error("Error fetching logo URL:", error);
        setError(error);
      }
    };

    fetchLogoUrl();
  }, [fileName]);

  return { logoUrl, error };
};

export default useFetchLogo;
