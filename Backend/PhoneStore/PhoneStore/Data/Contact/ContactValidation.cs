using FluentValidation;
using PhoneStore.Model;

namespace PhoneStore.Data.Contact
{
    public class ContactValidation: AbstractValidator<ContactModel>
    {
        public ContactValidation()
        {           
            RuleFor(c => c.EmailAddress).NotEmpty().WithMessage("Please Enter EmailAddress...");
            RuleFor(c => c.Description).NotEmpty().WithMessage("Please Enter Description...");
        }
    }
}
