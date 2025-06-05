import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { addUser } from "../../../slices/user/add/thunk";
import { UserAddPayload } from "../../../types/user/add";

export function useUserAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.userAdd
  );

  const addNewUser = useCallback(
    async (payload: UserAddPayload) => {
      const resultAction = await dispatch(addUser(payload));
      if (addUser.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { addedUser: data, status, error, addNewUser };
}
