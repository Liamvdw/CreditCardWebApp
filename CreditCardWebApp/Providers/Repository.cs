using CreditCardWebApp.Constants;
using CreditCardWebApp.Controllers;
using CreditCardWebApp.Models;
using CreditCardWebApp.Providers.Interface;
using System.Data;
using System.Data.Common;
using System.Data.SQLite;

namespace CreditCardWebApp.Providers
{
    public class Repository : IRepository
    {        
        public Repository()
        {            
            CreateDB();
        }

        public void CreateDB()
        {
            //System.IO.File.Delete(Path.Combine(@".\CreditCard.sqlite"));
            if (!System.IO.File.Exists(@".\CreditCard.sqlite"))
            {
                SQLiteConnection.CreateFile("CreditCard.sqlite");

                SQLiteConnection m_dbConnection = new SQLiteConnection("Data Source=CreditCard.sqlite;Version=3;");
                m_dbConnection.Open();

                SQLiteCommand creditCardTable = new SQLiteCommand(QueryConstants.CreateTable, m_dbConnection);
                //SQLiteCommand creditProviderTable = new SQLiteCommand(QueryConstants.CreateProviderTable, m_dbConnection);
                
                //creditProviderTable.ExecuteNonQuery();
                creditCardTable.ExecuteNonQuery();
                

                m_dbConnection.Close();
            }
        }

        public void ExecuteWrite(string query, Dictionary<string, object> args)
        {
            //setup the connection to the database
            using (var con = new SQLiteConnection("Data Source=CreditCard.sqlite;Version=3;"))
            {
                con.Open();

                //open a new command
                using (var cmd = new SQLiteCommand(query, con))
                {
                    //set the arguments given in the query
                    foreach (var pair in args)
                    {
                        cmd.Parameters.AddWithValue(pair.Key, pair.Value);
                    }

                    cmd.ExecuteNonQuery();
                }

                con.Close();

            }
        }

        public DataTable Execute(string query, Dictionary<string, object> args)
        {
            if (string.IsNullOrEmpty(query.Trim()))
                return null;

            using (var con = new SQLiteConnection("Data Source=CreditCard.sqlite;Version=3;"))
            {
                con.Open();
                using (var cmd = new SQLiteCommand(query, con))
                {
                    foreach (KeyValuePair<string, object> entry in args)
                    {
                        cmd.Parameters.AddWithValue(entry.Key, entry.Value);
                    }

                    var da = new SQLiteDataAdapter(cmd);

                    var dt = new DataTable();
                    da.Fill(dt);

                    da.Dispose();
                    return dt;
                }
            }
        }
        
    }
}
