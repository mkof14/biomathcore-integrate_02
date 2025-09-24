export type HbxFile = {
  id: string;
  name?: string;
  mimeType?: string;
  size?: number;
  url?: string;
};

export async function getHbxFileById(id: string): Promise<HbxFile | null> {
  return null;
}

export async function getSignedDownloadUrl(id: string): Promise<{ url: string; expiresAt: number } | null> {
  return null;
}

export async function getFileReadableStream(id: string): Promise<NodeJS.ReadableStream | null> {
  return null;
}

export default {
  getHbxFileById,
  getSignedDownloadUrl,
  getFileReadableStream,
};
