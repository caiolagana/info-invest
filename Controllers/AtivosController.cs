using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.Data.SqlClient;

namespace info_invest.Controllers;

public class Ativo {
    public string? nome { get; set; }
    public string? grupo { get; set; }
}

[ApiController]
[Route("[controller]")]
public class AtivosController : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Post(Ativo ativo)
    {
        Console.WriteLine("Receiving from Angular front-end: " + string.Format("INSERT INTO ativos values('{0}','{1}')", ativo.nome, ativo.grupo));
        escreveAtivo(string.Format("INSERT INTO ativos values('{0}','{1}')", ativo.nome, ativo.grupo));
        return Ok();
    }

    [HttpGet]
    public IEnumerable<Ativo> Get()
    {
        return leAtivo(@"SELECT * FROM ativos;");
    }

    Ativo[] leAtivo(string cmd) {
        List<Ativo> result = new List<Ativo>();
        SqlConnectionStringBuilder sqlbuilder = new SqlConnectionStringBuilder();
        sqlbuilder.ConnectionString="Data Source=info-invest-server.database.windows.net,1433;Initial Catalog=info-invest-db;User ID=infoinvestadmin;Password=Inf0inv&sT";
        using (SqlConnection conn = new SqlConnection(sqlbuilder.ConnectionString))
        {
            conn.Open();
            using (var command = conn.CreateCommand()) {
                command.CommandText = cmd;
                using (var reader = command.ExecuteReader()) {
                    while (reader.Read()) {
                        result.Add(new Ativo {
                            nome = reader.GetString(0),
                            grupo = reader.GetString(1)
                        });
                    }
                }
            }
            conn.Close();
        }
        return result.ToArray();
    }

    void escreveAtivo(String cmd) {

    //using (var conn = new SqliteConnection(@"Data Source=sqlite-info-invest.db"))
    SqlConnectionStringBuilder sqlbuilder = new SqlConnectionStringBuilder();
    sqlbuilder.ConnectionString="Data Source=info-invest-server.database.windows.net,1433;Initial Catalog=info-invest-db;User ID=infoinvestadmin;Password=Inf0inv&sT";
    using (SqlConnection conn = new SqlConnection(sqlbuilder.ConnectionString))
    {
        conn.Open();
        using (var command = conn.CreateCommand()) {
            command.CommandText = @cmd;
            command.ExecuteNonQuery();
        }
        conn.Close();
    }
}
}