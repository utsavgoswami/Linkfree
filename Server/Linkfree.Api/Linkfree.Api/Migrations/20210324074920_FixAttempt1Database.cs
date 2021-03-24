using Microsoft.EntityFrameworkCore.Migrations;

namespace AspNetIdentityDemo.Api.Migrations
{
    public partial class FixAttempt1Database : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Links",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProfilePictureURL",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Links_ApplicationUserId",
                table: "Links",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Links_AspNetUsers_ApplicationUserId",
                table: "Links",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Links_AspNetUsers_ApplicationUserId",
                table: "Links");

            migrationBuilder.DropIndex(
                name: "IX_Links_ApplicationUserId",
                table: "Links");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Links");

            migrationBuilder.DropColumn(
                name: "ProfilePictureURL",
                table: "AspNetUsers");
        }
    }
}
