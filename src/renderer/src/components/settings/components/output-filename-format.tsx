import { useEffect, useState } from "react";

const items = [
  { placeholder: "id", type: "Str", color: "#515151" },
  { placeholder: "title", type: "Str", color: "#FF5733" },
  { placeholder: "url", type: "Str", color: "#515151" },
  { placeholder: "ext", type: "Str", color: "#FF5733" },
  { placeholder: "alt_title", type: "Str", color: "#515151" },
  { placeholder: "display_id", type: "Str", color: "#515151" },
  { placeholder: "uploader", type: "Str", color: "#515151" },
  { placeholder: "license", type: "Str", color: "#515151" },
  { placeholder: "creator", type: "Str", color: "#515151" },
  { placeholder: "release_date", type: "Str", color: "#515151" },
  { placeholder: "timestamp", type: "Str", color: "#515151" },
  { placeholder: "upload_date", type: "Str", color: "#515151" },
  { placeholder: "uploader_id", type: "Str", color: "#515151" },
  { placeholder: "channel", type: "Str", color: "#515151" },
  { placeholder: "channel_id", type: "Str", color: "#515151" },
  { placeholder: "location", type: "Str", color: "#515151" },
  { placeholder: "duration", type: "NO", color: "#515151" },
  { placeholder: "view_count", type: "NO", color: "#515151" },
  { placeholder: "like_count", type: "NO", color: "#515151" },
  { placeholder: "dislike_count", type: "NO", color: "#515151" },
  { placeholder: "repost_count", type: "NO", color: "#515151" },
  { placeholder: "average_rating", type: "NO", color: "#515151" },
  { placeholder: "comment_count", type: "NO", color: "#515151" },
  { placeholder: "age_limit", type: "NO", color: "#515151" },
  { placeholder: "is_live", type: "01", color: "#515151" },
  { placeholder: "start_time", type: "NO", color: "#515151" },
  { placeholder: "end_time", type: "NO", color: "#515151" },
  { placeholder: "format", type: "Str", color: "#515151" },
  { placeholder: "format_id", type: "Str", color: "#515151" },
  { placeholder: "format_note", type: "Str", color: "#515151" },
  { placeholder: "width", type: "NO", color: "#515151" },
  { placeholder: "height", type: "NO", color: "#515151" },
  { placeholder: "resolution", type: "Str", color: "#515151" },
  { placeholder: "tbr", type: "NO", color: "#515151" },
  { placeholder: "abr", type: "NO", color: "#515151" },
  { placeholder: "acodec", type: "Str", color: "#515151" },
  { placeholder: "asr", type: "NO", color: "#515151" },
  { placeholder: "vbr", type: "NO", color: "#515151" },
  { placeholder: "fps", type: "NO", color: "#515151" },
  { placeholder: "vcodec", type: "Str", color: "#515151" },
  { placeholder: "container", type: "Str", color: "#515151" },
  { placeholder: "filesize", type: "NO", color: "#515151" },
  { placeholder: "filesize_approx", type: "NO", color: "#515151" },
  { placeholder: "protocol", type: "Str", color: "#515151" },
  { placeholder: "extractor", type: "Str", color: "#515151" },
  { placeholder: "extractor_key", type: "Str", color: "#515151" },
  { placeholder: "epoch", type: "NO", color: "#515151" },
  { placeholder: "autonumber", type: "NO", color: "#515151" },
  { placeholder: "playlist", type: "Str", color: "#515151" },
  { placeholder: "playlist_index", type: "NO", color: "#515151" },
  { placeholder: "playlist_id", type: "Str", color: "#515151" },
  { placeholder: "playlist_title", type: "Str", color: "#515151" },
  { placeholder: "playlist_uploader", type: "Str", color: "#515151" },
  { placeholder: "playlist_uploader_id", type: "Str", color: "#515151" },
  { placeholder: "chapter", type: "Str", color: "#FF69B4" },
  { placeholder: "chapter_number", type: "NO", color: "#FF69B4" },
  { placeholder: "chapter_id", type: "Str", color: "#FF69B4" },
  { placeholder: "series", type: "Str", color: "#2AAA8A" },
  { placeholder: "season", type: "Str", color: "#2AAA8A" },
  { placeholder: "season_number", type: "NO", color: "#2AAA8A" },
  { placeholder: "season_id", type: "Str", color: "#2AAA8A" },
  { placeholder: "episode", type: "Str", color: "#2AAA8A" },
  { placeholder: "episode_number", type: "NO", color: "#2AAA8A" },
  { placeholder: "episode_id", type: "Str", color: "#2AAA8A" },
  { placeholder: "track", type: "Str", color: "#5D3FD3" },
  { placeholder: "track_number", type: "NO", color: "#5D3FD3" },
  { placeholder: "artist", type: "Str", color: "#5D3FD3" },
  { placeholder: "genre", type: "Str", color: "#5D3FD3" },
  { placeholder: "album", type: "Str", color: "#5D3FD3" },
  { placeholder: "album_type", type: "Str", color: "#5D3FD3" },
  { placeholder: "album_artist", type: "Str", color: "#5D3FD3" },
  { placeholder: "disc_number", type: "NO", color: "#5D3FD3" },
  { placeholder: "release_year", type: "Str", color: "#5D3FD3" },
];

export default function OutputFilenameFormat() {
  const [format, setFormat] = useState<string>("");

  useEffect(() => {
    let format = localStorage.getItem("format");
    if (!format) format = "%(title)s.%(ext)s";
    setFormat(format);
  }, []);

  const formatUpdate = (new_format: string) => {
    setFormat(`${format}%(${new_format})s`);
    localStorage.setItem("format", format);
  };

  return (
    <div>
      <input
        placeholder="Format"
        type="text"
        value={format}
        onChange={({ target: { value } }) => setFormat(value)}
        className="h-12 w-full flex-grow rounded-md border border-zinc-500 bg-transparent px-2 font-roboto text-sm outline-none"
      />
      <div className="mt-2 flex h-40 w-full flex-wrap gap-3 overflow-y-scroll rounded-md border border-zinc-500 p-4">
        {items.map((item) => (
          <p
            className="inline-flex cursor-pointer select-none items-center gap-1 rounded-md px-3 py-1 text-sm"
            onClick={() => formatUpdate(item.placeholder)}
            style={{ backgroundColor: item.color }}
          >
            <span className="text-xs underline">{item.type}.</span>
            {item.placeholder}
          </p>
        ))}
      </div>
    </div>
  );
}
