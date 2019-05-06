import copy from 'clipboard-copy';
import App from './App.svelte';
import words from '../output.txt';

import 'spectre.css';

const emoji_hash = {
	"a": "🅰️",
	"b": "🅱️",
	"ab": "🆎",
	"cl": "🆑",
	"o": "🅾️",
	"sos": "🆘",
	"m": "Ⓜ️",
	"atm": "🏧",
	"wc": "🚾",
	"p": "🅿️",
	"i": "ℹ️",
	"ng": "🆖",
	"ok": "🆗",
	"up": "🆙",
	"cool": "🆒",
	"new": "🆕",
	"free": "🆓",
	"tm": "™️",
	"c": "©️",
	"r": "®️",
	"end": "🔚",
	"back": "🔙",
	"on": "🔛",
	"top": "🔝",
	"soon": "🔜"
};

const sorted_keys = Object.keys(emoji_hash).sort((a,b) => b.length - a.length);

const convertToEmoji = (word) => {
	let emojified = String(word);
	sorted_keys.forEach(key => emojified = emojified.replace(key, emoji_hash[key]));
	return emojified;
}

function emojify(word) {
	let emojified = String(word);
	// do {
		emojified = convertToEmoji(emojified);
	// } while (emojified.split('').some(e => e.length === 1));
	emojified = convertToEmoji(emojified);
	emojified = convertToEmoji(emojified);
	return emojified;
};

const app = new App({
	target: document.body,
	props: {
		copy,
		filters: Object.values(emoji_hash),
		sort: 'default',
		words: words.split('\n').map(emojify)
	}
});

window.app = app;

export default app;