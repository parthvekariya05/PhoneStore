using FluentValidation;
using PhoneStore.Model;

namespace PhoneStore.Data.PhoneDetail
{
    public class PhoneDetailValidation: AbstractValidator<PhoneDetailModel>
    {
        public PhoneDetailValidation()
        {
            //RuleFor(p => p.PhoneName).NotEmpty().WithMessage("Please Enter PhoneName...");           
            //RuleFor(p => p.Price).NotEmpty().WithMessage("Please Enter PhonePrice...");
            //RuleFor(p => p.PhoneImage).NotEmpty().WithMessage("Please Enter PhoneImage...");                       
        }
    }
}
