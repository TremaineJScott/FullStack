using System;
using System.Collections.Generic;

namespace FullStackApp.Models;

public partial class Favorite
{
    public int FavoriteId { get; set; }

    public string? UserId { get; set; }

    public int? PetId { get; set; }

    public virtual Pet? Pet { get; set; }
}
