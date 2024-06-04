using FullStackApp.DAL;
using FullStackApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace FullStackApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritesController : ControllerBase
    {
        private readonly FavoriteRepository _favoriteRepository;


        public FavoritesController(FavoriteRepository favoriteRepository)
        {
            _favoriteRepository = favoriteRepository;
        }


        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<FavoriteDto>>> GetFavorites(string userId)
        {
            var favorites = await _favoriteRepository.GetAllFavoritesAsync(userId);
            return Ok(favorites);
        }


        [HttpPost]
        public async Task<ActionResult<FavoriteDto>> PostFavorite(FavoriteDto favoriteDto)
        {
            var createdFavorite = await _favoriteRepository.AddFavoriteAsync(favoriteDto);
            return CreatedAtAction(nameof(GetFavorites), new { userId = createdFavorite.UserId }, createdFavorite);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFavorite(int id)
        {
            var deleted = await _favoriteRepository.DeleteFavoriteAsync(id);


            if (!deleted)
            {
                return NotFound();
            }


            return NoContent();
        }
    }

}
