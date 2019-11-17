using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartProject.Migrations
{
    public partial class ReleaseDatesInit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "AddedDate",
                table: "Releases",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "ClosedDate",
                table: "Releases",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AddedDate",
                table: "Releases");

            migrationBuilder.DropColumn(
                name: "ClosedDate",
                table: "Releases");
        }
    }
}
