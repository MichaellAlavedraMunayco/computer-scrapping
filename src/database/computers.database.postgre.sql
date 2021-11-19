CREATE TABLE "Computer" (
  "id" int PRIMARY KEY,
  "sku" varchar DEFAULT '-',
  "name" varchar DEFAULT '-',
  "type" varchar DEFAULT '-',
  "brand" varchar DEFAULT '-',
  "model" varchar DEFAULT '-',
  "os" varchar DEFAULT '-',
  "warranty" boolean DEFAULT false,
  "warrantyTime" varchar DEFAULT '-',
  "likes" varchar DEFAULT 0,
  "url" varchar DEFAULT '-',
  "madeIn" varchar DEFAULT '-',
  "company" varchar DEFAULT '-'
);

CREATE TABLE "Input" (
  "id" int PRIMARY KEY,
  "wifi" boolean DEFAULT false,
  "hdmi" boolean DEFAULT false,
  "hdmiCount" varchar DEFAULT '-',
  "usb2" boolean DEFAULT false,
  "usb3" boolean DEFAULT false,
  "usbC" boolean DEFAULT false,
  "usbcount" varchar DEFAULT '-',
  "cd" boolean DEFAULT false,
  "blueray" boolean DEFAULT false,
  "tv" boolean DEFAULT false,
  "headphone" boolean DEFAULT false,
  "microphone" boolean DEFAULT false,
  "ethernet" boolean DEFAULT false,
  "network" boolean DEFAULT false,
  "vga" boolean DEFAULT false,
  "bluetooth" boolean DEFAULT false,
  "computerId" int
);

CREATE TABLE "Webcam" (
  "id" int PRIMARY KEY,
  "enable" boolean DEFAULT false,
  "computerId" int
);

CREATE TABLE "Speaker" (
  "id" int PRIMARY KEY,
  "included" boolean DEFAULT false,
  "computerId" int
);

CREATE TABLE "Keyboard" (
  "id" int PRIMARY KEY,
  "illuminated" boolean DEFAULT false,
  "isNumeric" boolean DEFAULT false,
  "computerId" int
);

CREATE TABLE "Graphic" (
  "id" int PRIMARY KEY,
  "name" varchar DEFAULT '-',
  "type" varchar DEFAULT '-',
  "brand" varchar DEFAULT '-',
  "computerId" int
);

CREATE TABLE "Disk" (
  "id" int PRIMARY KEY,
  "hdd" boolean DEFAULT false,
  "ssd" boolean DEFAULT false,
  "ssdReader" boolean DEFAULT false,
  "opticalUnit" boolean DEFAULT false,
  "allowSecondUnit" boolean DEFAULT false,
  "allowReplace" boolean DEFAULT false,
  "computerId" int
);

CREATE TABLE "Memory" (
  "id" int PRIMARY KEY,
  "type" varchar DEFAULT 'Disk | Graphic | Ram DDR4',
  "capacityGB" varchar DEFAULT '-',
  "optane" boolean DEFAULT false,
  "expandable" boolean DEFAULT false,
  "computerId" int,
  "diskId" int,
  "graphicId" int
);

CREATE TABLE "Processor" (
  "id" int PRIMARY KEY,
  "name" varchar DEFAULT '-',
  "brand" varchar DEFAULT '-',
  "generation" varchar DEFAULT '-',
  "velocityGHz" varchar DEFAULT '-',
  "maxVelocityGHz" varchar DEFAULT '-',
  "coreCount" varchar DEFAULT '-',
  "computerId" int
);

CREATE TABLE "Screen" (
  "id" int PRIMARY KEY,
  "type" varchar DEFAULT '-',
  "definition" varchar DEFAULT '-',
  "touch" boolean DEFAULT false,
  "computerId" int
);

CREATE TABLE "Dimension" (
  "id" int PRIMARY KEY,
  "widthCm" varchar DEFAULT '-',
  "heightCm" varchar DEFAULT '-',
  "widthPx" varchar DEFAULT '-',
  "heightPx" varchar DEFAULT '-',
  "thickCm" varchar DEFAULT '-',
  "weightKg" varchar DEFAULT '-',
  "sizeInch" varchar DEFAULT '-',
  "computerId" int,
  "screenId" int
);

CREATE TABLE "Price" (
  "id" int PRIMARY KEY,
  "realValue" varchar DEFAULT '-',
  "reducedValue" varchar DEFAULT '-',
  "discountValue" varchar DEFAULT '-',
  "currency" varchar DEFAULT 'S/',
  "consulted" date DEFAULT (now()),
  "computerId" int
);

ALTER TABLE "Input" ADD FOREIGN KEY ("computerId") REFERENCES "Computer" ("id");

ALTER TABLE "Webcam" ADD FOREIGN KEY ("computerId") REFERENCES "Computer" ("id");

ALTER TABLE "Speaker" ADD FOREIGN KEY ("computerId") REFERENCES "Computer" ("id");

ALTER TABLE "Keyboard" ADD FOREIGN KEY ("computerId") REFERENCES "Computer" ("id");

ALTER TABLE "Graphic" ADD FOREIGN KEY ("computerId") REFERENCES "Computer" ("id");

ALTER TABLE "Disk" ADD FOREIGN KEY ("computerId") REFERENCES "Computer" ("id");

ALTER TABLE "Memory" ADD FOREIGN KEY ("computerId") REFERENCES "Computer" ("id");

ALTER TABLE "Memory" ADD FOREIGN KEY ("diskId") REFERENCES "Disk" ("id");

ALTER TABLE "Memory" ADD FOREIGN KEY ("graphicId") REFERENCES "Graphic" ("id");

ALTER TABLE "Processor" ADD FOREIGN KEY ("computerId") REFERENCES "Computer" ("id");

ALTER TABLE "Screen" ADD FOREIGN KEY ("computerId") REFERENCES "Computer" ("id");

ALTER TABLE "Dimension" ADD FOREIGN KEY ("computerId") REFERENCES "Computer" ("id");

ALTER TABLE "Dimension" ADD FOREIGN KEY ("screenId") REFERENCES "Screen" ("id");

ALTER TABLE "Price" ADD FOREIGN KEY ("computerId") REFERENCES "Computer" ("id");

COMMENT ON COLUMN "Computer"."type" IS 'Laptop | Desktop | Notebook';

COMMENT ON COLUMN "Graphic"."type" IS 'Dedicado';

COMMENT ON COLUMN "Screen"."type" IS 'IPS';
