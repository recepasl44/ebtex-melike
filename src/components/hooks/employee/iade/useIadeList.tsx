import { useRefundList } from "../refund/useRefundList";

export function useIadeList(params: { enabled?: boolean; [key: string]: any }) {
  return useRefundList(params);
}

export default useIadeList;
