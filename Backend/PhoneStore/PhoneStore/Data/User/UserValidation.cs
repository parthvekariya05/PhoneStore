using FluentValidation;
using PhoneStore.Model;

namespace PhoneStore.Data.User
{
    public class UserValidation : AbstractValidator<UserModel>
    {
        public UserValidation()
        {
            RuleFor(u => u.UserName).NotEmpty().WithMessage("Please Enter UserName...");
            RuleFor(u => u.Password).NotEmpty().WithMessage("Please Enter Password...");                      
        }
    }
}
