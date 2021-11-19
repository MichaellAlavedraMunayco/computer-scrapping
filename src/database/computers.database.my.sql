CREATE TABLE `Computer` (
  `id` int PRIMARY KEY,
  `sku` varchar(255) DEFAULT "-",
  `name` varchar(255) DEFAULT "-",
  `type` varchar(255) DEFAULT "-" COMMENT 'Laptop | Desktop | Notebook',
  `brand` varchar(255) DEFAULT "-",
  `model` varchar(255) DEFAULT "-",
  `os` varchar(255) DEFAULT "-",
  `warranty` boolean DEFAULT false,
  `warrantyTime` varchar(255) DEFAULT "-",
  `likes` varchar(255) DEFAULT 0,
  `url` varchar(255) DEFAULT "-",
  `madeIn` varchar(255) DEFAULT "-",
  `company` varchar(255) DEFAULT "-"
);

CREATE TABLE `Input` (
  `id` int PRIMARY KEY,
  `wifi` boolean DEFAULT false,
  `hdmi` boolean DEFAULT false,
  `hdmiCount` varchar(255) DEFAULT "-",
  `usb2` boolean DEFAULT false,
  `usb3` boolean DEFAULT false,
  `usbC` boolean DEFAULT false,
  `usbcount` varchar(255) DEFAULT "-",
  `cd` boolean DEFAULT false,
  `blueray` boolean DEFAULT false,
  `tv` boolean DEFAULT false,
  `headphone` boolean DEFAULT false,
  `microphone` boolean DEFAULT false,
  `ethernet` boolean DEFAULT false,
  `network` boolean DEFAULT false,
  `vga` boolean DEFAULT false,
  `bluetooth` boolean DEFAULT false,
  `computerId` int
);

CREATE TABLE `Webcam` (
  `id` int PRIMARY KEY,
  `enable` boolean DEFAULT false,
  `computerId` int
);

CREATE TABLE `Speaker` (
  `id` int PRIMARY KEY,
  `included` boolean DEFAULT false,
  `computerId` int
);

CREATE TABLE `Keyboard` (
  `id` int PRIMARY KEY,
  `illuminated` boolean DEFAULT false,
  `isNumeric` boolean DEFAULT false,
  `computerId` int
);

CREATE TABLE `Graphic` (
  `id` int PRIMARY KEY,
  `name` varchar(255) DEFAULT "-",
  `type` varchar(255) DEFAULT "-" COMMENT 'Dedicado',
  `brand` varchar(255) DEFAULT "-",
  `computerId` int
);

CREATE TABLE `Disk` (
  `id` int PRIMARY KEY,
  `hdd` boolean DEFAULT false,
  `ssd` boolean DEFAULT false,
  `ssdReader` boolean DEFAULT false,
  `opticalUnit` boolean DEFAULT false,
  `allowSecondUnit` boolean DEFAULT false,
  `allowReplace` boolean DEFAULT false,
  `computerId` int
);

CREATE TABLE `Memory` (
  `id` int PRIMARY KEY,
  `type` varchar(255) DEFAULT "Disk | Graphic | Ram DDR4",
  `capacityGB` varchar(255) DEFAULT "-",
  `optane` boolean DEFAULT false,
  `expandable` boolean DEFAULT false,
  `computerId` int,
  `diskId` int,
  `graphicId` int
);

CREATE TABLE `Processor` (
  `id` int PRIMARY KEY,
  `name` varchar(255) DEFAULT "-",
  `brand` varchar(255) DEFAULT "-",
  `generation` varchar(255) DEFAULT "-",
  `velocityGHz` varchar(255) DEFAULT "-",
  `maxVelocityGHz` varchar(255) DEFAULT "-",
  `coreCount` varchar(255) DEFAULT "-",
  `computerId` int
);

CREATE TABLE `Screen` (
  `id` int PRIMARY KEY,
  `type` varchar(255) DEFAULT "-" COMMENT 'IPS',
  `definition` varchar(255) DEFAULT "-",
  `touch` boolean DEFAULT false,
  `computerId` int
);

CREATE TABLE `Dimension` (
  `id` int PRIMARY KEY,
  `widthCm` varchar(255) DEFAULT "-",
  `heightCm` varchar(255) DEFAULT "-",
  `widthPx` varchar(255) DEFAULT "-",
  `heightPx` varchar(255) DEFAULT "-",
  `thickCm` varchar(255) DEFAULT "-",
  `weightKg` varchar(255) DEFAULT "-",
  `sizeInch` varchar(255) DEFAULT "-",
  `computerId` int,
  `screenId` int
);

CREATE TABLE `Price` (
  `id` int PRIMARY KEY,
  `realValue` varchar(255) DEFAULT "-",
  `reducedValue` varchar(255) DEFAULT "-",
  `discountValue` varchar(255) DEFAULT "-",
  `currency` varchar(255) DEFAULT "S/",
  `consulted` date DEFAULT (now()),
  `computerId` int
);

ALTER TABLE `Input` ADD FOREIGN KEY (`computerId`) REFERENCES `Computer` (`id`);

ALTER TABLE `Webcam` ADD FOREIGN KEY (`computerId`) REFERENCES `Computer` (`id`);

ALTER TABLE `Speaker` ADD FOREIGN KEY (`computerId`) REFERENCES `Computer` (`id`);

ALTER TABLE `Keyboard` ADD FOREIGN KEY (`computerId`) REFERENCES `Computer` (`id`);

ALTER TABLE `Graphic` ADD FOREIGN KEY (`computerId`) REFERENCES `Computer` (`id`);

ALTER TABLE `Disk` ADD FOREIGN KEY (`computerId`) REFERENCES `Computer` (`id`);

ALTER TABLE `Memory` ADD FOREIGN KEY (`computerId`) REFERENCES `Computer` (`id`);

ALTER TABLE `Memory` ADD FOREIGN KEY (`diskId`) REFERENCES `Disk` (`id`);

ALTER TABLE `Memory` ADD FOREIGN KEY (`graphicId`) REFERENCES `Graphic` (`id`);

ALTER TABLE `Processor` ADD FOREIGN KEY (`computerId`) REFERENCES `Computer` (`id`);

ALTER TABLE `Screen` ADD FOREIGN KEY (`computerId`) REFERENCES `Computer` (`id`);

ALTER TABLE `Dimension` ADD FOREIGN KEY (`computerId`) REFERENCES `Computer` (`id`);

ALTER TABLE `Dimension` ADD FOREIGN KEY (`screenId`) REFERENCES `Screen` (`id`);

ALTER TABLE `Price` ADD FOREIGN KEY (`computerId`) REFERENCES `Computer` (`id`);
