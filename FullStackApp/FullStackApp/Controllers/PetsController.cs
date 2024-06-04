using FullStackApp.DAL;
using FullStackApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace FullStackApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PetsController : ControllerBase
    {
        private readonly PetRepository _petRepository;


        public PetsController(PetRepository petRepository)
        {
            _petRepository = petRepository;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<PetDto>>> GetPets()
        {
            var pets = await _petRepository.GetAllPetsAsync();
            return Ok(pets);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<PetDto>> GetPet(int id)
        {
            var pet = await _petRepository.GetPetByIdAsync(id);


            if (pet == null)
            {
                return NotFound();
            }


            return Ok(pet);
        }


        [HttpPost]
        public async Task<ActionResult<PetDto>> PostPet(PetDto petDto)
        {
            var createdPet = await _petRepository.AddPetAsync(petDto);
            return CreatedAtAction(nameof(GetPet), new { id = createdPet.PetId }, createdPet);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutPet(int id, PetDto petDto)
        {
            if (id != petDto.PetId)
            {
                return BadRequest();
            }


            var updated = await _petRepository.UpdatePetAsync(petDto);


            if (!updated)
            {
                return NotFound();
            }


            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePet(int id)
        {
            var deleted = await _petRepository.DeletePetAsync(id);


            if (!deleted)
            {
                return NotFound();
            }


            return NoContent();
        }
    }

}
