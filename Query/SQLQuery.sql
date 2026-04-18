 Create Table Phone_Storage(
	Phone_StorageID INT IDENTITY(1,1) PRIMARY KEY, 	
	Phone_Storage VARCHAR(50),		
 )
 INSERT INTO Phone_Storage (Phone_Storage) 
VALUES 
('6GB/128GB'),
('8GB/128GB'),
('12GB/256GB');

select * from Phone_Storage


select * from Phone_Brand

Create Table Phone_Brand(
	Phone_BrandID INT IDENTITY(1,1) PRIMARY KEY, 	
	 Phone_BrandName VARCHAR(50),		
 )
 INSERT INTO Phone_Brand (Phone_BrandName) 
VALUES 
('OPPO'),
('Samsung'),
('VIVO');

CREATE TABLE PhoneDetail (
    PhoneID INT IDENTITY(1,1) PRIMARY KEY,  -- Auto-increment Primary Key
    PhoneName VARCHAR(50) NOT NULL,   
    Price INT NOT NULL,
    PhoneImage VARCHAR(500) NOT NULL,
    CreateAt DATETIME NULL,
    ModifyAt DATETIME NULL,
    Phone_StorageID INT,  -- Foreign Key Column
    Phone_BrandID INT,  -- Foreign Key Column
    CONSTRAINT FK_PhoneDetail_Phone_StorageID FOREIGN KEY (Phone_StorageID) REFERENCES Phone_Storage(Phone_StorageID),
    CONSTRAINT FK_PhoneDetail_Phone_BrandID FOREIGN KEY (Phone_BrandID) REFERENCES Phone_Brand(Phone_BrandID)
);

CREATE TABLE Contact (
    ContactID INT IDENTITY(1,1) PRIMARY KEY,
    EmailAddress VARCHAR(255) NOT NULL,
    Description VARCHAR(500) 
);

CREATE TABLE Bill (
    BillID INT IDENTITY(1,1) PRIMARY KEY,
    PhoneID INT,                          
    UserID INT,                           
    AddressID INT, 
	Payment Varchar(50),
    FOREIGN KEY (PhoneID) REFERENCES PhoneDetail(PhoneID), 
    FOREIGN KEY (UserID) REFERENCES [User](UserID),       
    FOREIGN KEY (AddressID) REFERENCES [Address](AddressID)
);



---------------------------SP---------------------------------
-----------User
create or ALTER PROCEDURE [dbo].[PR_User_SelectAll]
AS 
SELECT
		[dbo].[User].UserID,
		[dbo].[User].UserName,
		[dbo].[User].Password,
		[dbo].[User].EmailAddress,
		[dbo].[User].IsAdmin,
		[dbo].[User].CreateAt,
		[dbo].[User].ModifyAt
FROM [dbo].[User]
where [dbo].[User].[IsAdmin] = 0

create or ALTER PROCEDURE [dbo].[PR_User_Register]

			 @UserName			nvarchar(50)
			,@Password			nvarchar(50)			
			,@EmailAddress		nvarchar(500)			
			,@CreateAt			datetime
			,@ModifyAt			datetime

AS INSERT INTO [dbo].[User]
			(
			[UserName]
			,[Password]			
			,[EmailAddress]
			,[isAdmin]
			,[CreateAt]
			,[ModifyAt]
			)
	VALUES
			(
			 @UserName
			,@Password			
			,@EmailAddress
			,0
			,ISNULL(@CreateAt,GETDATE())
			,ISNULL(@ModifyAt,GETDATE())
	)

create or ALTER PROCEDURE [dbo].[PR_User_Login]
@UserName varchar(50),
@Password varchar(50)
AS 
SELECT
		[dbo].[User].UserID,
		[dbo].[User].UserName,
		[dbo].[User].Password,
		[dbo].[User].EmailAddress,
		[dbo].[User].IsAdmin		
FROM [dbo].[User]
WHERE	[dbo].[User].[UserName] = @UserName
AND		[dbo].[User].[Password] = @Password

create or ALTER PROCEDURE [dbo].[PR_User_SelectByPK]
@UserID INT
AS
SELECT
[dbo].[User].[UserID],
[dbo].[User].[UserName],
[dbo].[User].[Password],
[dbo].[User].[EmailAddress],
[dbo].[User].[IsAdmin]
FROM [dbo].[User]
WHERE [dbo].[User].[isAdmin] = 0 AND [dbo].[User].[UserID] = @UserID

create or ALTER PROCEDURE [dbo].[PR_User_Delete]
    @UserID INT
AS
BEGIN
    -- Prevent deletion of admin users
    DELETE FROM [dbo].[User]
    WHERE UserID = @UserID AND IsAdmin = 0
END

CREATE OR ALTER PROCEDURE [dbo].[PR_User_Update]

    @UserID            INT
    ,@UserName         NVARCHAR(50)
    ,@Password         NVARCHAR(50)
    ,@EmailAddress     NVARCHAR(500)
    

AS
BEGIN
    UPDATE [dbo].[User]
    SET
        [UserName] = @UserName
        , [Password] = @Password
        , [EmailAddress] = @EmailAddress
        
    WHERE [UserID] = @UserID
END

CREATE OR ALTER PROCEDURE [dbo].[PR_Admin_Update]

    @UserID            INT
    ,@isAdmin          BIT

AS
BEGIN
    UPDATE [dbo].[User]
    SET
        [isAdmin] = @isAdmin
    WHERE [UserID] = @UserID
END


create or alter  PROCEDURE [dbo].[PR_User_Count]
as 
select COUNT(*) as UserCount from [dbo].[User]


--------Phone--------

---Drop down ----
create or ALTER PROCEDURE [dbo].[PR_PhoneStorage_DropDown]
AS
BEGIN
   SELECT 
		Phone_Storage.Phone_StorageID,	
		Phone_Storage.Phone_Storage
   FROM 
		Phone_Storage
END
---Phone Brand

create or ALTER PROCEDURE [dbo].[PR_PhoneBrand_DropDown]
AS
BEGIN
   SELECT 
		Phone_Brand.Phone_BrandID,
		Phone_Brand.Phone_BrandName	
   FROM 
		Phone_Brand
END

CREATE OR ALTER PROCEDURE [dbo].[PR_PhoneBrand_SelectByPK]
    @Phone_BrandID INT
AS
BEGIN
    SELECT 
        Phone_BrandID,
        Phone_BrandName
    FROM 
        Phone_Brand
    WHERE 
        Phone_BrandID = @Phone_BrandID;
END


CREATE or alter PROCEDURE [dbo].[PR_PhoneBrand_Insert]
    @Phone_BrandName VARCHAR(50)
AS
BEGIN    
    
    INSERT INTO Phone_Brand (Phone_BrandName)
    VALUES (@Phone_BrandName);
END;

CREATE OR ALTER PROCEDURE [dbo].[PR_PhoneBrand_Update]
    @Phone_BrandID INT,
    @Phone_BrandName VARCHAR(50)
AS
BEGIN
    UPDATE Phone_Brand
    SET Phone_BrandName = @Phone_BrandName
    WHERE Phone_BrandID = @Phone_BrandID;
END;

CREATE OR ALTER PROCEDURE [dbo].[PR_PhoneBrand_Delete]
    @Phone_BrandID INT
AS
BEGIN
    DELETE FROM Phone_Brand
    WHERE Phone_BrandID = @Phone_BrandID;
END;



---------Phone Detail-----------------
create or ALTER PROCEDURE [dbo].[PR_PhoneDetail_SelectAll]
AS 
SELECT
		PhoneDetail.PhoneID,
		PhoneDetail.PhoneName,
		PhoneDetail.PhoneImage,
		PhoneDetail.Price,
		PhoneDetail.CreateAt,
		PhoneDetail.ModifyAt,
		Phone_Brand.Phone_BrandID,
		Phone_Brand.Phone_BrandName,
		Phone_Storage.Phone_StorageID,		
		Phone_Storage.Phone_Storage
FROM [dbo].[PhoneDetail]
		Inner Join
			Phone_Brand on PhoneDetail.Phone_BrandID=Phone_Brand.Phone_BrandID
		Inner Join
			Phone_Storage on PhoneDetail.Phone_StorageID=Phone_Storage.Phone_StorageID

create or ALTER PROCEDURE [dbo].[PR_PhoneDetail_SelectByPK]
    @PhoneID INT
AS BEGIN
SELECT
	PhoneDetail.PhoneID,
		PhoneDetail.PhoneName,
		PhoneDetail.PhoneImage,
		PhoneDetail.Price,
		PhoneDetail.CreateAt,
		PhoneDetail.ModifyAt,
		Phone_Brand.Phone_BrandID,
		Phone_Brand.Phone_BrandName,
		Phone_Storage.Phone_StorageID,		
		Phone_Storage.Phone_Storage
FROM [dbo].[PhoneDetail]
		Inner Join
			Phone_Brand on PhoneDetail.Phone_BrandID=Phone_Brand.Phone_BrandID
		Inner Join
			Phone_Storage on PhoneDetail.Phone_StorageID=Phone_Storage.Phone_StorageID
		where PhoneDetail.PhoneID=@PhoneID
END

CREATE   PROCEDURE [dbo].[PR_PhoneDetail_Insert]
    @PhoneName NVARCHAR(100),
    @PhoneImage NVARCHAR(500),
    @Price INT,	
	@Phone_BrandID INT,
    @Phone_StorageID INT
AS
BEGIN
    INSERT INTO PhoneDetail(PhoneDetail.PhoneName, PhoneDetail.PhoneImage, PhoneDetail.Price,PhoneDetail.Phone_BrandID,PhoneDetail.Phone_StorageID,PhoneDetail.CreateAt,PhoneDetail.ModifyAt)
    VALUES (@PhoneName, @PhoneImage, @Price, @Phone_BrandID,@Phone_StorageID, GETDATE(),GETDATE());
END

CREATE   PROCEDURE [dbo].[PR_PhoneDetail_Update]
	@PhoneID INT,
    @PhoneName NVARCHAR(100),
    @PhoneImage NVARCHAR(10),
    @Price INT,	
	@Phone_BrandID INT,
    @Phone_StorageID INT
AS
BEGIN
    UPDATE PhoneDetail 
	SET PhoneDetail.PhoneName=@PhoneName,
		PhoneDetail.PhoneImage=@PhoneImage, 
		PhoneDetail.Price=@Price,
		PhoneDetail.Phone_BrandID=@Phone_BrandID,
		PhoneDetail.Phone_StorageID=@Phone_StorageID,
		PhoneDetail.ModifyAt=GETDATE()	
		WHERE PhoneDetail.PhoneID = @PhoneID;
	
END

create or ALTER PROCEDURE [dbo].[PR_PhoneDetail_Delete]
    @PhoneID INT
AS
BEGIN
    DELETE FROM PhoneDetail
    WHERE PhoneID = @PhoneID
END

create or alter  PROCEDURE [dbo].[PR_Phone_Count]
as 
select COUNT(*) as PhoneCount from [dbo].[PhoneDetail]

---Contact ------------
create or ALTER PROCEDURE [dbo].[PR_Contact_SelectAll]
AS 
SELECT 
	Contact.ContactID,
	Contact.EmailAddress,
	Contact.Description
FROM [dbo].[Contact]

create or ALTER PROCEDURE [dbo].[PR_Contact_Insert]
@EmailAddress varchar(50),
@Description varchar(500)
AS 
INSERT INTO Contact(Contact.EmailAddress,Contact.Description)
    VALUES (@EmailAddress,@Description);
		
create or alter  PROCEDURE [dbo].[PR_Contact_Count]
as 
select COUNT(*) as ContactCount from [dbo].[Contact]
-------------Address------
create or ALTER PROCEDURE [dbo].[PR_Address_SelectAll]
AS 
SELECT 
	Address.AddressID,
	Address.UserID,
	[dbo].[User].UserName,
	Address.Address,
	Address.Country,
	Address.State,
	Address.City,
	Address.Pincode
FROM [dbo].[Address]
Inner Join
			[dbo].[User] on Address.UserID=[dbo].[User].UserID
			
create or ALTER PROCEDURE [dbo].[PR_Address_Insert]
@UserID int,
@Address varchar(100),
@Country varchar(100),
@State varchar(100),
@City varchar(100),
@Pincode varchar(100)
AS 
INSERT INTO Address(Address.UserID,Address.Address,Address.Country,Address.State,Address.City,Address.Pincode)
    VALUES (@UserID,@Address,@Country,@State,@City,@Pincode);

create or ALTER PROCEDURE [dbo].[PR_Address_SelectByPK]
    @AddressID INT
AS BEGIN
SELECT
	Address.AddressID,
	Address.Address,
	Address.City,
	Address.Country,
	Address.Pincode,
	Address.State,
	Address.UserID,
	[dbo].[User].UserName
FROM [dbo].Address		
		Inner Join [dbo].[User] on Address.UserID=[dbo].[User].UserID
		where Address.AddressID=@AddressID
END
-------------Bill------ 

create or alter  PROCEDURE [dbo].[PR_Bill_Count]
as 
select COUNT(*) as BillCount from [dbo].[BillTemp]

CREATE or alter PROCEDURE [dbo].[PR_BillTemp_SelectByUserID]
    @UserID INT
AS
BEGIN
    SELECT 
        BillTemp.BillID,    
        [dbo].[User].UserID,
        [dbo].[User].UserName,
        BillTemp.Address,
        BillTemp.Payment,
        PhoneDetail.PhoneID,
        PhoneDetail.PhoneName,
        PhoneDetail.Phone_StorageID,
        Phone_Storage.Phone_Storage,
		BillTemp.Status

    FROM [dbo].[BillTemp]
    INNER JOIN [dbo].[User] ON BillTemp.UserID = [dbo].[User].UserID
    INNER JOIN [dbo].PhoneDetail ON BillTemp.PhoneID = [dbo].PhoneDetail.PhoneID
    INNER JOIN Phone_Storage ON PhoneDetail.Phone_StorageID = Phone_Storage.Phone_StorageID
    WHERE [dbo].[User].UserID = @UserID
	ORDER BY BillTemp.BillID DESC
END

ALTER TABLE BillTemp
ADD CONSTRAINT DF_Bill_Status DEFAULT 'pending' FOR Status;

CREATE OR  ALTER PROCEDURE [dbo].[PR_BillTemp_Status]
    @BillID INT,
    @Status VARCHAR(50)
AS
BEGIN
    UPDATE [dbo].[BillTemp]
    SET 
        BillTemp.Status = @Status       
    WHERE [dbo].[BillTemp].BillID = @BillID;
END






