import { Router } from 'express';
import gameRoutes from './game';

const router = Router();

router.use('/game', gameRoutes);

router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Grid Game Backend'
  });
});

export default router;