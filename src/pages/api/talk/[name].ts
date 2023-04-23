import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name } = req.query

  // path.
  if (typeof name == 'string') {
    const filePath = path.join(process.cwd(), 'public', 'talks', name);
    const content = await fs.promises.readFile(filePath, 'utf8');

    res.status(200)
  } else {
    res.status(500)
  }
}