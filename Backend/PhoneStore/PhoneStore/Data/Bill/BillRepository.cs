using Microsoft.Data.SqlClient;
using PhoneStore.Model;
using System.Data;
using System.Numerics;

namespace PhoneStore.Data.Bill
{
    public class BillRepository
    {
        private IConfiguration _configuration;

        public BillRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        #region GetAllBill
        public List<BillModel> GetAllBill()
        {
            var bills = new List<BillModel>();
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            //command.CommandText = "PR_Bill_SelectAll";
            command.CommandText = "PR_BillTemp_SelectAll";
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                bills.Add(new BillModel
                {
                    BillID = Convert.ToInt32(reader["BillID"]),
                    UserID = Convert.ToInt32(reader["UserID"]),
                    UserName = reader["UserName"].ToString(),
                    //AddressID = Convert.ToInt32(reader["AddressID"]),                    
                    Address = reader["Address"].ToString(),
                    PhoneID = Convert.ToInt32(reader["PhoneID"]),
                    PhoneName = reader["PhoneName"].ToString(),
                    //StorageID = Convert.ToInt32(reader["StorageID"]),
                    Phone_Storage = reader["Phone_Storage"].ToString(),
                    Payment = reader["Payment"].ToString(),
                    Status = reader["Status"].ToString(),
                });
            }
            connection.Close();
            return bills;
        }
        #endregion

        #region InsertBill
        public bool InsertBill(BillInsertModel bill)
        {
            bool isInserted = false;
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            //command.CommandText = "PR_Bill_Insert";
            command.CommandText = "PR_BillTemp_Insert";
            command.Parameters.AddWithValue("UserID", bill.UserID);
            //command.Parameters.AddWithValue("AddressID", bill.AddressID);
            command.Parameters.AddWithValue("Address", bill.Address);
            command.Parameters.AddWithValue("PhoneID", bill.PhoneID);
            command.Parameters.AddWithValue("Payment", bill.Payment);            
            int rowsAffected = command.ExecuteNonQuery();
            isInserted = rowsAffected > 0;
            return isInserted;
        }
        #endregion

        #region BillCount
        public List<BillCountModel> BillCount()
        {
            var billcount = new List<BillCountModel>();
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            //command.CommandText = "PR_Bill_SelectAll";
            command.CommandText = "PR_Bill_Count";
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                billcount.Add(new BillCountModel
                {
                    BillCount = Convert.ToInt32(reader["BillCount"]),                   
                });
            }
            connection.Close();
            return billcount;
        }
        #endregion

        #region GetByUserID
        public List<BillModel> SelectByUserID(int UserID)
        {
            var bill = new List<BillModel>();
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_BillTemp_SelectByUserID";
            command.Parameters.AddWithValue("UserID", UserID);
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                bill.Add(new BillModel
                {
                    BillID = Convert.ToInt32(reader["BillID"]),
                    UserID = Convert.ToInt32(reader["UserID"]),
                    UserName = reader["UserName"].ToString(),
                    //AddressID = Convert.ToInt32(reader["AddressID"]),                    
                    Address = reader["Address"].ToString(),
                    PhoneID = Convert.ToInt32(reader["PhoneID"]),
                    PhoneName = reader["PhoneName"].ToString(),
                    //StorageID = Convert.ToInt32(reader["StorageID"]),
                    Phone_Storage = reader["Phone_Storage"].ToString(),
                    Payment = reader["Payment"].ToString(),
                    Status = reader["Status"].ToString(),
                });
            }
            connection.Close();
            return bill;
        }
        #endregion

        #region BillStatus
        public bool BillStatus(int BillID, string Status)
        {
            bool isUpdate = false;
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_BillTemp_Status";          
            command.Parameters.AddWithValue("@BillID", BillID);
            command.Parameters.AddWithValue("@Status", Status);
            int rowsAffected = command.ExecuteNonQuery();
            isUpdate = rowsAffected > 0;
            return isUpdate;
        }
        #endregion

    }
}
