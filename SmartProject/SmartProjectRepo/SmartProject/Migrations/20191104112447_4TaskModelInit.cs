using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartProject.Migrations
{
    public partial class _4TaskModelInit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Task_TaskProgresses_ProgressId",
                table: "Task");

            migrationBuilder.DropTable(
                name: "TaskProgresses");

            migrationBuilder.DropIndex(
                name: "IX_Task_ProgressId",
                table: "Task");

            migrationBuilder.DropColumn(
                name: "ProgressId",
                table: "Task");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProgressId",
                table: "Task",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "TaskProgresses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProgressName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskProgresses", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Task_ProgressId",
                table: "Task",
                column: "ProgressId");

            migrationBuilder.AddForeignKey(
                name: "FK_Task_TaskProgresses_ProgressId",
                table: "Task",
                column: "ProgressId",
                principalTable: "TaskProgresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
