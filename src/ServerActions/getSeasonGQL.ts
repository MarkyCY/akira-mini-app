'use client';
import { request, gql } from 'graphql-request';

const ANILIST_API_URL = 'https://graphql.anilist.co';

export const fetchSeasonalAnime = async (
  page: number,
  perPage: number,
  season: string,
  seasonYear: number
) => {
  const query = gql`
    query ($page: Int, $perPage: Int, $season: MediaSeason, $seasonYear: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
        }
        media(season: $season, seasonYear: $seasonYear, type: ANIME, sort: POPULARITY_DESC) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            large
          }
          averageScore
          episodes
          description
          startDate {
            year
            month
            day
          }
          endDate {
            year
            month
            day
          }
          status
          isAdult
          genres
          studios(isMain: true) {
            nodes {
              name
            }
          }
          nextAiringEpisode {
            episode
            timeUntilAiring
          }
        }
      }
    }
  `;

  const variables = {
    page,
    perPage,
    season: season.toUpperCase(),
    seasonYear,
  };

  const data = await request(ANILIST_API_URL, query, variables) as any;
  console.log(data);
  return data.Page;
};