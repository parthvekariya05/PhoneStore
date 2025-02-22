namespace PhoneStore.Model
{
    public class PhoneDetailModel
    {
        public int? PhoneID { get; set; }
        public string PhoneName { get; set; }        
        public int Price { get; set; }      
        public string PhoneImage { get; set; }       
        public int Phone_BrandID {  get; set; }
        public int Phone_StorageID {  get; set; }
        public string? Phone_BrandName { get; set; }     
        public string? Phone_Storage { get; set; }
        public DateTime? CreateAt {  get; set; }
        public DateTime? ModifyAt { get; set; }
    }

    public class PhoneInsertUpdateModel
    {
        public int PhoneID { get; set; }
        public string PhoneName { get; set; }
        public int Price { get; set; }
        public string PhoneImage { get; set; }
        public int Phone_BrandID { get; set; }
        public int Phone_StorageID { get; set; }      
    }
    public class Phone_BrandDropDownModel()
    {
        public int Phone_BrandID { get; set; }
        public string? Phone_BrandName { get;set; }
    }

    public class Phone_BrandInsert()
    {
        public string? Phone_BrandName { get; set; }
    }
    public class Phone_StorageDropDownModel()
    {
        public int Phone_StorageID { get; set; }        
        public string? Phone_Storage { get; set; }
    }

    public class PhoneCountModel
    {
        public int PhoneCount { get; set; }
    }
}
