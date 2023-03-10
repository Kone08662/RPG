USE [master]
GO
/****** Object:  Database [RPGadventure]    Script Date: 2022/12/27 下午 06:05:40 ******/
CREATE DATABASE [RPGadventure]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'RPGadventure', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\RPGadventure.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'RPGadventure_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\RPGadventure_log.ldf' , SIZE = 2048KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [RPGadventure] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [RPGadventure].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [RPGadventure] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [RPGadventure] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [RPGadventure] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [RPGadventure] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [RPGadventure] SET ARITHABORT OFF 
GO
ALTER DATABASE [RPGadventure] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [RPGadventure] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [RPGadventure] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [RPGadventure] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [RPGadventure] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [RPGadventure] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [RPGadventure] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [RPGadventure] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [RPGadventure] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [RPGadventure] SET  DISABLE_BROKER 
GO
ALTER DATABASE [RPGadventure] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [RPGadventure] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [RPGadventure] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [RPGadventure] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [RPGadventure] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [RPGadventure] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [RPGadventure] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [RPGadventure] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [RPGadventure] SET  MULTI_USER 
GO
ALTER DATABASE [RPGadventure] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [RPGadventure] SET DB_CHAINING OFF 
GO
ALTER DATABASE [RPGadventure] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [RPGadventure] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [RPGadventure] SET DELAYED_DURABILITY = DISABLED 
GO
USE [RPGadventure]
GO
/****** Object:  Table [dbo].[chance]    Script Date: 2022/12/27 下午 06:05:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[chance](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[increasehp] [int] NULL,
	[increaseattack] [int] NULL,
 CONSTRAINT [PK_chance] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[job]    Script Date: 2022/12/27 下午 06:05:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[job](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[profession] [nvarchar](5) NOT NULL,
	[hp] [int] NULL,
	[attack] [int] NULL,
 CONSTRAINT [PK_job] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[mapAdjectives]    Script Date: 2022/12/27 下午 06:05:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[mapAdjectives](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[mapAdjective] [nvarchar](10) NOT NULL,
 CONSTRAINT [PK_mapAdjectives] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[maps]    Script Date: 2022/12/27 下午 06:05:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[maps](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[map] [nvarchar](10) NOT NULL,
 CONSTRAINT [PK_maps] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[monster]    Script Date: 2022/12/27 下午 06:05:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[monster](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](10) NOT NULL,
	[hp] [int] NULL,
	[attack] [int] NULL,
 CONSTRAINT [PK_monster] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[chance] ON 

INSERT [dbo].[chance] ([id], [increasehp], [increaseattack]) VALUES (1, 30, 15)
INSERT [dbo].[chance] ([id], [increasehp], [increaseattack]) VALUES (2, 40, 10)
INSERT [dbo].[chance] ([id], [increasehp], [increaseattack]) VALUES (3, 20, 20)
INSERT [dbo].[chance] ([id], [increasehp], [increaseattack]) VALUES (4, 50, 2)
SET IDENTITY_INSERT [dbo].[chance] OFF
SET IDENTITY_INSERT [dbo].[job] ON 

INSERT [dbo].[job] ([id], [profession], [hp], [attack]) VALUES (1, N'伐木工', 100, 90)
INSERT [dbo].[job] ([id], [profession], [hp], [attack]) VALUES (2, N'法師', 70, 80)
INSERT [dbo].[job] ([id], [profession], [hp], [attack]) VALUES (3, N'遊俠', 80, 80)
INSERT [dbo].[job] ([id], [profession], [hp], [attack]) VALUES (4, N'戰士', 100, 90)
INSERT [dbo].[job] ([id], [profession], [hp], [attack]) VALUES (7, N'補師', 60, 10)
SET IDENTITY_INSERT [dbo].[job] OFF
SET IDENTITY_INSERT [dbo].[mapAdjectives] ON 

INSERT [dbo].[mapAdjectives] ([id], [mapAdjective]) VALUES (1, N'奇怪的')
INSERT [dbo].[mapAdjectives] ([id], [mapAdjective]) VALUES (2, N'黑暗的')
INSERT [dbo].[mapAdjectives] ([id], [mapAdjective]) VALUES (3, N'潮濕的')
INSERT [dbo].[mapAdjectives] ([id], [mapAdjective]) VALUES (4, N'樹皮的')
SET IDENTITY_INSERT [dbo].[mapAdjectives] OFF
SET IDENTITY_INSERT [dbo].[maps] ON 

INSERT [dbo].[maps] ([id], [map]) VALUES (1, N'森林')
INSERT [dbo].[maps] ([id], [map]) VALUES (2, N'房間')
INSERT [dbo].[maps] ([id], [map]) VALUES (3, N'地洞')
INSERT [dbo].[maps] ([id], [map]) VALUES (4, N'地牢')
SET IDENTITY_INSERT [dbo].[maps] OFF
SET IDENTITY_INSERT [dbo].[monster] ON 

INSERT [dbo].[monster] ([id], [name], [hp], [attack]) VALUES (1, N'惡魔火柴人', 130, 25)
INSERT [dbo].[monster] ([id], [name], [hp], [attack]) VALUES (2, N'變異的湯瑪士小火車', 200, 15)
SET IDENTITY_INSERT [dbo].[monster] OFF
USE [master]
GO
ALTER DATABASE [RPGadventure] SET  READ_WRITE 
GO
