using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var moodToGenre = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
{
    {"happy", "Pop"},
    {"sad", "Acoustic"},
    {"energetic", "EDM"},
    {"chill", "Lo-Fi"},
    {"romantic", "R&B"}
};

var genreToSongs = new Dictionary<string, List<string>>
{
    {"Pop", new() {"Blinding Lights - The Weeknd", "Happy - Pharrell Williams", "Levitating - Dua Lipa"}},
    {"Acoustic", new() {"Let Her Go - Passenger", "Someone Like You - Adele", "Skinny Love - Bon Iver"}},
    {"EDM", new() {"Titanium - David Guetta", "Animals - Martin Garrix", "Don't You Worry Child - SHM"}},
    {"Lo-Fi", new() {"Chillhop Essentials - Various", "Lofi Beats - Chillhop", "Dreams - Joakim Karud"}},
    {"R&B", new() {"All of Me - John Legend", "Adorn - Miguel", "Earned It - The Weeknd"}}
};

app.MapGet("/recommend", ([FromQuery] string mood) =>
{
    if (!moodToGenre.TryGetValue(mood, out var genre))
        return Results.BadRequest("Invalid mood. Try: happy, sad, energetic, chill, romantic.");

    var songs = genreToSongs[genre];
    return Results.Ok(new { mood, genre, songs });
});

app.Run("http://0.0.0.0:5196");

