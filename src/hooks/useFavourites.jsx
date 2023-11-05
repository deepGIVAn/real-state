import { useContext, useEffect, useRef } from "react";
import UserDetailContext from "../context/UserDetailContext";
import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { getallfav } from "../utils/api";

export default function useFavourites() {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const {user} = useAuth0();
  const queryRef = useRef();

  const { data, isLoading, isError, refetch } = useQuery({ 
    queryKey:"allFavourites",
    queryFn: () => getallfav(user?.email),
    onSuccess:(data)=>setUserDetails((prev)=>({...prev,favourites:data})),
    enabled: user !== undefined,
    staleTime:30000,
    });

    queryRef.current = refetch;

    useEffect(()=>{
        queryRef.current && queryRef.current();
    },[userDetails])

  return { data, isLoading, isError, refetch };
}
