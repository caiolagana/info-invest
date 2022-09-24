using Microsoft.AspNetCore.Mvc;

namespace info_invest.Controllers;

[ApiController]
[Route("[controller]")]
public class TemplateController : ControllerBase
{
    [HttpGet]
    public IEnumerable<string> Get()
    {
        return new string[] { "Hello World" };
    }
}