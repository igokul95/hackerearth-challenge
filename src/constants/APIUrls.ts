export enum APIUrls {
    sampleAPI = '/sampleAPI',
    getGames = '/gamesext'
}

export const ConstructURL = (...params: string[]) => {
    return params.join("");
  };