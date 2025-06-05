export const getHeaderBlockColor = (ordered_list_type: number): string => {
  switch (ordered_list_type) {
    case 1:  // 2. ve 3. sınıf 
    case 2:  // 4. ve 5. sınıf
      return "#27AEEB"; 
    case 3:   // 5,6,7 . sınıflar 
      return "#FF5D9F";
    case 4:   // lgs derslere göre sıralı liste
      return "#E354D4";
    case 5: // 9 ve 10. sınıflar sayısal
    case 6:  // 9 ve 10. sınıflar testlere göre sıralı liste
      return "#FE7C58";
    case 7:  // 11 sınıf sayısal derslere göre sıralı liste
    case 8:  // 11 sınıf sayısal testlere göre sıralı liste
    case 9:  // 11 sınıf sözel derslere göre sıralı liste
    case 10: // 11 sınıf sözel testlere göre sıralı liste
    case 11: // 11 sınıf eşit derslere göre sıralı liste
    case 12: // 11 sınıf eşit testlere göre sıralı liste
      return "#FB4242";
    default:
      return "#A76BF8"; 
  }
};