using Microsoft.Data.SqlClient;//for Azure SQL DB
using Microsoft.Data.Sqlite;//for local Sqlite DB

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

//builder.Services.AddControllersWithViews();
//builder.Services.AddDbContext<RazorPagesMovieContext>(options =>
//    options.UseSqlite(builder.Configuration.GetConnectionString("WebApiDatabase") ?? throw new InvalidOperationException("Connection string 'WebApiDatabase' not found.")));

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

void writeDB(String cmd) {
    Console.WriteLine(">>>>> writeDB <<<<<");
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

void readDB(string cmd) {
    Console.WriteLine(">>>>> readDB <<<<<");
    using (var conn = new SqliteConnection(@"Data Source=sqlite-info-invest.db")) {
        conn.Open();
        using (var command = conn.CreateCommand()) {
            command.CommandText = cmd;
            using (var reader = command.ExecuteReader()) {
                while (reader.Read()) {
                    var name = reader.GetString(2);
                    Console.WriteLine($"Hello, {name}!");
                }
            }
        }
        conn.Close();
    }
}

readDB(@"
select * from coins;
");

writeDB(@"
Insert into coins values(
	'Quarter',
	30.35,
	'Gift from ME'
);
");

/*
using (var conn = new SqliteConnection(@"Data Source=sqlite-info-invest.db"))
{
    conn.Open();
    using (var c = conn.CreateCommand()) {
        c.CommandText = @"
            Insert into coins 
            values(
                'Blablabla',
                40.56,
                'Im going to work'
                );
            ";
        c.ExecuteNonQuery();
    }

    var command = connection.CreateCommand();
    command.CommandText =
    @"
        SELECT name
        FROM user
        WHERE id = $id
    ";
    command.Parameters.AddWithValue("$id", id);

    using (var reader = command.ExecuteReader())
    {
        while (reader.Read())
        {
            var name = reader.GetString(0);

            Console.WriteLine($"Hello, {name}!");
        }
    }
}
*/

/*
//connection to Azure SQL
        {
            try 
            { 
                SqlConnectionStringBuilder sqlbuilder = new SqlConnectionStringBuilder();

                sqlbuilder.ConnectionString="Data Source=info-invest-server.database.windows.net,1433;Initial Catalog=info-invest-db;User ID=infoinvestadmin;Password=Inf0inv&sT";
                //sqlbuilder.DataSource = "info-invest-server.database.windows.net,1433";
                //sqlbuilder.UserID = "infoinvestadmin";
                //sqlbuilder.Password = "Inf0inv&sT";
                //sqlbuilder.InitialCatalog = "info-invest-db";
         
                using (SqlConnection connection = new SqlConnection(sqlbuilder.ConnectionString))
                {
                    Console.WriteLine("\nQuery data example:");
                    Console.WriteLine("=========================================\n");

                    connection.Open();       

                    //SqlCommand criaClientes = new SqlCommand(@"CREATE TABLE Clientes (Nome varchar(255), Idade int)", connection);
                    //criaClientes.ExecuteNonQuery();
                    SqlCommand incluiCliente = new SqlCommand(@"INSERT INTO Clientes (Nome, Idade) VALUES('Caio',35)", connection);
                    //incluiCliente.ExecuteNonQuery();
                    SqlCommand leClientes = new SqlCommand(@"SELECT * FROM Clientes", connection);
                    SqlDataReader rClientes = leClientes.ExecuteReader();
                    Console.WriteLine(">>>>>>>>>>Lendo clientes<<<<<<<<<<");
                    Console.WriteLine("{0}", rClientes.GetString(0));
                    rClientes.Close();

                    String sql = "SELECT name, collation_name FROM sys.databases";
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                Console.WriteLine("{0} {1}", reader.GetString(0), reader.GetString(1));
                            }
                        }
                    }
                    connection.Close();
                }
            }
            catch (SqlException e)
            {
                Console.WriteLine(e.ToString());
            }
            Console.WriteLine("\nDone. Press enter.");
            Console.ReadLine();
        }
*/


app.Run();