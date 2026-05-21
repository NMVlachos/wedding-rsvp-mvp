import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import db from '../db';

const router = Router();

interface GuestRow {
  first_name: string;
  last_name: string;
  invite_code: string;
  is_admin: number;
}

router.post('/login', (req: Request, res: Response) => {
  const { firstName, inviteCode } = req.body as { firstName?: unknown; inviteCode?: unknown };

  if (typeof firstName !== 'string' || firstName.trim().length === 0 || firstName.length > 100) {
    res.status(400).json({ error: 'First name is required.' });
    return;
  }
  if (typeof inviteCode !== 'string' || inviteCode.trim().length === 0 || inviteCode.length > 4) {
    res.status(400).json({ error: 'Invite code is required.' });
    return;
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    res.status(500).json({ error: 'Server misconfiguration.' });
    return;
  }

  const code = inviteCode.trim().toUpperCase();
  const name = firstName.trim();

  const guest = db
    .prepare(
      `SELECT first_name, last_name, invite_code, is_admin
       FROM guests
       WHERE invite_code = ? AND lower(first_name) = lower(?)`
    )
    .get(code, name) as GuestRow | undefined;

  if (!guest) {
    res.status(401).json({ error: 'Invalid name or invite code.' });
    return;
  }

  const role = guest.is_admin === 1 ? 'admin' : 'guest';

  const token = jwt.sign(
    {
      sub: guest.invite_code,
      firstName: guest.first_name,
      lastName: guest.last_name,
      role,
    },
    secret,
    { expiresIn: '30d' }
  );

  res.json({ token, firstName: guest.first_name, lastName: guest.last_name, role });
});

export default router;
