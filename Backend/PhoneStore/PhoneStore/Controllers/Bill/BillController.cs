using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhoneStore.Data.Address;
using PhoneStore.Data.Bill;
using PhoneStore.Data.PhoneDetail;
using PhoneStore.Model;

namespace PhoneStore.Controllers.Bill
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BillController : ControllerBase
    {
        private readonly BillRepository _billRepository;

        public BillController(BillRepository billRepository)
        {
            _billRepository = billRepository;
        }

        [HttpGet]
        public IActionResult GetAllBill()
        {
            var addressList = _billRepository.GetAllBill();
            return Ok(addressList);
        }
      
        [HttpPost]
        public IActionResult InsertBill([FromBody][Bind()] BillInsertModel bill)
        {
            if (bill == null)
                return BadRequest(new { Message = "bill data is required." });
            var isInserted = _billRepository.InsertBill(bill);
            if (isInserted)
                return Ok(new { Message = "bill send successfully." });
            else
                return StatusCode(500, new { Message = "bill  can not be send." });
        }

        [HttpGet]
        public IActionResult BillCount()
        {
            var billList = _billRepository.BillCount();
            return Ok(billList);
        }

        [HttpGet("{UserID}")]
        public IActionResult SelectByUserID(int UserID)
        {
            var billList = _billRepository.SelectByUserID(UserID);
            return Ok(billList);
        }

        [HttpPut("BillStatus")]
        public IActionResult BillStatus(int BillID, string Status)
        {
            if (Status ==null)
                return BadRequest(new { Message = "Invalid Bill data." });

            var isUpdated = _billRepository.BillStatus(BillID,Status);
            if (isUpdated)
                return Ok(new { Message = "status updated successfully." });
            else
                return NotFound(new { Message = "status not be updated." });
        }              
    }
}