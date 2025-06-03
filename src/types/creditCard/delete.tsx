import ICreditCardDeleteStatus from "../../enums/creditCard/list";
export interface ICreditCardDeleteState {
  data: number | null;
  status: ICreditCardDeleteStatus;
  error: string | null;
}
