using System;
using System.Collections.Generic;

namespace FullStackApp.Models;

public partial class Pet
{
    public int PetId { get; set; }

    public string? Name { get; set; }

    public string? Type { get; set; }

    public string? Breed { get; set; }

    public int? Age { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();
}
