using CreditCardWebApp.Models;

namespace CreditCardWebApp.Constants
{
    public static class QueryConstants
    {
        public const string SelectAll = "SELECT * FROM CreditCard";
        public const string SelectAllProviders = "SELECT * FROM CreditProvider";
        public const string DeleteCreditCard = "DELETE * FROM CreditProvider";
        public const string DropCreditProvider = "DROP TABLE CreditProvider";

        public const string CreateTable = "CREATE TABLE IF NOT EXISTS CreditCard (id INTEGER PRIMARY KEY, cardHolder varchar(30), cardNumber varchar(16), cvv int, cardProvider varchar(30), expiryDate datetime,fullName varchar(30), email varchar(20), address varchar(50), city varchar(30), province varchar(30), zipCode varchar(10), createdDate datetime, updatedDate datetime)";
        public const string Insert = "INSERT INTO CreditCard(cardHolder, cardNumber, cvv, cardProvider, expiryDate, fullName, email, address, city, province, zipCode, createdDate, updatedDate) VALUES(@cardHolder, @cardNumber, @cvv, @cardProvider, @expiryDate, @fullName, @email, @address, @city, @province, @zipCode, @createdDate, @updatedDate)";

        public const string CreateProviderTable = "CREATE TABLE IF NOT EXISTS CreditProvider  (id INTEGER PRIMARY KEY, description varchar(30))";
        public const string InsertProviderTable = "INSERT INTO CreditProvider(description) VALUES(@description)";

        //public const string CreateBillingAddressTable = "CREATE TABLE IF NOT EXISTS BillingAddress (id INTEGER PRIMARY KEY, fullName varchar(30), email varchar(20), address varchar(50), city varchar(30), province varchar(30), zipCode varchar(10), createdDate datetime, updatedDate datetime)";
        //public const string InsertCreateBillingAddressTable = "INSERT INTO BillingAddress(fullName, email, address, city, province, zipCode, createdDate, updatedDate) VALUES(@fullName, @email, @address, @city, @province, @zipCode, @createdDate, @updatedDate)";
    }
}
