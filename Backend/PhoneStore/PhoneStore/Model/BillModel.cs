namespace PhoneStore.Model
{
    public class BillModel
    {
        public int BillID { get; set; }
        public int UserID { get; set; }
        public string? UserName { get; set; }
        //public int AddressID { get; set; }
        public string Address { get; set; }
        public int PhoneID {  get; set; }
        public string? PhoneName { get; set; }
        //public int StorageID {  get; set; }
        public string? Phone_Storage {  get; set; }
        public string Payment {  get; set; }
        public string? Status { get; set; } 
    }

    public class BillInsertModel
    {
        public int UserID { get; set; }
        //public int AddressID { get; set; }
        public string Address { get; set; }
        public int PhoneID { get; set; }
        public string Payment { get; set; }

    }

    public class BillCountModel
    {
        public int BillCount { get; set; }
    }
}
