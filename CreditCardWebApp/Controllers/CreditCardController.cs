﻿using CreditCardWebApp.Constants;
using CreditCardWebApp.Models;
using CreditCardWebApp.Providers;
using CreditCardWebApp.Providers.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Data;
using System.Reflection;

namespace CreditCardWebApp.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class CreditCardController : ControllerBase
    {
        private readonly ILogger<CardDetails> _logger;
        private IRepository _repo;

        public CreditCardController(ILogger<CardDetails> logger, IRepository repo)
        {
            _repo = repo;
            _logger = logger;
        }

        [HttpPost]
        [Route("Save")]
        public string Save([FromBody] CardDetails cardDetails)
        {
            try
            {
                var args = new Dictionary<string, object>
                {
                    {"@cardHolder", cardDetails.CardHolder},
                    {"@cardNumber", cardDetails.CardNumber},
                    {"@cvv", cardDetails.Cvv},
                    {"@cardProvider", cardDetails.CardProvider},
                    {"@expiryDate", cardDetails.ExpiryDate},
                    {"@fullName", cardDetails.FullName},
                    {"@address", cardDetails.Address},
                    {"@province", cardDetails.Province},
                    {"@city", cardDetails.City},
                    {"@email", cardDetails.Email},
                    {"@zipCode", cardDetails.ZipCode},
                    {"@createdDate", DateTime.Now},
                    {"@updatedDate", DateTime.Now}
                };
                _repo.ExecuteWrite(QueryConstants.Insert, args);


            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
            }
            return "success";
        }

        [HttpGet]
        [Route("GetCards")]
        public List<CardDetails> GetCards()
        {
            var allCards = new List<CardDetails>();
            try
            {
                var args = new Dictionary<string, object>();                
                DataTable dt = repository.Execute(QueryConstants.SelectAll, args);
                string jsonString = string.Empty;
                var response = JsonConvert.SerializeObject(dt);

                //Returns JSON Object
                allCards = JsonConvert.DeserializeObject<List<CardDetails>>(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
            }
            return allCards;
        }

        [HttpDelete]
        [Route("Delete/{creditCard}")]
        public void Delete(string creditCard)
        {
            try
            {
                if (creditCard != "")
                {
                    const string query = "Delete from CreditCard WHERE cardNumber = @cardNumber";

                    var args = new Dictionary<string, object>
                    {
                        {"@cardNumber", creditCard}
                    };

                    _repo.ExecuteWrite(query, args);
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
            }
        }

        [HttpDelete]
        [Route("Update/")]
        public string Update([FromBody] CardDetails cardDetails)
        {
            try
            {
                const string updateQuery = "UPDATE CreditCard SET cardHolder = @cardHolder, cardNumber = @cardNumber, cvv = @cvv, cardProvider = @cardProvider, fullName = @fullName, address = @address, province = @province, city = @city, email = @email, zipCode = @zipCode, updatedDate = @updatedDate WHERE cardNumber = @cardNumber";

                var args = new Dictionary<string, object>
                {
                    {"@cardHolder", cardDetails.CardHolder},
                    {"@cardNumber", cardDetails.CardNumber},
                    {"@cvv", cardDetails.Cvv},
                    {"@cardProvider", cardDetails.CardProvider},
                    {"@expiryDate", cardDetails.ExpiryDate},
                    {"@fullName", cardDetails.FullName},
                    {"@address", cardDetails.Address},
                    {"@province", cardDetails.Province},
                    {"@city", cardDetails.City},
                    {"@email", cardDetails.Email},
                    {"@zipCode", cardDetails.ZipCode},
                    {"@updatedDate", DateTime.Now}
                };
                _repo.ExecuteWrite(updateQuery, args);


            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
            }
            return "success";
        }
    }
}
