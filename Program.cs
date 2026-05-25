using FichajeTAESCA.Configuration;
using FichajeTAESCA.Data;
using FichajeTAESCA.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.Configure<EmpresaOptions>(builder.Configuration.GetSection(EmpresaOptions.SectionName));
builder.Services.AddSingleton<IDbConnectionFactory, SqlConnectionFactory>();
builder.Services.AddScoped<IFichajeService, FichajeService>();

var app = builder.Build();
bool forceHttps = app.Configuration.GetValue("Aplicacion:ForzarHttps", false);

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");

    if (forceHttps)
    {
        app.UseHsts();
    }
}

if (forceHttps)
{
    app.UseHttpsRedirection();
}

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
