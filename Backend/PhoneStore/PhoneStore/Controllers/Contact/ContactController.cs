using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhoneStore.Data.Bill;
using PhoneStore.Data.Contact;
using PhoneStore.Data.User;
using PhoneStore.Model;

namespace PhoneStore.Controllers.Contact
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    
    public class ContactController : ControllerBase
    {
        private readonly ContactRepository _contactRepository;

        public ContactController(ContactRepository contactRepository)
        {
            _contactRepository = contactRepository;
        }

        [HttpGet]
        public IActionResult GetAllContact()
        {
            var contactList = _contactRepository.GetAllContact();
            return Ok(contactList);
        }

        [HttpPost]
        public IActionResult InsertContact([FromBody][Bind()] ContactModel contact)
        {
            if (contact == null)
                return BadRequest(new { Message = "contact data is required." });
            var isInserted = _contactRepository.InsertContact(contact);
            if (isInserted)
                return Ok(new { Message = "contact message send successfully." });
            else
                return StatusCode(500, new { Message = "contact message can not be send." });
        }


        [HttpGet]
        public IActionResult ContactCount()
        {
            var billList = _contactRepository.ContactCount();
            return Ok(billList);
        }

    }
}
