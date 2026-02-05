// hooks/useRole.js
import { useQuery } from '@tanstack/react-query';

import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data } = useQuery({
    queryKey: ['role', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}/role`);
      return res.data.role; // <-- role string
    },
    enabled: !!user?.email // only run if email exists
  });

  const role = data || "user"; // default to "user"
  return { role, isLoading };
};

export default useRole;