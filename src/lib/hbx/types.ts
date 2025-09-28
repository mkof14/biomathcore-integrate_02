export type HbxFileMeta = {
  id: string;
  userId: string;
  filename: string;
  mime: string;
  size: number;
  tags: string[];
  createdAt: string;
  diskPath: string;
};

export type HbxFileRepo = {
  put(meta: Omit<HbxFileMeta, "id"|"createdAt"> & { id?: string }): Promise<HbxFileMeta>;
  get(id: string): Promise<HbxFileMeta | null>;
  listByUser(userId: string, limit?: number): Promise<HbxFileMeta[]>;
};
