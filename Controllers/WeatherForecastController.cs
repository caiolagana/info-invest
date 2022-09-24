using Microsoft.AspNetCore.Mvc;

namespace info_invest.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastXController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastXController> _logger;

    public WeatherForecastXController(ILogger<WeatherForecastXController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<WeatherForecastX> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new WeatherForecastX
        {
            Date = DateTime.Now.AddDays(index),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }
}
