using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using PhoneStore.Data.Address;
using PhoneStore.Data.Bill;
using PhoneStore.Data.Contact;
using PhoneStore.Data.PhoneDetail;
using PhoneStore.Data.User;
using System.Reflection;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddFluentValidation(fv =>
        fv.RegisterValidatorsFromAssemblies(new[] { Assembly.GetExecutingAssembly() }));



// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddScoped<PhoneDetailRepository>();
builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<ContactRepository>();
builder.Services.AddScoped<AddressRepository>();
builder.Services.AddScoped<BillRepository>();

//Cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.SetIsOriginAllowed(origin => origin.StartsWith("http://localhost:5173"))//origin == null || origin.StartsWith("file://")              
       .AllowAnyHeader() // Allow all headers
      .AllowAnyMethod(); // Allow all HTTP methods (GET, POST, PUT, DELETE, PATCH)                           
    });
});

//jwt
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();

//Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.UseCors("AllowSpecificOrigin"); // Enable the CORS policy here

app.MapControllers();

app.Run();
