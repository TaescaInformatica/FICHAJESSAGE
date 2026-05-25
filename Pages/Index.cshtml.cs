using FichajeTAESCA.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.ComponentModel.DataAnnotations;

namespace FichajeTAESCA.Pages
{
    public class IndexModel : PageModel
    {
        private readonly IFichajeService _fichajeService;
        private readonly ILogger<IndexModel> _logger;

        public IndexModel(IFichajeService fichajeService, ILogger<IndexModel> logger)
        {
            _fichajeService = fichajeService;
            _logger = logger;
        }

        [BindProperty]
        [Required(ErrorMessage = "Debes introducir el codigo de operario.")]
        [Display(Name = "Codigo de operario")]
        public string CodigoOperario { get; set; } = string.Empty;

        [BindProperty]
        [Display(Name = "Teletrabajo")]
        public bool Teletrabajo { get; set; }

        public string Mensaje { get; set; } = string.Empty;

        public bool EsError { get; set; }

        public void OnGet()
        {
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                EsError = true;
                Mensaje = "Revisa los datos introducidos antes de registrar el fichaje.";
                return Page();
            }

            try
            {
                string codigoOperario = CodigoOperario.Trim();
                FichajeResult resultado = await _fichajeService.RegistrarFichajeAsync(
                    codigoOperario,
                    Teletrabajo,
                    HttpContext.RequestAborted);

                EsError = resultado.EsError;
                Mensaje = resultado.Mensaje;

                if (!resultado.EsError)
                {
                    CodigoOperario = string.Empty;
                    Teletrabajo = false;
                    ModelState.Clear();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error inesperado durante el registro de fichaje.");
                EsError = true;
                Mensaje = "Se ha producido un error inesperado. Avise al administrador si el problema continua.";
            }

            return Page();
        }
    }
}
