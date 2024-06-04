namespace FullStackApp.DAL
{
    using FullStackApp.Models;
    using Microsoft.EntityFrameworkCore;


    public class FavoriteRepository
    {
        private readonly AdoptionContext _context;


        public FavoriteRepository(AdoptionContext context)
        {
            _context = context;
        }


        public async Task<IEnumerable<FavoriteDto>> GetAllFavoritesAsync(string userId)
        {
            return await _context.Favorites
                .Where(f => f.UserId == userId)
                .Select(f => new FavoriteDto
                {
                    FavoriteId = f.FavoriteId,
                    UserId = f.UserId,
                    PetId = f.PetId
                })
                .ToListAsync();
        }


        public async Task<FavoriteDto> GetFavoriteByIdAsync(int id)
        {
            var favorite = await _context.Favorites.FindAsync(id);


            if (favorite == null)
            {
                return null;
            }


            return new FavoriteDto
            {
                FavoriteId = favorite.FavoriteId,
                UserId = favorite.UserId,
                PetId = favorite.PetId
            };
        }


        public async Task<FavoriteDto> AddFavoriteAsync(FavoriteDto favoriteDto)
        {
            var favorite = new Favorite
            {
                UserId = favoriteDto.UserId,
                PetId = favoriteDto.PetId
            };


            _context.Favorites.Add(favorite);
            await _context.SaveChangesAsync();


            favoriteDto.FavoriteId = favorite.FavoriteId;


            return favoriteDto;
        }


        public async Task<bool> DeleteFavoriteAsync(int id)
        {
            var favorite = await _context.Favorites.FindAsync(id);


            if (favorite == null)
            {
                return false;
            }


            _context.Favorites.Remove(favorite);
            await _context.SaveChangesAsync();


            return true;
        }
    }



}
