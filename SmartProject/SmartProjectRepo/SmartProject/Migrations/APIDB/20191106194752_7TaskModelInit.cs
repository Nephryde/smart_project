using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartProject.Migrations.APIDB
{
    public partial class _7TaskModelInit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TaskProgress",
                table: "Task");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TaskProgress",
                table: "Task",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
