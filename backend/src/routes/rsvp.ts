import { Router, Request, Response } from 'express';
import db from '../db';
import { requireAuth, requireAdmin } from '../middleware/requireAuth';

const router = Router();

type Diet = 'none' | 'vegetarian' | 'vegan';

interface RsvpBody {
  inviteCode: string;
  firstName: string;
  attending: 'yes' | 'no';
  diet: Diet | null;
  song: string | null;
}

function validate(body: unknown): { ok: true; data: RsvpBody } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') return { ok: false, error: 'Invalid request body.' };
  const b = body as Record<string, unknown>;

  if (typeof b.inviteCode !== 'string' || b.inviteCode.trim().length === 0 || b.inviteCode.length > 4)
    return { ok: false, error: 'Invite code is required.' };
  if (typeof b.firstName !== 'string' || b.firstName.trim().length === 0 || b.firstName.length > 100)
    return { ok: false, error: 'First name is required.' };
  if (b.attending !== 'yes' && b.attending !== 'no')
    return { ok: false, error: "attending must be 'yes' or 'no'." };

  const validDiets: Diet[] = ['none', 'vegetarian', 'vegan'];
  const diet = b.diet === null || b.diet === undefined ? null : b.diet;
  if (diet !== null && !validDiets.includes(diet as Diet))
    return { ok: false, error: 'Invalid diet value.' };

  const song = typeof b.song === 'string' ? b.song.slice(0, 200).trim() || null : null;

  return {
    ok: true,
    data: {
      inviteCode: (b.inviteCode as string).trim().toUpperCase(),
      firstName:  (b.firstName  as string).trim(),
      attending:  b.attending,
      diet:       diet as Diet | null,
      song,
    },
  };
}

router.post('/', requireAuth, (req: Request, res: Response) => {
  const result = validate(req.body);
  if (!result.ok) {
    res.status(400).json({ error: result.error });
    return;
  }

  const { inviteCode, firstName, attending, diet, song } = result.data;

  // Ensure the token owner can only submit their own RSVP
  if (inviteCode !== req.user!.sub) {
    res.status(403).json({ error: 'Invite code does not match your session.' });
    return;
  }

  try {
    db.prepare(`
      INSERT INTO rsvps (invite_code, first_name, attending, diet, song)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(invite_code) DO UPDATE SET
        first_name = excluded.first_name,
        attending  = excluded.attending,
        diet       = excluded.diet,
        song       = excluded.song,
        updated_at = datetime('now')
    `).run(inviteCode, firstName, attending, diet, song);

    res.status(201).json({ message: 'RSVP saved.' });
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Failed to save RSVP.' });
  }
});

router.get('/', requireAdmin, (_req: Request, res: Response) => {
  try {
    const rows = db.prepare('SELECT * FROM rsvps ORDER BY updated_at DESC').all();
    res.json(rows);
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Failed to retrieve RSVPs.' });
  }
});

export default router;
