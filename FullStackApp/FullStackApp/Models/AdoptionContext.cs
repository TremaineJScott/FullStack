using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FullStackApp.Models;

public partial class AdoptionContext : DbContext
{
    public AdoptionContext()
    {
    }

    public AdoptionContext(DbContextOptions<AdoptionContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Favorite> Favorites { get; set; }

    public virtual DbSet<Pet> Pets { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Favorite>(entity =>
        {
            entity.HasKey(e => e.FavoriteId).HasName("PK__Favorite__CE74FAD56B0B7D14");

            entity.Property(e => e.UserId).HasMaxLength(50);

            entity.HasOne(d => d.Pet).WithMany(p => p.Favorites)
                .HasForeignKey(d => d.PetId)
                .HasConstraintName("FK__Favorites__PetId__398D8EEE");
        });

        modelBuilder.Entity<Pet>(entity =>
        {
            entity.HasKey(e => e.PetId).HasName("PK__Pets__48E538621941B898");

            entity.Property(e => e.Breed).HasMaxLength(50);
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.Type).HasMaxLength(50);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
