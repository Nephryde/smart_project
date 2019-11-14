using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartProject.Migrations
{
    public partial class _5ReleaseModelInit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ReleaseId",
                table: "Task",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Task_ReleaseId",
                table: "Task",
                column: "ReleaseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Task_Releases_ReleaseId",
                table: "Task",
                column: "ReleaseId",
                principalTable: "Releases",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Task_Releases_ReleaseId",
                table: "Task");

            migrationBuilder.DropIndex(
                name: "IX_Task_ReleaseId",
                table: "Task");

            migrationBuilder.DropColumn(
                name: "ReleaseId",
                table: "Task");
        }
    }
}
