using Microsoft.Data.SqlClient;
using PhoneStore.Model;
using System.Data;

namespace PhoneStore.Data.Address
{
    public class AddressRepository
    {
        private IConfiguration _configuration;

        public AddressRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        #region GetAllAddress
        public List<AddressModel> GetAllBill()
        {
            var address = new List<AddressModel>();
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_Address_SelectAll";
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                address.Add(new AddressModel
                {
                    AddressID = Convert.ToInt32(reader["AddressID"]),
                    UserID = Convert.ToInt32(reader["UserID"]),
                    UserName = reader["UserName"].ToString(),
                    Address = reader["Address"].ToString(),
                    Country = reader["Country"].ToString(),
                    State = reader["State"].ToString(),
                    City = reader["City"].ToString(),
                    Pincode = reader["Pincode"].ToString(),
                });
            }
            connection.Close();
            return address;
        }
        #endregion

        #region GetByAddressID
        public List<AddressModel> GetByAddressID(int AddressID)
        {
            var address = new List<AddressModel>();
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_Address_SelectByPK";
            command.Parameters.AddWithValue("AddressID", AddressID);
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                address.Add(new AddressModel
                {
                    AddressID = Convert.ToInt32(reader["AddressID"]),
                    UserID = Convert.ToInt32(reader["UserID"]),
                    UserName = reader["UserName"].ToString(),
                    Address = reader["Address"].ToString(),
                    Country = reader["Country"].ToString(),
                    State = reader["State"].ToString(),
                    City = reader["City"].ToString(),
                    Pincode = reader["Pincode"].ToString(),
                });
            }
            connection.Close();
            return address;
        }
        #endregion

        #region InsertAddress
        public bool InsertAddress(AddressModel address)
        {
            bool isInserted = false;
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_address_Insert";
            command.Parameters.AddWithValue("UserID", address.UserID);
            command.Parameters.AddWithValue("Address", address.Address);
            command.Parameters.AddWithValue("Country", address.Country);
            command.Parameters.AddWithValue("State", address.State);
            command.Parameters.AddWithValue("City", address.City);
            command.Parameters.AddWithValue("Pincode", address.Pincode);

            int rowsAffected = command.ExecuteNonQuery();
            isInserted = rowsAffected > 0;
            return isInserted;
        }
        #endregion
    }
}
