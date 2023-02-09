using System.Data;

namespace CreditCardWebApp.Providers.Interface
{
    public interface IRepository
    {
        void ExecuteWrite(string query, Dictionary<string, object> args);
        DataTable Execute(string query, Dictionary<string, object> args);
    }
}
