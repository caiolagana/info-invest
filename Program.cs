using Microsoft.Data.SqlClient;//for Azure SQL DB
using Microsoft.Data.Sqlite;//for local Sqlite DB
using System.Net.Http;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

// Add services to the container.
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

/*
async void fechtDB() {
    using (var client = new HttpClient())
    {
        var values = new List<KeyValuePair<string, string>>();
        values.Add(new KeyValuePair<string, string>("client_id", "blabla"));
        var content = new FormUrlEncodedContent(values);
        client.BaseAddress = new Uri("http://localhost:44445/");
        var result = await client.PostAsync("api/urlAtivos", content);
    }
}
*/
//private static readonly HttpClient client = new HttpClient();

void writeDB(String cmd) {
    Console.WriteLine(">>>>> writeDB <<<<<");

    //Connect to Azure SQL DB
    //SqlConnectionStringBuilder sqlbuilder = new SqlConnectionStringBuilder();
    //sqlbuilder.ConnectionString="Data Source=info-invest-server.database.windows.net,1433;Initial Catalog=info-invest-db;User ID=infoinvestadmin;Password=Inf0inv&sT";
    //using (SqlConnection connection = new SqlConnection(sqlbuilder.ConnectionString)) { ... }

    using (var conn = new SqliteConnection(@"Data Source=sqlite-info-invest.db"))
    {
        conn.Open();
        using (var command = conn.CreateCommand()) {
            command.CommandText = @cmd;
            command.ExecuteNonQuery();
        }
        conn.Close();
    }
}

/*
writeDB(@"
Insert into coins values(
	'Quarter',
	30.35,
	'Gift from ME'
);
");
*/

app.Run();