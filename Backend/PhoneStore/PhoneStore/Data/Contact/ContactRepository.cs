using Microsoft.Data.SqlClient;
using PhoneStore.Model;
using System.Data;

namespace PhoneStore.Data.Contact
{
    public class ContactRepository
    {
        private IConfiguration _configuration;

        public ContactRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        #region GetAllContact
        public List<ContactModel> GetAllContact()
        {
            var contacts = new List<ContactModel>();
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_Contact_SelectAll";
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                contacts.Add(new ContactModel
                {
                    ContactID = Convert.ToInt32(reader["ContactID"]),
                    EmailAddress = reader["EmailAddress"].ToString(),
                    Description = reader["Description"].ToString(),                  
                });
            }
            connection.Close();
            return contacts;
        }
        #endregion
               
        #region InsertContact
        public bool InsertContact(ContactModel contact)
        {
            bool isInserted = false;
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_Contact_Insert";
            command.Parameters.AddWithValue("EmailAddress", contact.EmailAddress);
            command.Parameters.AddWithValue("Description", contact.Description);            
            int rowsAffected = command.ExecuteNonQuery();
            isInserted = rowsAffected > 0;
            return isInserted;
        }
        #endregion

        #region ContactCount
        public List<ContactCountModel> ContactCount()
        {
            var billcount = new List<ContactCountModel>();
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;            
            command.CommandText = "PR_Contact_Count";
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                billcount.Add(new ContactCountModel
                {
                    ContactCount = Convert.ToInt32(reader["ContactCount"]),
                });
            }
            connection.Close();
            return billcount;
        }
        #endregion
    }
}