using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace PhoneStore.Model
{
    public class UserModel
    {
        public int? UserID { get; set; }               
        public string UserName { get; set; }                
        public string Password { get; set; }                       
        public string? EmailAddress { get; set; }               
        public bool? IsAdmin { get; set; }        
    }
    public class UserRegisterModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string EmailAddress { get; set; }       
        //public DateTime CreateAt { get; set; }
        //public DateTime ModifyAt { get; set; }
    }    
    public class UserLoginModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }

    public class UserUpdateModel
    {
        public int UserID { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string EmailAddress { get; set; }      
    }

    public class AdminUpdateModel
    {
        public int UserID { get; set; }
        public bool IsAdmin { get; set; }
    }

    public class UserCountModel
    {
        public int UserCount { get; set; }
    }
}
