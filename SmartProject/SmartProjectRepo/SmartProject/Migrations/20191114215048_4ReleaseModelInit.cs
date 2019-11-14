using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartProject.Migrations
{
    public partial class _4ReleaseModelInit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReleaseUser_Releases_ReleasesId",
                table: "ReleaseUser");

            migrationBuilder.DropIndex(
                name: "IX_ReleaseUser_ReleasesId",
                table: "ReleaseUser");

            migrationBuilder.DropColumn(
                name: "ReleasesId",
                table: "ReleaseUser");

            migrationBuilder.CreateIndex(
                name: "IX_ReleaseUser_ReleaseId",
                table: "ReleaseUser",
                column: "ReleaseId");

            migrationBuilder.AddForeignKey(
                name: "FK_ReleaseUser_Releases_ReleaseId",
                table: "ReleaseUser",
                column: "ReleaseId",
                principalTable: "Releases",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReleaseUser_Releases_ReleaseId",
                table: "ReleaseUser");

            migrationBuilder.DropIndex(
                name: "IX_ReleaseUser_ReleaseId",
                table: "ReleaseUser");

            migrationBuilder.AddColumn<int>(
                name: "ReleasesId",
                table: "ReleaseUser",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ReleaseUser_ReleasesId",
                table: "ReleaseUser",
                column: "ReleasesId");

            migrationBuilder.AddForeignKey(
                name: "FK_ReleaseUser_Releases_ReleasesId",
                table: "ReleaseUser",
                column: "ReleasesId",
                principalTable: "Releases",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
