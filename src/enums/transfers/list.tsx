export enum TransferListStatus {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED',
  }
  
  export enum TransferType {
    SubeI_BankadanNakite = 'sube_ici_bankadan_nakite',
    SubeI_NakitsasadanBankaya = 'sube_ici_nakitsasadan_bankaya',
    SubeI_KredikartindanBankaya = 'sube_ici_kredikartindan_bankaya',
    SubeI_BankadanBankaya = 'sube_ici_bankadan_bankaya',
    SubelerArasi_Nakit = 'subeler_arasi_nakit',
    SubelerArasi_BankadanBankaya = 'subeler_arasi_bankadan_bankaya',
    SubelerArasi_NakitsasadanBankaya = 'subeler_arasi_nakitsasadan_bankaya',
    SubelerArasi_BankadanNakitkasaya = 'subeler_arasi_bankadan_nakitkasaya',
    SubelerArasi_Cek = 'subeler_arasi_cek',
    SubelerArasi_Senet = 'subeler_arasi_senet',
  }
  
  export default TransferListStatus;
  