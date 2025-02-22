using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhoneStore.Data.Bill;
using PhoneStore.Data.PhoneDetail;
using PhoneStore.Model;

namespace PhoneStore.Controllers.PhoneDetail
{
    [Route("api/[controller]/[action]")]
    [ApiController]

    public class PhoneDetailController : ControllerBase
    {
        private readonly PhoneDetailRepository _phonedetailRepository;

        public PhoneDetailController(PhoneDetailRepository phoneRepository)
        {
            _phonedetailRepository = phoneRepository;
        }
        [HttpGet]
        public IActionResult GetAllPhone()
        {
            var phoneList = _phonedetailRepository.GetAllPhone();
            return Ok(phoneList);
        }


        [HttpGet("{PhoneID}")]
        public IActionResult GetByPhoneID(int PhoneID)
        {
            var phoneList = _phonedetailRepository.GetByPhoneID(PhoneID);
            return Ok(phoneList);
        }


        [HttpDelete("{PhoneID}")]
        public IActionResult DeletePhone(int PhoneID)
        {
            var isDeleted = _phonedetailRepository.DeletePhone(PhoneID);
            if (isDeleted)
                return Ok(new { Message = "phone deleted successfully." });
            else
                return NotFound(new { Message = "phone not found or could not be deleted." });
        }

        [HttpPost]
        public IActionResult InsertPhone([FromBody][Bind()] PhoneInsertUpdateModel phone)
        {
            if (phone == null)
                return BadRequest(new { Message = "phone data is required." });

            var isInserted = _phonedetailRepository.InsertPhone(phone);
            if (isInserted)
                return Ok(new { Message = "phone inserted successfully." });
            else
                return StatusCode(500, new { Message = "phone could not be inserted." });
        }

        [HttpPut("{PhoneID}")]
        public IActionResult UpdatePhone(int PhoneID, [FromBody] PhoneInsertUpdateModel phone)
        {
            if (phone == null || PhoneID != phone.PhoneID)
                return BadRequest(new { Message = "Invalid phone data or ID mismatch." });

            var isUpdated = _phonedetailRepository.UpdateCity(phone);
            if (isUpdated)
                return Ok(new { Message = "phone updated successfully." });
            else
                return NotFound(new { Message = "phone not found or could not be updated." });
        }

        [HttpGet]
        public IActionResult Phone_BrandDropDownModel()
        {
            var brandList = _phonedetailRepository.Phone_BrandDropDownModel();
            return Ok(brandList);
        }

        [HttpGet("{Phone_BrandID}")]
        public IActionResult GetByBrandID(int Phone_BrandID)
        {
            var phoneList = _phonedetailRepository.GetByBrandID(Phone_BrandID);
            return Ok(phoneList);
        }

        [HttpPost]
        public IActionResult Phone_BrandInsert([FromBody][Bind()] Phone_BrandInsert phone)
        {
            if (phone == null)
                return BadRequest(new { Message = "brand data is required." });

            var isInserted = _phonedetailRepository.Phone_BrandInsert(phone);
            if (isInserted)
                return Ok(new { Message = "brand inserted successfully." });
            else
                return StatusCode(500, new { Message = "brand could not be inserted." });
        }

        [HttpPut("{Phone_BrandID}")]
        public IActionResult UpdateBrand(int Phone_BrandID, [FromBody] Phone_BrandDropDownModel phone)
        {
            if (phone == null || Phone_BrandID != phone.Phone_BrandID)
                return BadRequest(new { Message = "Invalid Phone_Brand data or ID mismatch." });

            var isUpdated = _phonedetailRepository.UpdateBrand(phone);
            if (isUpdated)
                return Ok(new { Message = "brand updated successfully." });
            else
                return NotFound(new { Message = "brand not found or could not be updated." });
        }

        [HttpDelete("{Phone_BrandID}")]
        public IActionResult DeleteBrand(int Phone_BrandID)
        {
            var isDeleted = _phonedetailRepository.DeleteBrand(Phone_BrandID);
            if (isDeleted)
                return Ok(new { Message = "brand deleted successfully." });
            else
                return NotFound(new { Message = "brand not found or could not be deleted." });
        }

        [HttpGet]
        public IActionResult Phone_StorageDropDownModel()
        {
            var storageList = _phonedetailRepository.Phone_StorageDropDownModel();
            return Ok(storageList);
        }

        [HttpGet]
        public IActionResult PhoneCount()
        {
            var billList = _phonedetailRepository.PhoneCount();
            return Ok(billList);
        }
    }
}