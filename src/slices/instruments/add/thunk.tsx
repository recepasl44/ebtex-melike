import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { INSTRUMENTS } from "../../../helpers/url_helper";
import { InstrumentAddPayload } from "../../../types/instruments/add";
import { Instrument } from "../../../types/instruments/list";

export const addInstrument = createAsyncThunk<Instrument, InstrumentAddPayload>(
  "instrument/addInstrument",
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(INSTRUMENTS, payload);
      return resp.data.data as Instrument;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Add instrument failed"
      );
    }
  }
);
