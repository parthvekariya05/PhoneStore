using System.Data.Common;
using System.Data;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using PhoneStore.Model;

namespace PhoneStore.Data.PhoneDetail
{
    public class PhoneDetailRepository
    {
        private IConfiguration _configuration;

        public PhoneDetailRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        #region GetAllPhone
        public List<PhoneDetailModel> GetAllPhone()
        {
            var phones = new List<PhoneDetailModel>();
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_PhoneDetail_SelectAll";
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                phones.Add(new PhoneDetailModel
                {
                    PhoneID = Convert.ToInt32(reader["PhoneID"]),
                    PhoneName = reader["PhoneName"].ToString(),                    
                    PhoneImage = reader["PhoneImage"].ToString(),
                    Price = Convert.ToInt32(reader["Price"]),
                    Phone_BrandID = Convert.ToInt32(reader["Phone_BrandID"]),                    
                    Phone_BrandName = reader["Phone_BrandName"].ToString(),
                    Phone_StorageID = Convert.ToInt32(reader["Phone_StorageID"]),                   
                    Phone_Storage = reader["Phone_Storage"].ToString(),
                });
            }
            connection.Close();
            return phones;
        }
        #endregion

        #region GetByPhoneID
        public List<PhoneDetailModel> GetByPhoneID(int PhoneID)
        {
            var phone = new List<PhoneDetailModel>();
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_PhoneDetail_SelectByPK";
            command.Parameters.AddWithValue("PhoneID", PhoneID);
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                phone.Add(new PhoneDetailModel
                {
                    PhoneID = Convert.ToInt32(reader["PhoneID"]),
                    PhoneName = reader["PhoneName"].ToString(),                    
                    PhoneImage = reader["PhoneImage"].ToString(),
                    Price = Convert.ToInt32(reader["Price"]),
                    Phone_BrandID = Convert.ToInt32(reader["Phone_BrandID"]),
                    Phone_BrandName = reader["Phone_BrandName"].ToString(),
                    Phone_StorageID = Convert.ToInt32(reader["Phone_StorageID"]),                    
                    Phone_Storage = reader["Phone_Storage"].ToString(),
                });
            }
            connection.Close();
            return phone;
        }
        #endregion

        #region DeleteByPhoneID
        public bool DeletePhone(int PhoneID)
        {
            bool isDeleted = false;
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_PhoneDetail_Delete";
            command.Parameters.AddWithValue("PhoneID", PhoneID);
            int rowsAffected = command.ExecuteNonQuery();
            isDeleted = rowsAffected > 0;
            return isDeleted;
        }
        #endregion

        #region InsertPhone
        public bool InsertPhone(PhoneInsertUpdateModel phone)
        {           
            bool isInserted = false;
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_PhoneDetail_Insert";
            command.Parameters.AddWithValue("PhoneName", phone.PhoneName);
            command.Parameters.AddWithValue("PhoneImage", phone.PhoneImage);
            command.Parameters.AddWithValue("Price", phone.Price);
            command.Parameters.AddWithValue("Phone_BrandID", phone.Phone_BrandID);
            command.Parameters.AddWithValue("Phone_StorageID", phone.Phone_StorageID);
            int rowsAffected = command.ExecuteNonQuery();
            isInserted = rowsAffected > 0;
            return isInserted;
        }
        #endregion

        #region UpdatePhone
        public bool UpdateCity(PhoneInsertUpdateModel phone)
        {
            bool isUpdate = false;
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_PhoneDetail_Update";
            command.Parameters.AddWithValue("PhoneID", phone.PhoneID);
            command.Parameters.AddWithValue("PhoneName", phone.PhoneName);
            command.Parameters.AddWithValue("PhoneImage", phone.PhoneImage);
            command.Parameters.AddWithValue("Price", phone.Price);
            command.Parameters.AddWithValue("Phone_BrandID", phone.Phone_BrandID);
            command.Parameters.AddWithValue("Phone_StorageID", phone.Phone_StorageID);
            int rowsAffected = command.ExecuteNonQuery();
            isUpdate = rowsAffected > 0;
            return isUpdate;
        }

        #endregion

        #region brand
        #region Phone_BrandDropDownModel
        public List<Phone_BrandDropDownModel> Phone_BrandDropDownModel()
        {
            var brand = new List<Phone_BrandDropDownModel>();
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_PhoneBrand_DropDown";
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                brand.Add(new Phone_BrandDropDownModel
                {
                    Phone_BrandID = Convert.ToInt32(reader["Phone_BrandID"]),
                    Phone_BrandName = reader["Phone_BrandName"].ToString(),

                });
            }
            connection.Close();
            return brand;
        }
        #endregion

        #region GetByBrandID
        public List<Phone_BrandDropDownModel> GetByBrandID(int Phone_BrandID)
        {
            var phone = new List<Phone_BrandDropDownModel>();
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_PhoneBrand_SelectByPK";
            command.Parameters.AddWithValue("Phone_BrandID", Phone_BrandID);
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                phone.Add(new Phone_BrandDropDownModel
                {
                    Phone_BrandID = Convert.ToInt32(reader["Phone_BrandID"]),
                    Phone_BrandName = reader["Phone_BrandName"].ToString(),
                });
            }
            connection.Close();
            return phone;
        }
        #endregion

        #region Phone_BrandInsert
        public bool Phone_BrandInsert(Phone_BrandInsert phone)
        {
            bool isInserted = false;
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_PhoneBrand_Insert";
            command.Parameters.AddWithValue("Phone_BrandName", phone.Phone_BrandName);

            int rowsAffected = command.ExecuteNonQuery();
            isInserted = rowsAffected > 0;
            return isInserted;
        }
        #endregion

        #region UpdateBrand
        public bool UpdateBrand(Phone_BrandDropDownModel phone)
        {
            bool isUpdate = false;
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_PhoneBrand_Update";
            command.Parameters.AddWithValue("Phone_BrandID", phone.Phone_BrandID);
            command.Parameters.AddWithValue("Phone_BrandName", phone.Phone_BrandName);           
            int rowsAffected = command.ExecuteNonQuery();
            isUpdate = rowsAffected > 0;
            return isUpdate;
        }

        #endregion

        #region DeleteBrand
        public bool DeleteBrand(int Phone_BrandID)
        {
            bool isDeleted = false;
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_PhoneBrand_Delete";
            command.Parameters.AddWithValue("Phone_BrandID", Phone_BrandID);
            int rowsAffected = command.ExecuteNonQuery();
            isDeleted = rowsAffected > 0;
            return isDeleted;
        }
        #endregion

        #endregion

        #region Phone_StorageDropDownModel
        public List<Phone_StorageDropDownModel> Phone_StorageDropDownModel()
        {
            var storage = new List<Phone_StorageDropDownModel>();
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_PhoneStorage_DropDown";
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                storage.Add(new Phone_StorageDropDownModel
                {
                    Phone_StorageID = Convert.ToInt32(reader["Phone_StorageID"]),                    
                    Phone_Storage = reader["Phone_Storage"].ToString(),
                });
            }
            connection.Close();
            return storage;
        }
        #endregion

        #region PhoneCount
        public List<PhoneCountModel> PhoneCount()
        {
            var billcount = new List<PhoneCountModel>();
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_Phone_Count";
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                billcount.Add(new PhoneCountModel
                {
                    PhoneCount = Convert.ToInt32(reader["PhoneCount"]),
                });
            }
            connection.Close();
            return billcount;
        }
        #endregion
    }
}