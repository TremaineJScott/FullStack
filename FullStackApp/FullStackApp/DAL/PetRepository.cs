using FullStackApp.Models;
using Microsoft.EntityFrameworkCore;

namespace FullStackApp.DAL
{
    public class PetRepository
    {
        private readonly AdoptionContext _context;


        public PetRepository(AdoptionContext context)
        {
            _context = context;
        }


        public async Task<IEnumerable<PetDto>> GetAllPetsAsync()
        {
            return await _context.Pets
                .Select(p => new PetDto
                {
                    PetId = p.PetId,
                    Name = p.Name,
                    Type = p.Type,
                    Breed = p.Breed,
                    Age = p.Age,
                    Description = p.Description
                })
                .ToListAsync();
        }


        public async Task<PetDto> GetPetByIdAsync(int id)
        {
            var pet = await _context.Pets.FindAsync(id);


            if (pet == null)
            {
                return null;
            }


            return new PetDto
            {
                PetId = pet.PetId,
                Name = pet.Name,
                Type = pet.Type,
                Breed = pet.Breed,
                Age = pet.Age,
                Description = pet.Description
            };
        }


        public async Task<PetDto> AddPetAsync(PetDto petDto)
        {
            var pet = new Pet
            {
                Name = petDto.Name,
                Type = petDto.Type,
                Breed = petDto.Breed,
                Age = petDto.Age,
                Description = petDto.Description
            };


            _context.Pets.Add(pet);
            await _context.SaveChangesAsync();


            petDto.PetId = pet.PetId;


            return petDto;
        }


        public async Task<bool> UpdatePetAsync(PetDto petDto)
        {
            var pet = await _context.Pets.FindAsync(petDto.PetId);


            if (pet == null)
            {
                return false;
            }


            pet.Name = petDto.Name;
            pet.Type = petDto.Type;
            pet.Breed = petDto.Breed;
            pet.Age = petDto.Age;
            pet.Description = petDto.Description;


            await _context.SaveChangesAsync();


            return true;
        }


        public async Task<bool> DeletePetAsync(int id)
        {
            var pet = await _context.Pets.FindAsync(id);


            if (pet == null)
            {
                return false;
            }


            _context.Pets.Remove(pet);
            await _context.SaveChangesAsync();


            return true;
        }
    }

}
