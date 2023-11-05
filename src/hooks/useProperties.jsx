import { useQuery } from "react-query";
import { getAllProperties } from "../utils/api";

export default function useProperties() {
  // const {data,isLoading, isError, refetch} = useQuery({
  //     queryKey: 'allProperties',  // this key will be used to cache the response of our API call. It's an array of strings
  // });
  const { data, isLoading, isError, refetch } = useQuery(
    "allProperties",
    getAllProperties,
    {
      refetchOnWindowFocus: false,
    }
  );

  return {
    data,
    isError,
    isLoading,
    refetch,
  };
}
