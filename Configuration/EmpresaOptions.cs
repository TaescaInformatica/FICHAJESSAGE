namespace FichajeTAESCA.Configuration;

public sealed class EmpresaOptions
{
    public const string SectionName = "Empresa";

    public string Nombre { get; set; } = "Nombre de la empresa";

    public string NombreComercial { get; set; } = "Control horario";

    public string? LogoUrl { get; set; }

    public string ColorPrincipal { get; set; } = "#00A376";

    public string Entorno { get; set; } = "Produccion";
}
