export interface CastMember {
  id: number
  actor: string
  actorUrl: string
  photo: string | null
  character: string
  characterUrl: string
  country: string | null
  birthday: string | null
}

interface TvMazePerson {
  id: number
  name: string
  url: string
  country: { name: string } | null
  birthday: string | null
  image: { medium: string } | null
}

interface TvMazeCharacter {
  id: number
  name: string
  url: string
}

export interface TvMazeCastEntry {
  person: TvMazePerson
  character: TvMazeCharacter
}
