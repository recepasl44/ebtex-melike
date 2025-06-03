import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { MEETINGS } from "../../../helpers/url_helper";
import {
  MeetingListResponse,
  MeetingListArg,
} from "../../../types/meetings/list";

export const fetchMeetings = createAsyncThunk<
  MeetingListResponse,
  MeetingListArg
>("meetings/fetchMeetings", async (queryParams, { rejectWithValue }) => {
  try {
    const query = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        // Convert numeric values to strings
        query.append(key, String(value));
      }
    });

    // Use the correctly built query string
    const queryString = query.toString();
    console.log("Query String:", queryString);
    const url = `${MEETINGS}?${queryString}`;
    const resp = await axiosInstance.get(url);
    return resp.data as MeetingListResponse;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Fetch meetings failed"
    );
  }
});
