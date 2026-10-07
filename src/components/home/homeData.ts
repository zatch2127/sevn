export type Note = {
  id: string;
  ring: string;
  mood: string;
  whisper: string;
  word: string;
  means: string;
  icon: 'sun' | 'burst' | 'swirl' | 'layers' | 'spiral' | 'stack' | 'star';
};

export const navigation = [
  { label: 'Menu', route: 'menu' },
  { label: 'Our Story', route: 'story' },
  { label: 'Journal', route: 'journal' },
  { label: 'Visit', route: 'visit' },
];

export const notes: Note[] = [
  { id: 'quiet', ring: 'QUIET MORNING RITUAL', icon: 'sun', mood: 'A quiet morning', whisper: 'The room is still yours for another hour.', word: 'QUIET MORNINGS', means: 'The first hour belongs to whoever gets here first.' },
  { id: 'bold', ring: 'BOLD OPENING RITUAL', icon: 'burst', mood: 'Something bold', whisper: 'Start with the espresso. Decide after.', word: 'BOLD OPENINGS', means: 'Every day starts with an espresso pulled properly.' },
  { id: 'golden', ring: 'GOLDEN LAYERS IN RHYTHM', icon: 'swirl', mood: 'Warm from the oven', whisper: 'Croissants come out at seven. And again at eleven.', word: 'GOLDEN RHYTHM', means: 'Croissants at seven. Again at eleven. Not a minute before.' },
  { id: 'fresh', ring: 'FRESH LAYERS IN BALANCE', icon: 'layers', mood: 'A proper lunch', whisper: 'Sourdough, truffle, parmesan. Sit down for it.', word: 'FRESH LAYERS', means: "Nothing goes on the plate that isn't doing something." },
  { id: 'soft', ring: 'SOFT CRUMBS SWEET FINISH', icon: 'spiral', mood: 'Something sweet', whisper: 'Basque cheesecake. No further questions.', word: 'SOFT FINISHES', means: 'The end of a meal is still part of the meal.' },
  { id: 'stack', ring: 'STACK BOLD & BALANCED RIGHT', icon: 'stack', mood: 'Slow and full', whisper: 'Built to be finished with both hands.', word: 'BOLD STACKS', means: 'Built to be finished with both hands.' },
  { id: 'deep', ring: 'DEEP NOTES SLOW MELTS', icon: 'star', mood: 'Staying a while', whisper: 'We saved you the corner table.', word: 'DEEP NOTES', means: "Cold brew steeped eighteen hours, because sixteen isn't enough." },
];

export const picks = [
  { name: 'Truffle Mushroom Sourdough', description: 'Mushroom / truffle cream / parmesan', price: 45 },
  { name: 'Cold Brew Reserve', description: 'Eighteen hours / chocolate / citrus', price: 28 },
  { name: 'Burnt Basque Cheesecake', description: 'Caramelised / silky centre', price: 40 },
];

export const dayAtSevn = [
  ['07:02', 'The first pour.'],
  ['09:20', 'The usual table, the usual order.'],
  ['12:36', 'Lunch takes as long as it takes.'],
  ['16:18', 'One more, then.'],
  ['19:40', 'The last tray comes out of the oven.'],
] as const;

export const journalEntries = [
  { title: 'The case for a slower morning', category: 'Coffee', date: '12 Sep', read: '4 min' },
  { title: 'Eighteen hours, and why not sixteen', category: 'Coffee', date: '04 Sep', read: '6 min' },
  { title: 'What changes in the pastry when the weather does', category: 'Baking', date: '28 Aug', read: '5 min' },
];

export const visit = {
  address: ['SEVN Café & Bakehaus', 'The corner entrance, under the blade sign', 'Ground floor, Linking Road'],
  hours: [
    ['Monday', '07:00 — 22:00'],
    ['Tuesday', '07:00 — 22:00'],
    ['Wednesday', '07:00 — 22:00'],
    ['Thursday', '07:00 — 22:00'],
    ['Friday', '07:00 — 23:00'],
    ['Saturday', '08:00 — 23:00'],
    ['Sunday', '08:00 — 22:00'],
  ],
  phone: '+91 22 0000 0000',
  email: 'hello@sevn.cafe',
  instagram: '@sevn.cafe',
};

export function getTodayHours() {
  const day = new Date().getDay();
  const index = day === 0 ? 6 : day - 1;
  return visit.hours[index][1];
}

export function isOpenNow() {
  const now = new Date();
  const index = now.getDay() === 0 ? 6 : now.getDay() - 1;
  const [opens, closes] = visit.hours[index][1].split(' — ').map(time => Number.parseInt(time, 10));
  return now.getHours() >= opens && now.getHours() < closes;
}
