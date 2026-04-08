export default function PlaylistSection() {
  return (
    <section>
      <div>
        <h2>Escucha Nuestra Playlist</h2>
      </div>
      <div className="mt-6">
        <iframe
          data-testid="embed-iframe"
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/playlist/6S7m2GAkQlNmo4068emNym?utm_source=generator"
          width="100%"
          height="352"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    </section>
  );
}
