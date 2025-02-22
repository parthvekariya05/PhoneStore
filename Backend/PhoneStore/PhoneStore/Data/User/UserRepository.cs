using Microsoft.Data.SqlClient;
using PhoneStore.Data.Contact;
using PhoneStore.Model;
using System.Data;
using System.Data.Common;
using System.Reflection.PortableExecutable;

namespace PhoneStore.Data.User
{
    public class UserRepository
    {
        private IConfiguration _configuration;

        public UserRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        #region GetAllUser
        public List<UserModel> GetAllUser()
        {
            var users = new List<UserModel>();
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_User_SelectAll";
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                users.Add(new UserModel
                {
                    UserID = Convert.ToInt32(reader["UserID"]),
                    UserName = reader["UserName"].ToString(),
                    Password = reader["Password"].ToString(),
                    EmailAddress = reader["EmailAddress"].ToString(),
                    IsAdmin = Convert.ToBoolean(reader["IsAdmin"])                      
                });
            }
            connection.Close();
            return users;
        }
        #endregion

        #region GetByUserID
        public List<UserModel> GetByUserID(int UserID)
        {
            var user = new List<UserModel>();
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_User_SelectByPK";
            command.Parameters.AddWithValue("UserID", UserID);
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                user.Add(new UserModel
                {
                    UserID = Convert.ToInt32(reader["UserID"]),
                    UserName = reader["UserName"].ToString(),
                    Password = reader["Password"].ToString(),
                    EmailAddress = reader["EmailAddress"].ToString(),
                    IsAdmin = Convert.ToBoolean(reader["IsAdmin"])
                });
            }
            connection.Close();
            return user;
        }
        #endregion

        #region DeleteByUserID
        public bool DeleteUser(int UserID)
        {
            bool isDeleted = false;
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_User_Delete";
            command.Parameters.AddWithValue("UserID", UserID);
            int rowsAffected = command.ExecuteNonQuery();
            isDeleted = rowsAffected > 0;
            return isDeleted;
        }
        #endregion

        #region UserRegister
        public bool UserRegister(UserRegisterModel user)
        {
            bool isInserted = false;
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_User_Register";
            command.Parameters.AddWithValue("UserName", user.UserName);
            command.Parameters.AddWithValue("Password", user.Password);
            command.Parameters.AddWithValue("EmailAddress", user.EmailAddress);            
           
            int rowsAffected = command.ExecuteNonQuery();
            isInserted = rowsAffected > 0;
            return isInserted;
        }
        #endregion

        #region UserLogin        
        public UserModel UserLogin(UserLoginModel user)
        {
            UserModel userData = null;
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_User_Login";
            command.Parameters.AddWithValue("UserName", user.UserName);
            command.Parameters.AddWithValue("Password", user.Password);
            SqlDataReader reader = command.ExecuteReader();
            if (reader.Read())
            {
                userData = new UserModel
                {
                    UserID = Convert.ToInt32(reader["UserID"]),
                    UserName = reader["UserName"].ToString(),
                    Password = reader["Password"].ToString(),
                    EmailAddress = reader["EmailAddress"].ToString(),
                    IsAdmin = Convert.ToBoolean(reader["IsAdmin"])
                };
            }
            return userData;
        }
        #endregion

        #region UserUpdate
        public bool UserUpdate(UserUpdateModel user)
        {
            bool isUpdate = false;
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_User_Update";
            command.Parameters.AddWithValue("UserID", user.UserID);
            command.Parameters.AddWithValue("UserName", user.UserName);
            command.Parameters.AddWithValue("Password", user.Password);
            command.Parameters.AddWithValue("EmailAddress", user.EmailAddress);

            int rowsAffected = command.ExecuteNonQuery();
            isUpdate = rowsAffected > 0;
            return isUpdate;
        }

        #endregion

        #region AdminUpdate
        public bool AdminUpdate(int UserID, bool IsAdmin)
        {
            bool isUpdate = false;
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_Admin_Update";
            command.Parameters.AddWithValue("@UserID", UserID);
            command.Parameters.AddWithValue("@IsAdmin", IsAdmin);
            int rowsAffected = command.ExecuteNonQuery();
            isUpdate = rowsAffected > 0;
            return isUpdate;
        }
        #endregion

        #region UserCount
        public List<UserCountModel> UserCount()
        {
            var billcount = new List<UserCountModel>();
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_User_Count";
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                billcount.Add(new UserCountModel
                {
                    UserCount = Convert.ToInt32(reader["UserCount"]),
                });
            }
            connection.Close();
            return billcount;
        }
        #endregion
    }
}
