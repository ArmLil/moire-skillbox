interface Gallery {
  file: { url: string; name: string; originalName: string; extension: string; size: string };
}

export default interface Color {
  id: string;
  color: {
    id: string;
    title: string;
    code: string;
  };
  gallery: Gallery[];
}
