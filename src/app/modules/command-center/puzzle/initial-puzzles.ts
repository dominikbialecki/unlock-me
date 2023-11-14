import {Puzzle} from './puzzle';
import {PuzzleId} from './puzzle-id';

export const initialPuzzles: Puzzle[] = [
  {
    id: PuzzleId.Memory,
    image: 'assets/christmas/memory/memory-poster.jpg',
    completed: true,
    date: '21-12-2022',
    path: 'christmas/command-center/puzzle/memory'
  },
  {
    id: PuzzleId.UnstablePath,
    image: 'assets/christmas/unstable-path/indiana-jones-poster.jpg',
    completed: true,
    date: '22-12-2022',
    path: 'christmas/command-center/puzzle/unstable-path',
  },
  {
    id: PuzzleId.Drum,
    image: 'assets/christmas/drum/drum-poster.png',
    completed: true,
    date: '23-12-2022',
    path: 'christmas/command-center/puzzle/drum'
  },
  {
    id: PuzzleId.HarryPotter,
    image: 'assets/christmas/harry-potter/harry-potter-poster.jpg',
    completed: true,
    date: '24-12-2022',
    path: 'christmas/command-center/puzzle/hit-the-mole'
  },
  {
    id: PuzzleId.Songs,
    image: 'assets/christmas/song-anagram/song-puzzle-poster.jpg',
    completed: true,
    date: '25-12-2022',
    path: 'christmas/command-center/puzzle/songs',
  },
  {
    id: PuzzleId.Battle,
    image: 'assets/christmas/battle/battle-poster.png',
    completed: true,
    date: '26-12-2022',
    path: 'christmas/command-center/puzzle/battle'
  },
];
