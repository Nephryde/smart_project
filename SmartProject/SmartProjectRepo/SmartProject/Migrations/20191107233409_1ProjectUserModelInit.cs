using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartProject.Migrations
{
    public partial class _1ProjectUserModelInit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectUser_ProjectModel_ProjectId",
                table: "ProjectUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectModel",
                table: "ProjectModel");

            migrationBuilder.RenameTable(
                name: "ProjectModel",
                newName: "Projects");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Projects",
                table: "Projects",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectUser_Projects_ProjectId",
                table: "ProjectUser",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectUser_Projects_ProjectId",
                table: "ProjectUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Projects",
                table: "Projects");

            migrationBuilder.RenameTable(
                name: "Projects",
                newName: "ProjectModel");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectModel",
                table: "ProjectModel",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectUser_ProjectModel_ProjectId",
                table: "ProjectUser",
                column: "ProjectId",
                principalTable: "ProjectModel",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
