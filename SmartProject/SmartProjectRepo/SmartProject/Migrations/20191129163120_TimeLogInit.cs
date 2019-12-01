using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartProject.Migrations
{
    public partial class TimeLogInit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WorkActivities",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkActivities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LoggedWorkTime",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(nullable: false),
                    LoggedTime = table.Column<decimal>(nullable: false),
                    WorkActivityId = table.Column<int>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false),
                    TaskId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoggedWorkTime", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LoggedWorkTime_Task_TaskId",
                        column: x => x.TaskId,
                        principalTable: "Task",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LoggedWorkTime_UserBasicInfo_UserId",
                        column: x => x.UserId,
                        principalTable: "UserBasicInfo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LoggedWorkTime_WorkActivities_WorkActivityId",
                        column: x => x.WorkActivityId,
                        principalTable: "WorkActivities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LoggedWorkTime_TaskId",
                table: "LoggedWorkTime",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_LoggedWorkTime_UserId",
                table: "LoggedWorkTime",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_LoggedWorkTime_WorkActivityId",
                table: "LoggedWorkTime",
                column: "WorkActivityId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LoggedWorkTime");

            migrationBuilder.DropTable(
                name: "WorkActivities");
        }
    }
}
