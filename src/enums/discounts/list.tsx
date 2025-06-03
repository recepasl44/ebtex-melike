export enum DiscountListStatus {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCEEDED = "SUCCEEDED",
  FAILED = "FAILED",
}

export enum DiscountType {
  PERCENTAGE = "0", // %
  AMOUNT = "1", // +
  GENERAL = "0", // Genel
  PERIODIC = "1", // Dönemsel
}

export default DiscountListStatus;
