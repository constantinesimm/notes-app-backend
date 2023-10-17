import { promises as fs } from 'fs';
export const checkOrCreateUploadsDir = async (): Promise<void> => {
  const uploadsDir: string = `${process.cwd()}/uploads`;

  try {
    await fs.access(uploadsDir);
  } catch (e) {
    await fs.mkdir(uploadsDir);
  }
};
