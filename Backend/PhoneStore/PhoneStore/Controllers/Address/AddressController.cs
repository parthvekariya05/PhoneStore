using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhoneStore.Data.Address;
using PhoneStore.Data.Contact;
using PhoneStore.Data.PhoneDetail;
using PhoneStore.Model;

namespace PhoneStore.Controllers.Address
{
    [Route("api/[controller]/[action]")]
    [ApiController]
   
    public class AddressController : ControllerBase
    {
        private readonly AddressRepository _addressRepository;

        public AddressController(AddressRepository addressRepository)
        {
            _addressRepository = addressRepository;
        }

        [HttpGet]
        public IActionResult GetAllAddress()
        {
            var addressList = _addressRepository.GetAllBill();
            return Ok(addressList);
        }

        [HttpGet("{AddressID}")]
        public IActionResult GetByAddressID(int AddressID)
        {
            var addressList = _addressRepository.GetByAddressID(AddressID);
            return Ok(addressList);
        }

        [HttpPost]
        public IActionResult Insertaddress([FromBody][Bind()] AddressModel address)
        {
            if (address == null)
                return BadRequest(new { Message = "address data is required." });
            var isInserted = _addressRepository.InsertAddress(address);
            if (isInserted)
                return Ok(new { Message = "address send successfully." });
            else
                return StatusCode(500, new { Message = "address  can not be send." });
        }
    }
}