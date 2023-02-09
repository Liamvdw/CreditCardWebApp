using CreditCardWebApp.Controllers;
using CreditCardWebApp.Models;
using CreditCardWebApp.Providers;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Assert = Microsoft.VisualStudio.TestTools.UnitTesting.Assert;

namespace CreditCardWebAppTest
{
    [TestClass]
    public class Tests
    {
        private Repository repository = new Repository();
        private readonly ILogger<CardDetails> logger;

        [TestMethod]
        public void DeleteCreditCardTest()
        {
            //arrange
            string creditCard = "4444444444444444";
            var controller = new CreditCardController(logger, repository);

            //act            
            controller.Delete(creditCard);

            var result = controller.GetCards().ToList();
            var isDeleted = result.Select(s => s.CardNumber == creditCard).FirstOrDefault();

            //assert
            Assert.IsTrue(isDeleted);

        }

        [TestMethod]
        public void GetCreditCardTest()
        {
            //arrange                        
            var controller = new CreditCardController(logger, repository);

            //act            
            var result = controller.GetCards();

            //assert
            Assert.IsNotNull(result);

        }

        [TestMethod]
        public void UpdateCreditCardDetailsTest()
        {
            //arrange
            var controller = new CreditCardController(logger, repository);

            CardDetails cardDetails = new CardDetails()
            {
                CardHolder = "Ronald Weasley",
                CardNumber = "4444444444444444",
                CardProvider = "American Express",
                Cvv = "226",
                ExpiryDate = new DateTime(2023, 06, 25),
                Address = "856 Karoo Park, Durbanville",
                City = "Cape Town",
                Email = "example@test.com",
                FullName = "Ronald Weasley",
                Province = "Western Cape",
                ZipCode = "5564",
                UpdatedDate = new DateTime()
            };            

            //act            
            controller.Update(cardDetails.CardNumber);

            var result = controller.GetCards();


            //assert
            Assert.IsNotNull(result);

        }

        [TestMethod]
        public void AddCreditCardDetailsTest()
        {
            //arrange
            var controller = new CreditCardController(logger, repository);

            CardDetails cardDetails = new CardDetails()
            {
                CardHolder = "Ronald Weasley",
                CardNumber = "4444444444444444",
                CardProvider = "American Express",
                Cvv = "226",
                ExpiryDate = new DateTime(2023, 06, 25),
                Address = "856 Karoo Park, Durbanville",
                City = "Cape Town",
                Email = "example@test.com",
                FullName = "Ronald Weasley",
                Province = "Western Cape",
                ZipCode = "5564",
                UpdatedDate = new DateTime(),
                CreatedDate = new DateTime()
            };

            //act            
            controller.Save(cardDetails);

            var result = controller.GetCards();

            //assert
            Assert.IsNotNull(result);

        }
    }
}