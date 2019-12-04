using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartProject.Migrations
{
    public partial class ProjectCreator : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProjectCreatorId",
                table: "Projects",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Projects_ProjectCreatorId",
                table: "Projects",
                column: "ProjectCreatorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_UserBasicInfo_ProjectCreatorId",
                table: "Projects",
                column: "ProjectCreatorId",
                principalTable: "UserBasicInfo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_UserBasicInfo_ProjectCreatorId",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Projects_ProjectCreatorId",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "ProjectCreatorId",
                table: "Projects");
        }
    }
}
