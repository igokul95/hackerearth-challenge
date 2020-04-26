import { PSGame, PSGameResponse } from "../types";



export const cleanGameResponse = (response: PSGameResponse[]) => {
    if(response) {
        const games: PSGame[] = response.map(game => {
            return { ...game,
                editors_choice: game.editors_choice === 'Y' ? true : false,
            }
        });
        return games;
    }
    return [];

}