using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;

namespace info_invest.Controllers;

public class Ativo {
    public string? nome { get; set; }
    public string? grupo { get; set; }
}

[ApiController]
[Route("[controller]")]
public class AtivosController : ControllerBase
{
    [HttpGet]
    public IEnumerable<Ativo> Get()
    {
        return readDB(@"SELECT * FROM ativos;");
    }

    Ativo[] readDB(string cmd) {
        List<Ativo> result = new List<Ativo>();
        using (var conn = new SqliteConnection(@"Data Source=sqlite-info-invest.db")) {
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
}