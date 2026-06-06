// GetBytes Assistant — backend proxy (ASP.NET Core 8, Minimal API)
// Keeps your API key on the SERVER. Never put an API key in client-side JS.
//
// SETUP
//   1) dotnet new web -n GetBytesAssistant && cd GetBytesAssistant
//   2) Replace Program.cs with this file.
//   3) Set your key as an environment variable (do NOT hardcode):
//        Windows: setx ANTHROPIC_API_KEY "sk-ant-..."
//   4) dotnet run   (hosts at e.g. https://localhost:5001)
//   5) In js/assistant.js set:  ASSISTANT_ENDPOINT = "https://your-domain/assistant";
//
// The front-end posts { message, history } and expects { reply }.

using System.Text;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHttpClient();
builder.Services.AddCors(o => o.AddDefaultPolicy(p =>
    p.WithOrigins("https://getbytesitsolutions.com",
                  "https://bhupendersharma931.github.io")
     .AllowAnyHeader().AllowAnyMethod()));
var app = builder.Build();
app.UseCors();

const string SystemPrompt =
    "You are the friendly assistant for GetBytes IT Solutions, a Delhi-based software studio. " +
    "Services: web applications, mobile apps, ERP/management systems, SEO & marketing, web hosting, custom software. " +
    "Stack: .NET, React, Node.js, PHP/Laravel, Java, Flutter, SQL Server. " +
    "Indicative pricing: Starter from Rs 14,999, Business from Rs 39,999, Enterprise custom. " +
    "Contact: info@getbytesitsolutions.com. Be concise, helpful and honest. " +
    "If unsure or asked for a firm quote, direct the user to the Contact page. Never invent facts.";

app.MapPost("/assistant", async (HttpContext ctx, IHttpClientFactory http) =>
{
    var apiKey = Environment.GetEnvironmentVariable("ANTHROPIC_API_KEY");
    if (string.IsNullOrEmpty(apiKey))
        return Results.Json(new { reply = "Assistant is not configured yet." });

    using var doc = await JsonDocument.ParseAsync(ctx.Request.Body);
    var root = doc.RootElement;
    var userMsg = root.TryGetProperty("message", out var m) ? m.GetString() ?? "" : "";

    // Build messages (include prior turns if you want full context)
    var messages = new List<object> { new { role = "user", content = userMsg } };

    var payload = new
    {
        model = "claude-sonnet-4-20250514",
        max_tokens = 500,
        system = SystemPrompt,
        messages
    };

    var client = http.CreateClient();
    var req = new HttpRequestMessage(HttpMethod.Post, "https://api.anthropic.com/v1/messages");
    req.Headers.Add("x-api-key", apiKey);
    req.Headers.Add("anthropic-version", "2023-06-01");
    req.Content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");

    var res = await client.SendAsync(req);
    var body = await res.Content.ReadAsStringAsync();
    if (!res.IsSuccessStatusCode)
        return Results.Json(new { reply = "Sorry, I couldn't reach the assistant right now." });

    using var rdoc = JsonDocument.Parse(body);
    var reply = rdoc.RootElement.GetProperty("content")[0].GetProperty("text").GetString();
    return Results.Json(new { reply });
});

app.Run();
