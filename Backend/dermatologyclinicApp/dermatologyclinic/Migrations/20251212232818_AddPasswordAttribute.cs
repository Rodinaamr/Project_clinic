using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace dermatologyclinic.Migrations
{
    /// <inheritdoc />
    public partial class AddPasswordAttribute : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Patients",
                type: "longtext",
                nullable: false);

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Doctors",
                type: "longtext",
                nullable: false);

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Assistants",
                type: "longtext",
                nullable: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Password",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "Assistants");
        }
    }
}
