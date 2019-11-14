using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartProject.Migrations
{
    public partial class _3ReleaseModelInit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserBasicInfo_Releases_ReleaseModelId",
                table: "UserBasicInfo");

            migrationBuilder.DropIndex(
                name: "IX_UserBasicInfo_ReleaseModelId",
                table: "UserBasicInfo");

            migrationBuilder.DropColumn(
                name: "ReleaseModelId",
                table: "UserBasicInfo");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ReleaseModelId",
                table: "UserBasicInfo",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserBasicInfo_ReleaseModelId",
                table: "UserBasicInfo",
                column: "ReleaseModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserBasicInfo_Releases_ReleaseModelId",
                table: "UserBasicInfo",
                column: "ReleaseModelId",
                principalTable: "Releases",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
