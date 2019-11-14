using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartProject.Migrations
{
    public partial class ReleaseModelInit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Task_UserBasicInfo_UserId",
                table: "Task");

            migrationBuilder.DropIndex(
                name: "IX_Task_UserId",
                table: "Task");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Task");

            migrationBuilder.AddColumn<int>(
                name: "ReleaseModelId",
                table: "UserBasicInfo",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeadlineDate",
                table: "Task",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "EstimatedTime",
                table: "Task",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedDate",
                table: "Task",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "UserAssignedId",
                table: "Task",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserCreatedId",
                table: "Task",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Releases",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    ProjectId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Releases", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Releases_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ReleaseUser",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReleaseId = table.Column<int>(nullable: false),
                    ReleasesId = table.Column<int>(nullable: true),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReleaseUser", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReleaseUser_Releases_ReleasesId",
                        column: x => x.ReleasesId,
                        principalTable: "Releases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ReleaseUser_UserBasicInfo_UserId",
                        column: x => x.UserId,
                        principalTable: "UserBasicInfo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserBasicInfo_ReleaseModelId",
                table: "UserBasicInfo",
                column: "ReleaseModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Task_UserAssignedId",
                table: "Task",
                column: "UserAssignedId");

            migrationBuilder.CreateIndex(
                name: "IX_Task_UserCreatedId",
                table: "Task",
                column: "UserCreatedId");

            migrationBuilder.CreateIndex(
                name: "IX_Releases_ProjectId",
                table: "Releases",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_ReleaseUser_ReleasesId",
                table: "ReleaseUser",
                column: "ReleasesId");

            migrationBuilder.CreateIndex(
                name: "IX_ReleaseUser_UserId",
                table: "ReleaseUser",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Task_UserBasicInfo_UserAssignedId",
                table: "Task",
                column: "UserAssignedId",
                principalTable: "UserBasicInfo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Task_UserBasicInfo_UserCreatedId",
                table: "Task",
                column: "UserCreatedId",
                principalTable: "UserBasicInfo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserBasicInfo_Releases_ReleaseModelId",
                table: "UserBasicInfo",
                column: "ReleaseModelId",
                principalTable: "Releases",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Task_UserBasicInfo_UserAssignedId",
                table: "Task");

            migrationBuilder.DropForeignKey(
                name: "FK_Task_UserBasicInfo_UserCreatedId",
                table: "Task");

            migrationBuilder.DropForeignKey(
                name: "FK_UserBasicInfo_Releases_ReleaseModelId",
                table: "UserBasicInfo");

            migrationBuilder.DropTable(
                name: "ReleaseUser");

            migrationBuilder.DropTable(
                name: "Releases");

            migrationBuilder.DropIndex(
                name: "IX_UserBasicInfo_ReleaseModelId",
                table: "UserBasicInfo");

            migrationBuilder.DropIndex(
                name: "IX_Task_UserAssignedId",
                table: "Task");

            migrationBuilder.DropIndex(
                name: "IX_Task_UserCreatedId",
                table: "Task");

            migrationBuilder.DropColumn(
                name: "ReleaseModelId",
                table: "UserBasicInfo");

            migrationBuilder.DropColumn(
                name: "DeadlineDate",
                table: "Task");

            migrationBuilder.DropColumn(
                name: "EstimatedTime",
                table: "Task");

            migrationBuilder.DropColumn(
                name: "ModifiedDate",
                table: "Task");

            migrationBuilder.DropColumn(
                name: "UserAssignedId",
                table: "Task");

            migrationBuilder.DropColumn(
                name: "UserCreatedId",
                table: "Task");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Task",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Task_UserId",
                table: "Task",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Task_UserBasicInfo_UserId",
                table: "Task",
                column: "UserId",
                principalTable: "UserBasicInfo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
