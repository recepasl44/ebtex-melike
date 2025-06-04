
import { SaveDailyDataPayload } from "./add";

/**
 * Re‐use exactly the same shape as SaveDailyDataPayload:
 * {
 *   personel_id: number;
 *   year: number;
 *   month: number;
 *   rows: Array<{
 *     day: number;
 *     dersSayisi: number;
 *     soruSayisi: number;
 *     dersUcreti: number;
 *   }>;
 * }
 */
export type UpdateDailyDataPayload = SaveDailyDataPayload;

export interface DailyDataUpdateState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
