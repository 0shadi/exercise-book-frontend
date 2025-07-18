const checkUserAuthentication = (val: number) => {
  return 2;
};

export enum authenticationEnum {
  Super_Admin = 1,
  Home_Dashboard = 2,
  Online_Ordering = 3,
  Customized_Book_Ordering = 4,
  All_Orders = 5,
  All_Customized_Orders = 6,
  System_Privileges = 7,
  Privilege_Groups = 8,
  Employee_Login = 9,
  Customer_Login = 10,
  Employee_Registration = 11,
  Customer_Registration = 12,
  Item_Registration = 13,
  supplier_Registration = 14,
  Selling_Items = 15,
  GRN = 16,
  Product_Item_Map = 17,
  Stock = 18,
  Employee_List = 19,
  Sales_Stats = 20,
  Customer_List = 21,
}
