namespace CreditCardWebApp.Models
{
    public class CardDetails
    {
        public string CardHolder { get; set; }      
        public string CardNumber { get; set; }
        public string Cvv { get; set; }
        public string CardProvider { get; set; }
        public string FullName { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string ZipCode { get; set; }
        public DateTime ExpiryDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
