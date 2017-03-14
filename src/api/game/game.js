import {GameService} from '../../services/game/game.service';

const gameService = new GameService();

export const getCards = (ctx) => {
  ctx.body = gameService.pullOutPlayerCards('Oskar');
};