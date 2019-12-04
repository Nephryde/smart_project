using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartProject.Migrations
{
    public partial class RolesInit4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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
                name: "FK_ProjectUser_ProjectRoles_RoleId",
                table: "ProjectUser");

            migrationBuilder.DropIndex(
                name: "IX_ProjectUser_RoleId",
                table: "ProjectUser");

            migrationBuilder.DropColumn(
                name: "RoleId",
                table: "ProjectUser");

            migrationBuilder.AddColumn<int>(
                name: "RoleIdId",
                table: "ProjectUser",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProjectUser_RoleIdId",
                table: "ProjectUser",
                column: "RoleIdId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectUser_ProjectRoles_RoleIdId",
                table: "ProjectUser",
                column: "RoleIdId",
                principalTable: "ProjectRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
