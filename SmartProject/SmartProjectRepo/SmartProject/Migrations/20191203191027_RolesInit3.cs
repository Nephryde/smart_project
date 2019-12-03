using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartProject.Migrations
{
    public partial class RolesInit3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RoleId",
                table: "ProjectUser",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProjectUser_RoleId",
                table: "ProjectUser",
                column: "RoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectUser_ProjectRoles_RoleId",
                table: "ProjectUser",
                column: "RoleId",
                principalTable: "ProjectRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectUser_ProjectRoles_RoleIdId",
                table: "ProjectUser");

            migrationBuilder.DropIndex(
                name: "IX_ProjectUser_RoleIdId",
                table: "ProjectUser");

            migrationBuilder.DropColumn(
                name: "RoleIdId",
                table: "ProjectUser");
        }
    }
}
