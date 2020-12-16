using Microsoft.EntityFrameworkCore.Migrations;

namespace GifApi.Migrations
{
    public partial class SettingDefaultValuesForSecondAndThirdAnswers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ThirdAlternative",
                table: "Answers",
                nullable: true,
                defaultValue: "None of the above",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "SecondAlternative",
                table: "Answers",
                nullable: true,
                defaultValue: "All the above",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ThirdAlternative",
                table: "Answers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true,
                oldDefaultValue: "None of the above");

            migrationBuilder.AlterColumn<string>(
                name: "SecondAlternative",
                table: "Answers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true,
                oldDefaultValue: "All the above");
        }
    }
}
