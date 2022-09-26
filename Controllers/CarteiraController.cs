﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;

namespace info_invest.Controllers;

public class Investimento {
    public string? cliente { get; set; }
    public string? titulo { get; set; }
    public int quantidade { get; set; }
    public float valor { get; set; }
}

[ApiController]
[Route("[controller]")]
public class CarteiraController : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Post(string[] s)
    {
        List<Investimento> resposta;
        Console.WriteLine("Receiving from Angular front-end: " + s[0] + " " + s[1]);
        resposta = leBanco(string.Format(@"SELECT * from {0} WHERE cliente = '{1}'", s[0], s[1]));
Console.WriteLine(string.Format(@"SELECT * from {0} WHERE cliente = '{1}'", s[0], s[1]));
        Console.WriteLine("Respondendo: " + resposta.ToArray().Length.ToString());
        return Ok(resposta.ToArray());
    }

    List<Investimento> leBanco(string cmd) {
        List<Investimento> result = new List<Investimento>();
        using (var conn = new SqliteConnection(@"Data Source=sqlite-info-invest.db")) {
            conn.Open();
            using (var command = conn.CreateCommand()) {
                command.CommandText = cmd;
                using (var reader = command.ExecuteReader()) {
                    while (reader.Read()) {
                        result.Add(new Investimento {
                            cliente = reader.GetString(0),
                            titulo = reader.GetString(1),
                            quantidade = reader.GetInt16(2),
                            valor = reader.GetFloat(3)
                        });
                    }
                }
            }
            conn.Close();
        }
        return result;
    }
}