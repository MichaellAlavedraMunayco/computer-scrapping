CREATE TABLE [Computer] (
  [id] int PRIMARY KEY,
  [sku] nvarchar(255) DEFAULT '-',
  [name] nvarchar(255) DEFAULT '-',
  [type] nvarchar(255) DEFAULT '-',
  [brand] nvarchar(255) DEFAULT '-',
  [model] nvarchar(255) DEFAULT '-',
  [os] nvarchar(255) DEFAULT '-',
  [warranty] boolean DEFAULT (false),
  [warrantyTime] nvarchar(255) DEFAULT '-',
  [likes] nvarchar(255) DEFAULT (0),
  [url] nvarchar(255) DEFAULT '-',
  [madeIn] nvarchar(255) DEFAULT '-',
  [company] nvarchar(255) DEFAULT '-'
)
GO

CREATE TABLE [Input] (
  [id] int PRIMARY KEY,
  [wifi] boolean DEFAULT (false),
  [hdmi] boolean DEFAULT (false),
  [hdmiCount] nvarchar(255) DEFAULT '-',
  [usb2] boolean DEFAULT (false),
  [usb3] boolean DEFAULT (false),
  [usbC] boolean DEFAULT (false),
  [usbcount] nvarchar(255) DEFAULT '-',
  [cd] boolean DEFAULT (false),
  [blueray] boolean DEFAULT (false),
  [tv] boolean DEFAULT (false),
  [headphone] boolean DEFAULT (false),
  [microphone] boolean DEFAULT (false),
  [ethernet] boolean DEFAULT (false),
  [network] boolean DEFAULT (false),
  [vga] boolean DEFAULT (false),
  [bluetooth] boolean DEFAULT (false),
  [computerId] int
)
GO

CREATE TABLE [Webcam] (
  [id] int PRIMARY KEY,
  [enable] boolean DEFAULT (false),
  [computerId] int
)
GO

CREATE TABLE [Speaker] (
  [id] int PRIMARY KEY,
  [included] boolean DEFAULT (false),
  [computerId] int
)
GO

CREATE TABLE [Keyboard] (
  [id] int PRIMARY KEY,
  [illuminated] boolean DEFAULT (false),
  [isNumeric] boolean DEFAULT (false),
  [computerId] int
)
GO

CREATE TABLE [Graphic] (
  [id] int PRIMARY KEY,
  [name] nvarchar(255) DEFAULT '-',
  [type] nvarchar(255) DEFAULT '-',
  [brand] nvarchar(255) DEFAULT '-',
  [computerId] int
)
GO

CREATE TABLE [Disk] (
  [id] int PRIMARY KEY,
  [hdd] boolean DEFAULT (false),
  [ssd] boolean DEFAULT (false),
  [ssdReader] boolean DEFAULT (false),
  [opticalUnit] boolean DEFAULT (false),
  [allowSecondUnit] boolean DEFAULT (false),
  [allowReplace] boolean DEFAULT (false),
  [computerId] int
)
GO

CREATE TABLE [Memory] (
  [id] int PRIMARY KEY,
  [type] nvarchar(255) DEFAULT 'Disk | Graphic | Ram DDR4',
  [capacityGB] nvarchar(255) DEFAULT '-',
  [optane] boolean DEFAULT (false),
  [expandable] boolean DEFAULT (false),
  [computerId] int,
  [diskId] int,
  [graphicId] int
)
GO

CREATE TABLE [Processor] (
  [id] int PRIMARY KEY,
  [name] nvarchar(255) DEFAULT '-',
  [brand] nvarchar(255) DEFAULT '-',
  [generation] nvarchar(255) DEFAULT '-',
  [velocityGHz] nvarchar(255) DEFAULT '-',
  [maxVelocityGHz] nvarchar(255) DEFAULT '-',
  [coreCount] nvarchar(255) DEFAULT '-',
  [computerId] int
)
GO

CREATE TABLE [Screen] (
  [id] int PRIMARY KEY,
  [type] nvarchar(255) DEFAULT '-',
  [definition] nvarchar(255) DEFAULT '-',
  [touch] boolean DEFAULT (false),
  [computerId] int
)
GO

CREATE TABLE [Dimension] (
  [id] int PRIMARY KEY,
  [widthCm] nvarchar(255) DEFAULT '-',
  [heightCm] nvarchar(255) DEFAULT '-',
  [widthPx] nvarchar(255) DEFAULT '-',
  [heightPx] nvarchar(255) DEFAULT '-',
  [thickCm] nvarchar(255) DEFAULT '-',
  [weightKg] nvarchar(255) DEFAULT '-',
  [sizeInch] nvarchar(255) DEFAULT '-',
  [computerId] int,
  [screenId] int
)
GO

CREATE TABLE [Price] (
  [id] int PRIMARY KEY,
  [realValue] nvarchar(255) DEFAULT '-',
  [reducedValue] nvarchar(255) DEFAULT '-',
  [discountValue] nvarchar(255) DEFAULT '-',
  [currency] nvarchar(255) DEFAULT 'S/',
  [consulted] date DEFAULT (now()),
  [computerId] int
)
GO

ALTER TABLE [Input] ADD FOREIGN KEY ([computerId]) REFERENCES [Computer] ([id])
GO

ALTER TABLE [Webcam] ADD FOREIGN KEY ([computerId]) REFERENCES [Computer] ([id])
GO

ALTER TABLE [Speaker] ADD FOREIGN KEY ([computerId]) REFERENCES [Computer] ([id])
GO

ALTER TABLE [Keyboard] ADD FOREIGN KEY ([computerId]) REFERENCES [Computer] ([id])
GO

ALTER TABLE [Graphic] ADD FOREIGN KEY ([computerId]) REFERENCES [Computer] ([id])
GO

ALTER TABLE [Disk] ADD FOREIGN KEY ([computerId]) REFERENCES [Computer] ([id])
GO

ALTER TABLE [Memory] ADD FOREIGN KEY ([computerId]) REFERENCES [Computer] ([id])
GO

ALTER TABLE [Memory] ADD FOREIGN KEY ([diskId]) REFERENCES [Disk] ([id])
GO

ALTER TABLE [Memory] ADD FOREIGN KEY ([graphicId]) REFERENCES [Graphic] ([id])
GO

ALTER TABLE [Processor] ADD FOREIGN KEY ([computerId]) REFERENCES [Computer] ([id])
GO

ALTER TABLE [Screen] ADD FOREIGN KEY ([computerId]) REFERENCES [Computer] ([id])
GO

ALTER TABLE [Dimension] ADD FOREIGN KEY ([computerId]) REFERENCES [Computer] ([id])
GO

ALTER TABLE [Dimension] ADD FOREIGN KEY ([screenId]) REFERENCES [Screen] ([id])
GO

ALTER TABLE [Price] ADD FOREIGN KEY ([computerId]) REFERENCES [Computer] ([id])
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Laptop | Desktop | Notebook',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Computer',
@level2type = N'Column', @level2name = 'type';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Dedicado',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Graphic',
@level2type = N'Column', @level2name = 'type';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'IPS',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Screen',
@level2type = N'Column', @level2name = 'type';
GO
