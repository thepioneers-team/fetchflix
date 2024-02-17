const columns = [
  { name: "PROGRESS", uid: "progress" },
  { name: "THUMBNAIL", uid: "thumbnail" },
  { name: "TITLE", uid: "title" },
  { name: "ETA", uid: "eta" },
  { name: "RATE", uid: "rate" },
  { name: "SIZE", uid: "size" },
  { name: "ACTIONS", uid: "actions" },
];

const downloadsMock = [
  {
    id: "98a7bfcf4de613f3f36b1ae3291b2b",
    progress: 100,
    status: "FINISHED",
    thumbnail:
      "https://i.ytimg.com/vi/KOEfDvr4DcQ/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBGm1C5x7u0cS7xnpRAjyqNKSrLxA",
    title: "Face Your Biggest Fear To Win $800,000",
    eta: "00:32",
    rate: "59.32 MiB/s",
    size: "95 MiB",
  },
  {
    id: "74b9f6e42b8bee41534a27232e62ad",
    progress: 82,
    status: "DOWNLOADING",
    thumbnail:
      "https://i.ytimg.com/vi/zySUlGXbXvA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAZptrJgu2j64oleNvcIOlbuXDOZQ",
    title: "World's Luckiest People!",
    eta: "00:40",
    rate: "31.32 MiB/s",
    size: "523.78 MiB",
  },
  {
    id: "ded2e21d86b0c248b23f0c01c859a7",
    progress: 5,
    status: "ERROR",
    thumbnail:
      "https://i.ytimg.com/vi/UnFax2kHHlQ/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC4SH8IVdVRUEJCque1qeXAylqq-Q",
    title: "BEHIND THE VOICES - CELEBRITIES COLLECTION",
    eta: "01:32",
    rate: "13.32 MiB/s",
    size: "51.93 MiB",
  },
];

export { columns, downloadsMock };
