export type SearchEntry = { title: string; description: string; route: string; group: string; headings: string[] };

function score(entry: SearchEntry, term: string): number {
	const title = entry.title.toLowerCase();
	if (title.startsWith(term)) return 8;
	if (title.includes(term)) return 6;
	if (entry.headings.some((heading) => heading.toLowerCase().includes(term))) return 3;
	if (`${entry.description} ${entry.group}`.toLowerCase().includes(term)) return 1;
	return 0;
}

/** Every term must match somewhere in an entry. Title matches rank above heading matches, which rank above description matches. */
export function search(entries: SearchEntry[], query: string, limit = 10) {
	const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
	if (!terms.length) return entries.slice(0, limit);
	return entries
		.map((entry) => ({ entry, scores: terms.map((term) => score(entry, term)) }))
		.filter(({ scores }) => scores.every(Boolean))
		.map(({ entry, scores }) => ({ entry, total: scores.reduce((sum, value) => sum + value, 0) }))
		.sort((a, b) => b.total - a.total)
		.slice(0, limit)
		.map(({ entry }) => entry);
}
